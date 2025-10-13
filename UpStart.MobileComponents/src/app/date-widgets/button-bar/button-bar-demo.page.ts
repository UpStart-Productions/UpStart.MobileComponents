import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonText,
  IonChip,
  IonIcon,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { layersOutline, colorPaletteOutline, sparklesOutline } from 'ionicons/icons';
import { ButtonBarComponent, ButtonBarConfig } from './button-bar.component';

@Component({
  selector: 'app-button-bar-demo',
  templateUrl: './button-bar-demo.page.html',
  styleUrls: ['./button-bar-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonText,
    IonChip,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    ButtonBarComponent
  ]
})
export class ButtonBarDemoPage {
  // Event log
  eventLog: string[] = [];

  // Example 1: Date Range (like NephoPhone Export Data)
  dateRangeConfig: ButtonBarConfig = {
    buttons: [
      { label: '1W', value: '1week' },
      { label: '1M', value: '1month' },
      { label: '3M', value: '3months' },
      { label: '6M', value: '6months' },
      { label: '1Y', value: '1year' },
      { label: 'All', value: 'all' }
    ]
  };
  selectedDateRange = '1month';

  // Example 2: Tab Bar
  tabConfig: ButtonBarConfig = {
    buttons: [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
      { label: 'Year', value: 'year' }
    ],
    colors: {
      buttonBarColor: '#2196F3',
      highlighterColor: 'white',
      labelColor: 'white',
      highlighterLabelColor: '#2196F3'
    }
  };

  // Example 3: Filter Options
  filterConfig: ButtonBarConfig = {
    buttons: [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Completed', value: 'completed' }
    ],
    colors: {
      buttonBarColor: '#4CAF50',
      highlighterColor: '#FFEB3B',
      labelColor: 'white',
      highlighterLabelColor: '#2E7D32'
    }
  };

  // Example 4: Custom Colors
  customConfig: ButtonBarConfig = {
    buttons: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: 3 }
    ],
    colors: {
      buttonBarColor: '#FF6B6B',
      highlighterColor: '#FFF',
      labelColor: '#FFF',
      highlighterLabelColor: '#FF6B6B'
    }
  };

  constructor() {
    addIcons({ layersOutline, colorPaletteOutline, sparklesOutline });
  }

  onDateRangeSelected(value: string) {
    this.selectedDateRange = value;
    this.logEvent(`Date Range: ${value}`);
  }

  onTabSelected(value: string) {
    this.logEvent(`Tab selected: ${value}`);
  }

  onFilterSelected(value: string) {
    this.logEvent(`Filter: ${value}`);
  }

  onCustomSelected(value: number) {
    this.logEvent(`Custom option ${value} selected`);
  }

  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}

