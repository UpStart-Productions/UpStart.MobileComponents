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
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonText,
  IonChip,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { happyOutline, heartOutline, colorPaletteOutline } from 'ionicons/icons';
import { FeelingsComponent, FeelingOption } from './feelings.component';

@Component({
  selector: 'app-feelings-demo',
  templateUrl: './feelings-demo.page.html',
  styleUrls: ['./feelings-demo.page.scss'],
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
    IonList,
    IonItem,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonText,
    IonChip,
    IonIcon,
    FeelingsComponent
  ]
})
export class FeelingsDemoPage {
  // Demo state
  selectedFeeling1: FeelingOption | null = null;
  selectedFeeling2: FeelingOption | null = null;
  selectedFeeling3: FeelingOption | null = null;
  lastSubmittedNote: string = '';

  // Event logs for demo
  eventLog: string[] = [];

  constructor() {
    // Register icons
    addIcons({ happyOutline, heartOutline, colorPaletteOutline });
  }

  /**
   * Example 1: Normal mode with all features
   */
  onFeeling1Selected(feeling: FeelingOption) {
    this.selectedFeeling1 = feeling;
    this.logEvent(`Selected feeling: ${feeling.emoji} ${feeling.label} (${feeling.category})`);
  }

  onFeeling1NoteSubmitted(data: {feeling: FeelingOption, note: string}) {
    this.lastSubmittedNote = `${data.feeling.emoji} ${data.feeling.label}: ${data.note}`;
    this.logEvent(`Note submitted: "${data.note}"`);
  }

  onFeeling1ActionClicked(action: 'spotcheck' | 'journal') {
    this.logEvent(`Action clicked: ${action}`);
    alert(`In a real app, this would open the ${action} feature!`);
  }

  onFeeling1Cleared() {
    this.selectedFeeling1 = null;
    this.logEvent('Feeling cleared');
  }

  /**
   * Example 2: Emoji-only mode (form control)
   */
  onFeeling2Selected(feeling: FeelingOption) {
    this.selectedFeeling2 = feeling;
    this.logEvent(`Emoji-only selected: ${feeling.emoji} ${feeling.label}`);
  }

  /**
   * Example 3: Custom configuration
   */
  onFeeling3Selected(feeling: FeelingOption) {
    this.selectedFeeling3 = feeling;
    this.logEvent(`Custom widget selected: ${feeling.emoji} ${feeling.label}`);
  }

  onFeeling3NoteSubmitted(data: {feeling: FeelingOption, note: string}) {
    this.logEvent(`Custom note: "${data.note}"`);
  }

  /**
   * Clear all examples
   */
  clearAll() {
    this.selectedFeeling1 = null;
    this.selectedFeeling2 = null;
    this.selectedFeeling3 = null;
    this.lastSubmittedNote = '';
    this.eventLog = [];
  }

  /**
   * Log events for demo purposes
   */
  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    // Keep only last 10 events
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}
