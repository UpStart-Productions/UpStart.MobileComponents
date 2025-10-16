/**
 * TypeScript type definitions for SQLite Demo ToDo application
 */

export interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  highPriority: number;
}

export interface DatabaseInfo {
  dbName: string;
  version: number;
  platform: string;
  tables: string[];
  recordCounts: Record<string, number>;
}

