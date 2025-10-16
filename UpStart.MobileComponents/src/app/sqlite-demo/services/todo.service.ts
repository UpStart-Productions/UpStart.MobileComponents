import { Injectable } from '@angular/core';
import { DatabaseBaseService } from './database-base.service';
import { Todo, TodoStats } from '../types/todo.types';

/**
 * ToDo Service
 * 
 * Provides CRUD operations for ToDo items with full TypeScript type safety.
 * Demonstrates best practices for SQLite operations in Ionic/Angular apps.
 */
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private dbBase: DatabaseBaseService) {}

  /**
   * Create a new todo
   */
  async createTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> {
    const db = await this.dbBase.getDbConnection();
    
    const now = new Date().toISOString();
    
    const sql = `
      INSERT INTO todos (title, description, completed, priority, dueDate, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await db.run(sql, [
      todo.title,
      todo.description || null,
      todo.completed ? 1 : 0,
      todo.priority,
      todo.dueDate || null,
      now,
      now,
    ]);

    console.log('✅ Todo created:', result);

    return {
      id: result.changes?.lastId,
      ...todo,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Get all todos (with optional filters)
   */
  async getAllTodos(filters?: {
    completed?: boolean;
    priority?: 'low' | 'medium' | 'high';
  }): Promise<Todo[]> {
    const db = await this.dbBase.getDbConnection();

    let sql = 'SELECT * FROM todos';
    const params: any[] = [];

    // Build WHERE clause if filters provided
    if (filters) {
      const conditions: string[] = [];

      if (filters.completed !== undefined) {
        conditions.push('completed = ?');
        params.push(filters.completed ? 1 : 0);
      }

      if (filters.priority) {
        conditions.push('priority = ?');
        params.push(filters.priority);
      }

      if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
      }
    }

    sql += ' ORDER BY completed ASC, priority DESC, dueDate ASC';

    const result = await db.query(sql, params);

    if (!result.values || result.values.length === 0) {
      return [];
    }

    // Convert database rows to Todo objects
    return result.values.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      completed: row.completed === 1,
      priority: row.priority,
      dueDate: row.dueDate,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }

  /**
   * Get a single todo by ID
   */
  async getTodoById(id: number): Promise<Todo | null> {
    const db = await this.dbBase.getDbConnection();

    const sql = 'SELECT * FROM todos WHERE id = ?';
    const result = await db.query(sql, [id]);

    if (!result.values || result.values.length === 0) {
      return null;
    }

    const row = result.values[0];
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      completed: row.completed === 1,
      priority: row.priority,
      dueDate: row.dueDate,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  /**
   * Update an existing todo
   */
  async updateTodo(id: number, updates: Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
    const db = await this.dbBase.getDbConnection();

    const now = new Date().toISOString();
    const setClauses: string[] = [];
    const params: any[] = [];

    // Build SET clause dynamically based on provided updates
    if (updates.title !== undefined) {
      setClauses.push('title = ?');
      params.push(updates.title);
    }
    if (updates.description !== undefined) {
      setClauses.push('description = ?');
      params.push(updates.description || null);
    }
    if (updates.completed !== undefined) {
      setClauses.push('completed = ?');
      params.push(updates.completed ? 1 : 0);
    }
    if (updates.priority !== undefined) {
      setClauses.push('priority = ?');
      params.push(updates.priority);
    }
    if (updates.dueDate !== undefined) {
      setClauses.push('dueDate = ?');
      params.push(updates.dueDate || null);
    }

    // Always update updatedAt
    setClauses.push('updatedAt = ?');
    params.push(now);

    // Add ID to params
    params.push(id);

    const sql = `UPDATE todos SET ${setClauses.join(', ')} WHERE id = ?`;

    const result = await db.run(sql, params);

    console.log('✅ Todo updated:', result);

    return (result.changes?.changes || 0) > 0;
  }

  /**
   * Toggle todo completion status
   */
  async toggleTodoCompletion(id: number): Promise<boolean> {
    const db = await this.dbBase.getDbConnection();

    const now = new Date().toISOString();
    const sql = `
      UPDATE todos 
      SET completed = CASE WHEN completed = 0 THEN 1 ELSE 0 END,
          updatedAt = ?
      WHERE id = ?
    `;

    const result = await db.run(sql, [now, id]);

    return (result.changes?.changes || 0) > 0;
  }

  /**
   * Delete a todo
   */
  async deleteTodo(id: number): Promise<boolean> {
    const db = await this.dbBase.getDbConnection();

    const sql = 'DELETE FROM todos WHERE id = ?';
    const result = await db.run(sql, [id]);

    console.log('🗑️ Todo deleted:', result);

    return (result.changes?.changes || 0) > 0;
  }

  /**
   * Delete all completed todos
   */
  async deleteCompletedTodos(): Promise<number> {
    const db = await this.dbBase.getDbConnection();

    const sql = 'DELETE FROM todos WHERE completed = 1';
    const result = await db.run(sql, []);

    const deletedCount = result.changes?.changes || 0;
    console.log(`🗑️ Deleted ${deletedCount} completed todos`);

    return deletedCount;
  }

  /**
   * Get todo statistics
   */
  async getTodoStats(): Promise<TodoStats> {
    const db = await this.dbBase.getDbConnection();

    // Get all stats in one query for efficiency
    const sql = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN priority = 'high' AND completed = 0 THEN 1 ELSE 0 END) as highPriority
      FROM todos
    `;

    const result = await db.query(sql);

    if (!result.values || result.values.length === 0) {
      return { total: 0, completed: 0, pending: 0, highPriority: 0 };
    }

    const row = result.values[0];
    return {
      total: row.total || 0,
      completed: row.completed || 0,
      pending: row.pending || 0,
      highPriority: row.highPriority || 0,
    };
  }

  /**
   * Search todos by title or description
   */
  async searchTodos(query: string): Promise<Todo[]> {
    const db = await this.dbBase.getDbConnection();

    const sql = `
      SELECT * FROM todos 
      WHERE title LIKE ? OR description LIKE ?
      ORDER BY completed ASC, priority DESC, dueDate ASC
    `;

    const searchTerm = `%${query}%`;
    const result = await db.query(sql, [searchTerm, searchTerm]);

    if (!result.values || result.values.length === 0) {
      return [];
    }

    return result.values.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      completed: row.completed === 1,
      priority: row.priority,
      dueDate: row.dueDate,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    }));
  }
}

