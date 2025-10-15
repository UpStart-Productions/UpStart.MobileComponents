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
import { calendarOutline, lockClosedOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { CalendarComponent } from './calendar.component';
import moment from 'moment';

@Component({
  selector: 'app-calendar-demo',
  templateUrl: './calendar-demo.page.html',
  styleUrls: ['./calendar-demo.page.scss'],
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
    CalendarComponent
  ]
})
export class CalendarDemoPage {
  // Event log
  eventLog: string[] = [];

  // Example 1: Basic calendar
  selectedDate1: string | null = moment().format('YYYY-MM-DD');

  // Example 2: Sobriety date with max date
  sobrietyDate: string = moment().subtract(90, 'days').format('YYYY-MM-DD');
  maxDate: string = moment().format('YYYY-MM-DD');

  // Example 3: With completed dates
  selectedDate3: string | null = null;
  completedDates: string[] = this.generateCompletedDates();

  constructor() {
    addIcons({ calendarOutline, lockClosedOutline, checkmarkCircleOutline });
  }

  onDate1Selected(date: string) {
    this.selectedDate1 = date;
    this.logEvent(`Basic calendar: Selected ${moment(date).format('MMM D, YYYY')}`);
  }

  onSobrietyDateSelected(date: string) {
    this.sobrietyDate = date;
    const daysSober = moment().diff(moment(date), 'days');
    this.logEvent(`Sobriety date: ${moment(date).format('MMM D, YYYY')} (${daysSober} days)`);
  }

  onDate3Selected(date: string) {
    this.selectedDate3 = date;
    const isCompleted = this.completedDates.includes(date);
    this.logEvent(`Activity tracker: ${moment(date).format('MMM D, YYYY')} ${isCompleted ? '✓ completed' : ''}`);
  }

  private generateCompletedDates(): string[] {
    const dates: string[] = [];
    const today = moment();
    
    // Add some random completed dates in the last 30 days
    for (let i = 0; i < 15; i++) {
      const randomDays = Math.floor(Math.random() * 30);
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


