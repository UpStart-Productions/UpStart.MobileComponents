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
import { calendarOutline, timeOutline, checkmarkDoneOutline, eyeOutline } from 'ionicons/icons';
import { DateScrollerComponent } from './date-scroller.component';
import moment from 'moment';

@Component({
  selector: 'app-date-scroller-demo',
  templateUrl: './date-scroller-demo.page.html',
  styleUrls: ['./date-scroller-demo.page.scss'],
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
    DateScrollerComponent
  ]
})
export class DateScrollerDemoPage {
  // Event log
  eventLog: string[] = [];

  // Example 1: Basic date scroller
  selectedDate1: string | null = null;

  // Example 2: With completed dates
  selectedDate2: string | null = null;
  completedDates: string[] = this.generateCompletedDates();

  // Example 3: Real-time activity tracking
  selectedDate3: string | null = null;
  activityDates: string[] = [];
  activityCount: number = 0;

  constructor() {
    addIcons({ calendarOutline, timeOutline, checkmarkDoneOutline, eyeOutline });
  }

  onDate1Selected(event: any) {
    this.selectedDate1 = event.date;
    this.logEvent(`Basic scroller: Selected ${moment(event.date).format('MMM D, YYYY')} (${event.dayName})`);
  }

  onDate2Selected(event: any) {
    this.selectedDate2 = event.date;
    const isCompleted = this.completedDates.includes(event.date);
    this.logEvent(`Completed dates: ${moment(event.date).format('MMM D, YYYY')} ${isCompleted ? '✓ completed' : '○ not completed'}`);
  }

  onDate3Selected(event: any) {
    this.selectedDate3 = event.date;
    
    // Toggle activity for selected date
    if (this.activityDates.includes(event.date)) {
      this.activityDates = this.activityDates.filter(d => d !== event.date);
      this.activityCount--;
      this.logEvent(`Activity removed: ${moment(event.date).format('MMM D, YYYY')}`);
    } else {
      this.activityDates.push(event.date);
      this.activityCount++;
      this.logEvent(`Activity added: ${moment(event.date).format('MMM D, YYYY')} 🎉`);
    }
  }

  private generateCompletedDates(): string[] {
    const dates: string[] = [];
    const today = moment();
    
    // Add some random completed dates in the last 30 days
    for (let i = 0; i < 12; i++) {
      const randomDays = Math.floor(Math.random() * 60);
      const date = today.clone().subtract(randomDays, 'days').format('YYYY-MM-DD');
      if (!dates.includes(date)) {
        dates.push(date);
      }
    }
    
    return dates;
  }

  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}

