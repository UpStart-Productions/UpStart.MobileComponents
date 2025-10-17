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
import { calendarOutline, flashOutline, checkmarkDoneOutline, toggleOutline } from 'ionicons/icons';
import { WeekdayPickerComponent } from './weekday-picker.component';

@Component({
  selector: 'app-weekday-picker-demo',
  templateUrl: './weekday-picker-demo.page.html',
  styleUrls: ['./weekday-picker-demo.page.scss'],
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
    WeekdayPickerComponent
  ]
})
export class WeekdayPickerDemoPage {
  // Event log
  eventLog: string[] = [];

  // Example 1: Default (all days selected)
  selectedWeekdays1: any = null;

  // Example 2: Weekdays only
  selectedWeekdays2: any = [
    { 'day': 'Sunday', 'selected': false },
    { 'day': 'Monday', 'selected': true },
    { 'day': 'Tuesday', 'selected': true },
    { 'day': 'Wednesday', 'selected': true },
    { 'day': 'Thursday', 'selected': true },
    { 'day': 'Friday', 'selected': true },
    { 'day': 'Saturday', 'selected': false }
  ];

  // Example 3: Weekends only
  selectedWeekdays3: any = [
    { 'day': 'Sunday', 'selected': true },
    { 'day': 'Monday', 'selected': false },
    { 'day': 'Tuesday', 'selected': false },
    { 'day': 'Wednesday', 'selected': false },
    { 'day': 'Thursday', 'selected': false },
    { 'day': 'Friday', 'selected': false },
    { 'day': 'Saturday', 'selected': true }
  ];

  // Example 4: Custom pattern (MWF)
  selectedWeekdays4: any = [
    { 'day': 'Sunday', 'selected': false },
    { 'day': 'Monday', 'selected': true },
    { 'day': 'Tuesday', 'selected': false },
    { 'day': 'Wednesday', 'selected': true },
    { 'day': 'Thursday', 'selected': false },
    { 'day': 'Friday', 'selected': true },
    { 'day': 'Saturday', 'selected': false }
  ];

  constructor() {
    addIcons({ calendarOutline, flashOutline, checkmarkDoneOutline, toggleOutline });
  }

  onWeekdays1Selected(weekdays: any) {
    this.selectedWeekdays1 = weekdays;
    this.logEvent(`Default: ${this.getSelectedDaysString(weekdays)}`);
  }

  onWeekdays2Selected(weekdays: any) {
    this.selectedWeekdays2 = weekdays;
    this.logEvent(`Weekdays: ${this.getSelectedDaysString(weekdays)}`);
  }

  onWeekdays3Selected(weekdays: any) {
    this.selectedWeekdays3 = weekdays;
    this.logEvent(`Weekends: ${this.getSelectedDaysString(weekdays)}`);
  }

  onWeekdays4Selected(weekdays: any) {
    this.selectedWeekdays4 = weekdays;
    this.logEvent(`Custom: ${this.getSelectedDaysString(weekdays)}`);
  }

  getSelectedDaysString(weekdays: any): string {
    if (!weekdays) return 'None';
    const selected = weekdays.filter((d: any) => d.selected).map((d: any) => d.day.substring(0, 3));
    return selected.length === 7 ? 'Every day' : selected.join(', ');
  }

  getSelectedCount(weekdays: any): number {
    if (!weekdays) return 0;
    return weekdays.filter((d: any) => d.selected).length;
  }

  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}

