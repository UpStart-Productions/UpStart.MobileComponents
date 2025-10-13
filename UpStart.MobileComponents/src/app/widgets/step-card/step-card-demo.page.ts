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
import { layersOutline, ribbonOutline, colorPaletteOutline } from 'ionicons/icons';
import { StepCardComponent, StepData } from './step-card.component';

@Component({
  selector: 'app-step-card-demo',
  templateUrl: './step-card-demo.page.html',
  styleUrls: ['./step-card-demo.page.scss'],
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
    StepCardComponent
  ]
})
export class StepCardDemoPage {
  // Event log
  eventLog: string[] = [];

  // Sample steps
  steps: StepData[] = [
    {
      id: 1,
      stepNumber: 1,
      title: 'Getting Started',
      description: 'Learn the basics and set up your environment',
      isActive: true
    },
    {
      id: 2,
      stepNumber: 2,
      title: 'Building Your First Feature',
      description: 'Create your first component and understand the workflow'
    },
    {
      id: 3,
      stepNumber: 3,
      title: 'Advanced Patterns',
      description: 'Master complex patterns and best practices'
    }
  ];

  // Custom colors for examples
  customColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

  constructor() {
    addIcons({ layersOutline, ribbonOutline, colorPaletteOutline });
  }

  onActionClicked(event: {stepNumber: number, action: string}) {
    this.logEvent(`Action clicked: Step ${event.stepNumber} - ${event.action}`);
    alert(`In a real app, this would open the ${event.action} feature for Step ${event.stepNumber}!`);
  }

  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}

