import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCheckbox,
  IonBadge,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  AlertController,
  ModalController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  trashOutline,
  createOutline,
  checkmarkCircleOutline,
  ellipseOutline,
  refreshOutline,
  statsChartOutline,
  searchOutline,
  closeCircleOutline,
  calendarOutline,
  flagOutline
} from 'ionicons/icons';
import { DatabaseBaseService } from './services/database-base.service';
import { TodoService } from './services/todo.service';
import { Todo, TodoStats } from './types/todo.types';

@Component({
  selector: 'app-sqlite-demo',
  templateUrl: './sqlite-demo.page.html',
  styleUrls: ['./sqlite-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonCheckbox,
    IonBadge,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption
  ]
})
export class SqliteDemoPage implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  stats: TodoStats = { total: 0, completed: 0, pending: 0, highPriority: 0 };
  
  // Filters
  filterSegment: 'all' | 'pending' | 'completed' = 'all';
  searchQuery: string = '';
  
  // New/Edit Todo
  isAdding: boolean = false;
  editingTodo: Todo | null = null;
  todoForm = {
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: ''
  };

  // Loading states
  isLoading: boolean = true;
  isInitialized: boolean = false;

  constructor(
    private dbBase: DatabaseBaseService,
    private todoService: TodoService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      addOutline,
      trashOutline,
      createOutline,
      checkmarkCircleOutline,
      ellipseOutline,
      refreshOutline,
      statsChartOutline,
      searchOutline,
      closeCircleOutline,
      calendarOutline,
      flagOutline
    });
  }

  async ngOnInit() {
    await this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      console.log('🚀 Initializing SQLite Demo...');
      
      // Database is already initialized at app level, just open it
      await this.dbBase.openDatabase();
      
      this.isInitialized = true;
      console.log('✅ Database ready');
      
      // Load initial data
      await this.loadTodos();
      await this.loadStats();
      
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      
      const alert = await this.alertController.create({
        header: 'Database Error',
        message: `Failed to initialize database: ${(error as Error).message || error}. Please reload the app.`,
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      this.isLoading = false;
    }
  }

  async loadTodos() {
    try {
      this.todos = await this.todoService.getAllTodos();
      this.applyFilters();
    } catch (error) {
      console.error('Error loading todos:', error);
      this.showToast('Failed to load todos', 'danger');
    }
  }

  async loadStats() {
    try {
      this.stats = await this.todoService.getTodoStats();
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  applyFilters() {
    let filtered = [...this.todos];

    // Apply segment filter
    if (this.filterSegment === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.filterSegment === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query)
      );
    }

    this.filteredTodos = filtered;
  }

  onFilterChange(event: any) {
    this.filterSegment = event.detail.value;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchQuery = event.detail.value || '';
    this.applyFilters();
  }

  startAddTodo() {
    this.isAdding = true;
    this.editingTodo = null;
    this.resetForm();
  }

  cancelAdd() {
    this.isAdding = false;
    this.editingTodo = null;
    this.resetForm();
  }

  resetForm() {
    this.todoForm = {
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    };
  }

  async saveTodo() {
    if (!this.todoForm.title.trim()) {
      this.showToast('Please enter a title', 'warning');
      return;
    }

    try {
      if (this.editingTodo) {
        // Update existing todo
        await this.todoService.updateTodo(this.editingTodo.id!, {
          title: this.todoForm.title,
          description: this.todoForm.description,
          priority: this.todoForm.priority,
          dueDate: this.todoForm.dueDate || undefined
        });
        
        this.showToast('Todo updated!', 'success');
      } else {
        // Create new todo
        await this.todoService.createTodo({
          title: this.todoForm.title,
          description: this.todoForm.description,
          completed: false,
          priority: this.todoForm.priority,
          dueDate: this.todoForm.dueDate || undefined
        });
        
        this.showToast('Todo created!', 'success');
      }

      this.cancelAdd();
      await this.loadTodos();
      await this.loadStats();
      
    } catch (error) {
      console.error('Error saving todo:', error);
      this.showToast('Failed to save todo', 'danger');
    }
  }

  startEditTodo(todo: Todo) {
    this.editingTodo = todo;
    this.isAdding = true;
    this.todoForm = {
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority,
      dueDate: todo.dueDate || ''
    };
  }

  async toggleTodo(todo: Todo) {
    try {
      await this.todoService.toggleTodoCompletion(todo.id!);
      await this.loadTodos();
      await this.loadStats();
    } catch (error) {
      console.error('Error toggling todo:', error);
      this.showToast('Failed to update todo', 'danger');
    }
  }

  async deleteTodo(todo: Todo) {
    const alert = await this.alertController.create({
      header: 'Delete Todo',
      message: `Are you sure you want to delete "${todo.title}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            try {
              await this.todoService.deleteTodo(todo.id!);
              this.showToast('Todo deleted', 'success');
              await this.loadTodos();
              await this.loadStats();
            } catch (error) {
              console.error('Error deleting todo:', error);
              this.showToast('Failed to delete todo', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteCompleted() {
    const alert = await this.alertController.create({
      header: 'Delete Completed',
      message: `Delete all ${this.stats.completed} completed todos?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete All',
          role: 'destructive',
          handler: async () => {
            try {
              const count = await this.todoService.deleteCompletedTodos();
              this.showToast(`Deleted ${count} todos`, 'success');
              await this.loadTodos();
              await this.loadStats();
            } catch (error) {
              console.error('Error deleting completed todos:', error);
              this.showToast('Failed to delete todos', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async resetDatabase() {
    const alert = await this.alertController.create({
      header: 'Reset Database',
      message: 'This will delete ALL todos and reset the database. This action cannot be undone!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Reset',
          role: 'destructive',
          handler: async () => {
            try {
              await this.dbBase.resetDatabase();
              this.showToast('Database reset successfully', 'success');
              await this.loadTodos();
              await this.loadStats();
            } catch (error) {
              console.error('Error resetting database:', error);
              this.showToast('Failed to reset database', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async showDatabaseInfo() {
    try {
      const info = await this.dbBase.getDatabaseInfo();
      
      const alert = await this.alertController.create({
        header: 'Database Info',
        message: `
          <strong>Database:</strong> ${info.dbName}<br/>
          <strong>Platform:</strong> ${info.platform}<br/>
          <strong>Tables:</strong> ${info.tables.join(', ')}<br/>
          <strong>Records:</strong> ${info.recordCounts.todos} todos
        `,
        buttons: ['OK']
      });

      await alert.present();
    } catch (error) {
      console.error('Error getting database info:', error);
      this.showToast('Failed to get database info', 'danger');
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'medium';
    }
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}

