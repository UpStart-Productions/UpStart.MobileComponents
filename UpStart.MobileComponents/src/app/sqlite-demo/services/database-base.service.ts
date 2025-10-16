import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

/**
 * Base Database Service
 * 
 * Handles SQLite connection management and initialization.
 * Supports iOS, Android, and Web platforms.
 */
@Injectable({
  providedIn: 'root',
})
export class DatabaseBaseService {
  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isService: boolean = false;
  private platform: string = '';
  private static sharedDb: SQLiteDBConnection | null = null;
  private static isInitializing: boolean = false;
  private readonly DB_NAME = 'todos_app';

  constructor(private platformService: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  /**
   * Initialize the SQLite plugin
   */
  async initializePlugin(): Promise<boolean> {
    console.log('🔌 Initializing SQLite plugin...');

    // Detect platform
    if (this.platformService.is('ios') || this.platformService.is('android')) {
      this.platform = 'native';
    } else {
      this.platform = 'web';
    }

    console.log(`📱 Platform detected: ${this.platform}`);

    // Check if service is available
    const ret = await CapacitorSQLite.isSecretStored();
    this.isService = ret.result ?? false;

    return true;
  }

  /**
   * Open database connection
   */
  async openDatabase(): Promise<void> {
    // Prevent concurrent initialization
    if (DatabaseBaseService.isInitializing) {
      console.log('⏳ Database initialization already in progress...');
      // Wait for initialization to complete
      while (DatabaseBaseService.isInitializing) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (DatabaseBaseService.sharedDb) {
        this.db = DatabaseBaseService.sharedDb;
        return;
      }
    }

    DatabaseBaseService.isInitializing = true;

    try {
      // Check if connection already exists
      try {
        this.db = await this.sqlite.retrieveConnection(this.DB_NAME, false);
        console.log('✅ Database connection already exists');

        // Check if open
        if (typeof this.db.isDBOpen === 'function') {
          const isOpen = await this.db.isDBOpen();
          if (!isOpen) {
            await this.db.open();
            console.log('🔓 Reopened existing connection');
          }
        }

        DatabaseBaseService.sharedDb = this.db;
        return;
      } catch (error) {
        console.log('📝 No existing connection, creating new one...');
      }

      // Save to store on web platform
      if (this.platform === 'web') {
        await this.sqlite.saveToStore(this.DB_NAME);
      }

      // Create new connection
      try {
        this.db = await this.sqlite.createConnection(
          this.DB_NAME,
          false,
          'no-encryption',
          1,
          false
        );
      } catch (error: any) {
        if (error.message?.includes('Connection') && error.message?.includes('already exists')) {
          console.log('🔄 Connection exists, retrieving...');
          this.db = await this.sqlite.retrieveConnection(this.DB_NAME, false);
        } else {
          throw error;
        }
      }

      await this.db.open();
      console.log('✅ Database opened successfully');

      // Store as shared connection
      DatabaseBaseService.sharedDb = this.db;

      // Initialize tables
      await this.createTables();
    } finally {
      DatabaseBaseService.isInitializing = false;
    }
  }

  /**
   * Create database tables
   */
  private async createTables(): Promise<void> {
    console.log('📊 Creating database tables...');

    const db = await this.getDbConnection();

    // Create todos table
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
    console.log('✅ Tables created successfully');
  }

  /**
   * Get database connection (ensures it's open)
   */
  async getDbConnection(): Promise<SQLiteDBConnection> {
    if (!this.db) {
      await this.openDatabase();
    }

    if (!this.db) {
      throw new Error('Failed to establish database connection');
    }

    // Verify connection is still open
    if (typeof this.db.isDBOpen === 'function') {
      const isOpen = await this.db.isDBOpen();
      if (!isOpen) {
        await this.db.open();
        console.log('🔓 Reopened database connection');
      }
    }

    return this.db;
  }

  /**
   * Close database connection
   */
  async closeDatabase(): Promise<void> {
    if (this.db) {
      try {
        await this.db.close();
        console.log('🔒 Database closed');
      } catch (error) {
        console.warn('⚠️ Error closing database:', error);
      }
    }
  }

  /**
   * Reset database (for development/testing)
   */
  async resetDatabase(): Promise<void> {
    console.log('🗑️ Resetting database...');

    const db = await this.getDbConnection();

    // Drop all tables
    await db.execute('DROP TABLE IF EXISTS todos');

    console.log('✅ Database reset complete');

    // Recreate tables
    await this.createTables();
  }

  /**
   * Get database information
   */
  async getDatabaseInfo(): Promise<any> {
    const db = await this.getDbConnection();

    // Get table list
    const tables = await db.query(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );

    // Get record counts
    const todosCount = await db.query('SELECT COUNT(*) as count FROM todos');

    return {
      dbName: this.DB_NAME,
      platform: this.platform,
      tables: tables.values?.map((t: any) => t.name) || [],
      recordCounts: {
        todos: todosCount.values?.[0]?.count || 0,
      },
    };
  }
}

