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
  IonButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { createOutline, keypadOutline, sparklesOutline } from 'ionicons/icons';
import { QuillEditorComponent, QuillEditorConfig } from './components/quill-editor.component';

@Component({
  selector: 'app-rich-text-editor-demo',
  templateUrl: './rich-text-editor-demo.page.html',
  styleUrls: ['./rich-text-editor-demo.page.scss'],
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
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    QuillEditorComponent
  ]
})
export class RichTextEditorDemoPage {
  // Event log
  eventLog: string[] = [];

  // Single editor
  content: string = '';

  // Editor configuration
  editorConfig: QuillEditorConfig = {
    placeholder: 'Start typing and use the floating toolbar to format your text...',
    height: '300px'
  };

  constructor() {
    addIcons({ createOutline, keypadOutline, sparklesOutline });
  }

  onEditorCreated(editor: any) {
    console.log('📝 Editor Created:', editor);
    this.logEvent('Editor: Ready');
  }

  onContentChanged(event: any) {
    this.logEvent(`Content changed (${event.text.trim().length} chars)`);
  }

  viewHTMLSource(content: string, title: string) {
    alert(`${title}\n\n${content || '(empty)'}`);
  }

  clearEditor() {
    this.content = '';
    this.logEvent('Editor: Cleared');
  }

  private logEvent(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog.unshift(`[${timestamp}] ${message}`);
    
    if (this.eventLog.length > 10) {
      this.eventLog = this.eventLog.slice(0, 10);
    }
  }
}

