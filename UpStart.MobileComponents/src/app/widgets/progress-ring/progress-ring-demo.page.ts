import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonRange,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pieChartOutline, colorPaletteOutline, timeOutline } from 'ionicons/icons';
import { ProgressRingComponent } from './progress-ring.component';

@Component({
  selector: 'app-progress-ring-demo',
  templateUrl: './progress-ring-demo.page.html',
  styleUrls: ['./progress-ring-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonRange,
    IonItem,
    IonLabel,
    IonButton,
    ProgressRingComponent
  ]
})
export class ProgressRingDemoPage {
  // Interactive progress value
  progress: number = 65;
  
  // Timer simulation
  timerProgress: number = 0;
  timerInterval: any;

  constructor() {
    addIcons({ pieChartOutline, colorPaletteOutline, timeOutline });
  }

  startTimer() {
    this.timerProgress = 0;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    
    this.timerInterval = setInterval(() => {
      this.timerProgress += 1;
      if (this.timerProgress >= 100) {
        clearInterval(this.timerInterval);
      }
    }, 100);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  resetTimer() {
    this.stopTimer();
    this.timerProgress = 0;
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}


