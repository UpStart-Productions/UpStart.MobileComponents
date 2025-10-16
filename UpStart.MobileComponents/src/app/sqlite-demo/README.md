## SQLite Starter Kit - Complete Implementation Guide

A production-ready SQLite implementation for Ionic/Angular applications featuring full CRUD operations, type safety, and cross-platform support (iOS, Android, Web). Includes a complete ToDo app demo demonstrating best practices.

## Features

- ✅ **Complete Database Setup** - Connection management & initialization
- ✅ **Type-Safe CRUD Operations** - Full Create, Read, Update, Delete with TypeScript
- ✅ **Base Service Pattern** - Reusable architecture for all database services
- ✅ **Cross-Platform** - Works on iOS, Android, and Web (PWA)
- ✅ **Working Demo** - Functional ToDo app with search, filters, and stats
- ✅ **Error Handling** - Robust error handling and user feedback
- ✅ **Best Practices** - Follows NephoPhone's proven patterns

## Quick Start

### 1. Install Dependencies

```bash
npm install @capacitor-community/sqlite
npx cap sync
```

### 2. Copy the Files

Copy these files to your project:
```
src/app/sqlite-demo/
├── services/
│   ├── database-base.service.ts   # Base database connection management
│   └── todo.service.ts             # Example CRUD service
├── types/
│   └── todo.types.ts               # TypeScript type definitions
├── sqlite-demo.page.ts             # Demo UI component
├── sqlite-demo.page.html           # Demo UI template
└── sqlite-demo.page.scss           # Demo UI styles
```

### 3. Initialize in Your App

```typescript
// app.component.ts
import { DatabaseBaseService } from './sqlite-demo/services/database-base.service';

export class AppComponent implements OnInit {
  constructor(private dbBase: DatabaseBaseService) {}

  async ngOnInit() {
    await this.dbBase.initializePlugin();
    await this.dbBase.openDatabase();
  }
}
```

## Architecture Overview

### DatabaseBaseService

Handles SQLite connection management:
- Platform detection (native vs web)
- Database initialization
- Connection pooling
- Table creation
- Database reset (dev/testing)

```typescript
// Get database connection
const db = await this.dbBase.getDbConnection();

// Execute SQL
await db.execute('CREATE TABLE IF NOT EXISTS...');

// Run query
const result = await db.query('SELECT * FROM todos');
```

### Service Pattern

Each database entity gets its own service extending the base:

```typescript
@Injectable({ providedIn: 'root' })
export class TodoService {
  constructor(private dbBase: DatabaseBaseService) {}

  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const db = await this.dbBase.getDbConnection();
    const sql = 'INSERT INTO todos (title, ...) VALUES (?, ...)';
    const result = await db.run(sql, [todo.title, ...]);
    return { id: result.changes?.lastId, ...todo };
  }
}
```

### Type Safety

Full TypeScript type definitions:

```typescript
export interface Todo {
  id?: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

## Core Patterns

### 1. Database Initialization

```typescript
async initializePlugin(): Promise<boolean> {
  // Detect platform
  if (this.platformService.is('ios') || this.platformService.is('android')) {
    this.platform = 'native';
  } else {
    this.platform = 'web';
  }

  // Initialize SQLite
  const ret = await CapacitorSQLite.isSecretStored();
  this.isService = ret.result ?? false;
  return true;
}
```

### 2. Connection Management

```typescript
async getDbConnection(): Promise<SQLiteDBConnection> {
  if (!this.db) {
    await this.openDatabase();
  }

  // Verify connection is open
  if (typeof this.db.isDBOpen === 'function') {
    const isOpen = await this.db.isDBOpen();
    if (!isOpen) {
      await this.db.open();
    }
  }

  return this.db;
}
```

### 3. Table Creation

```typescript
private async createTables(): Promise<void> {
  const db = await this.getDbConnection();

  const createTodosTable = `
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      completed INTEGER NOT NULL DEFAULT 0,
      priority TEXT NOT NULL DEFAULT 'medium',
      dueDate TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `;

  await db.execute(createTodosTable);
}
```

### 4. CRUD Operations

#### Create
```typescript
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
    now
  ]);

  return { id: result.changes?.lastId, ...todo, createdAt: now, updatedAt: now };
}
```

#### Read
```typescript
async getAllTodos(filters?: { completed?: boolean }): Promise<Todo[]> {
  const db = await this.dbBase.getDbConnection();

  let sql = 'SELECT * FROM todos';
  const params: any[] = [];

  if (filters?.completed !== undefined) {
    sql += ' WHERE completed = ?';
    params.push(filters.completed ? 1 : 0);
  }

  sql += ' ORDER BY completed ASC, priority DESC';

  const result = await db.query(sql, params);

  return result.values?.map((row: any) => ({
    id: row.id,
    title: row.title,
    completed: row.completed === 1,
    // ... map other fields
  })) || [];
}
```

#### Update
```typescript
async updateTodo(id: number, updates: Partial<Todo>): Promise<boolean> {
  const db = await this.dbBase.getDbConnection();
  const now = new Date().toISOString();

  const setClauses: string[] = [];
  const params: any[] = [];

  if (updates.title !== undefined) {
    setClauses.push('title = ?');
    params.push(updates.title);
  }
  // ... add other fields

  setClauses.push('updatedAt = ?');
  params.push(now);
  params.push(id);

  const sql = `UPDATE todos SET ${setClauses.join(', ')} WHERE id = ?`;
  const result = await db.run(sql, params);

  return (result.changes?.changes || 0) > 0;
}
```

#### Delete
```typescript
async deleteTodo(id: number): Promise<boolean> {
  const db = await this.dbBase.getDbConnection();
  const sql = 'DELETE FROM todos WHERE id = ?';
  const result = await db.run(sql, [id]);
  return (result.changes?.changes || 0) > 0;
}
```

### 5. Advanced Queries

#### Search
```typescript
async searchTodos(query: string): Promise<Todo[]> {
  const db = await this.dbBase.getDbConnection();
  
  const sql = `
    SELECT * FROM todos 
    WHERE title LIKE ? OR description LIKE ?
    ORDER BY completed ASC, priority DESC
  `;

  const searchTerm = `%${query}%`;
  const result = await db.query(sql, [searchTerm, searchTerm]);
  
  return result.values?.map(this.mapRowToTodo) || [];
}
```

#### Statistics
```typescript
async getTodoStats(): Promise<TodoStats> {
  const db = await this.dbBase.getDbConnection();

  const sql = `
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN completed = 1 THEN 1 ELSE 0 END) as completed,
      SUM(CASE WHEN completed = 0 THEN 1 ELSE 0 END) as pending
    FROM todos
  `;

  const result = await db.query(sql);
  const row = result.values?.[0];
  
  return {
    total: row.total || 0,
    completed: row.completed || 0,
    pending: row.pending || 0
  };
}
```

## Extending for Your App

### Create a New Entity Service

1. **Define Types**
```typescript
// types/note.types.ts
export interface Note {
  id?: number;
  title: string;
  content: string;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}
```

2. **Create Service**
```typescript
// services/note.service.ts
@Injectable({ providedIn: 'root' })
export class NoteService {
  constructor(private dbBase: DatabaseBaseService) {}

  async createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
    const db = await this.dbBase.getDbConnection();
    const now = new Date().toISOString();
    
    const sql = 'INSERT INTO notes (title, content, tags, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)';
    const result = await db.run(sql, [note.title, note.content, note.tags || null, now, now]);
    
    return { id: result.changes?.lastId, ...note, createdAt: now, updatedAt: now };
  }

  // Add getAllNotes, getNoteById, updateNote, deleteNote...
}
```

3. **Add Table Creation**
```typescript
// database-base.service.ts - Add to createTables()
const createNotesTable = `
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`;

await db.execute(createNotesTable);
```

## Best Practices

### 1. Always Use Prepared Statements

✅ **Good** (Safe from SQL injection):
```typescript
const sql = 'SELECT * FROM todos WHERE title = ?';
const result = await db.query(sql, [userInput]);
```

❌ **Bad** (SQL injection risk):
```typescript
const sql = `SELECT * FROM todos WHERE title = '${userInput}'`;
const result = await db.query(sql);
```

### 2. Handle Errors Gracefully

```typescript
try {
  await this.todoService.createTodo(newTodo);
  this.showToast('Todo created!', 'success');
} catch (error) {
  console.error('Error creating todo:', error);
  this.showToast('Failed to create todo', 'danger');
}
```

### 3. Use Transactions for Multiple Operations

```typescript
await db.execute('BEGIN TRANSACTION');
try {
  await db.run('INSERT INTO todos ...');
  await db.run('INSERT INTO tags ...');
  await db.execute('COMMIT');
} catch (error) {
  await db.execute('ROLLBACK');
  throw error;
}
```

### 4. Type Safety

Always define TypeScript types for your entities:
- Use interfaces for database models
- Use `Omit<>` for partial types in create/update methods
- Convert boolean to 0/1 for SQLite compatibility

### 5. Connection Management

- Always use `getDbConnection()` to ensure connection is open
- Don't store raw connection references in components
- Let the base service handle connection lifecycle

## Demo Features

The included ToDo demo showcases:

- ✅ **Full CRUD** - Create, read, update, delete todos
- ✅ **Search** - Filter todos by title/description
- ✅ **Filters** - View all, pending, or completed
- ✅ **Stats** - Real-time statistics dashboard
- ✅ **Priority Levels** - Low, medium, high priority
- ✅ **Due Dates** - Optional date tracking
- ✅ **Batch Operations** - Delete all completed
- ✅ **Database Info** - View database details
- ✅ **Reset** - Development database reset

## Platform-Specific Notes

### iOS
- Uses native SQLite
- Data persists in app's Documents directory
- Full offline support
- Fast performance

### Android
- Uses native SQLite
- Data persists in app's data directory
- Full offline support
- Fast performance

### Web (PWA)
- Uses Web SQL or IndexedDB fallback
- Data persists in browser storage
- May have storage limits (browser-dependent)
- Slightly slower than native

## Troubleshooting

### Database not initializing

```typescript
// Check if plugin is loaded
await this.dbBase.initializePlugin();
console.log('Plugin initialized');

// Check platform
console.log('Platform:', this.platform.platforms());
```

### Connection errors

```typescript
// Ensure database is opened before queries
const db = await this.dbBase.getDbConnection();
const isOpen = await db.isDBOpen();
console.log('Database is open:', isOpen);
```

### Queries returning no results

```typescript
// Log the actual query
console.log('SQL:', sql);
console.log('Params:', params);

// Check if table exists
const tables = await db.query("SELECT name FROM sqlite_master WHERE type='table'");
console.log('Tables:', tables.values);
```

### Type conversion issues

```typescript
// Boolean to SQLite
const sqliteBoolean = jsBoolean ? 1 : 0;

// SQLite to Boolean
const jsBoolean = sqliteInt === 1;

// Dates
const dateString = new Date().toISOString(); // Store as ISO string
const dateObject = new Date(sqliteDateString); // Parse back
```

## Performance Tips

1. **Use Indexes** for frequently queried columns
```sql
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_priority ON todos(priority);
```

2. **Limit Results** for large datasets
```sql
SELECT * FROM todos LIMIT 100 OFFSET 0
```

3. **Use Transactions** for bulk operations
```typescript
await db.execute('BEGIN TRANSACTION');
// Multiple inserts/updates
await db.execute('COMMIT');
```

4. **Cache Frequently Accessed Data** in memory
```typescript
private cachedStats: TodoStats | null = null;

async getStats(forceRefresh = false): Promise<TodoStats> {
  if (!forceRefresh && this.cachedStats) {
    return this.cachedStats;
  }
  this.cachedStats = await this.loadStatsFromDb();
  return this.cachedStats;
}
```

## Migration Strategy

When you need to update your database schema:

1. **Version your database**
```typescript
private readonly DB_VERSION = 2;
```

2. **Check version and migrate**
```typescript
async checkAndMigrate() {
  const currentVersion = await this.getSchemaVersion();
  
  if (currentVersion < this.DB_VERSION) {
    await this.migrateDatabase(currentVersion, this.DB_VERSION);
  }
}
```

3. **Apply migrations**
```typescript
async migrateDatabase(from: number, to: number) {
  if (from === 1 && to === 2) {
    await db.execute('ALTER TABLE todos ADD COLUMN tags TEXT');
  }
  await this.setSchemaVersion(to);
}
```

## Security Considerations

1. **Input Validation** - Always validate user input before queries
2. **Prepared Statements** - Use parameterized queries (never string concatenation)
3. **Encryption** - For sensitive data, use `@capacitor-community/sqlite` encryption features
4. **Permissions** - Request storage permissions on Android if needed

## Resources

- **SQLite Documentation**: https://www.sqlite.org/docs.html
- **Capacitor SQLite Plugin**: https://github.com/capacitor-community/sqlite
- **TypeScript Guide**: https://www.typescriptlang.org/docs/
- **Ionic Framework**: https://ionicframework.com/docs/

## License

This starter kit is part of the UpStart MobileComponents library.

---

**Ready to build!** 🚀 This starter kit provides everything you need for production-ready SQLite integration in your Ionic/Angular app.
