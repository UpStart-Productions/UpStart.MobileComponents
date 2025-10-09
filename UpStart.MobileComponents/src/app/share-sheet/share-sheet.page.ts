import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonList,
  IonListHeader,
  IonButtons,
  IonBackButton,
  IonChip,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { shareOutline, mailOutline, chatbubbleOutline } from 'ionicons/icons';
import { SharingService } from './services/sharing.service';

@Component({
  selector: 'app-share-sheet',
  templateUrl: './share-sheet.page.html',
  styleUrls: ['./share-sheet.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonText,
    IonList,
    IonListHeader,
    IonButtons,
    IonBackButton,
    IonChip,
    IonIcon
  ]
})
export class ShareSheetPage {
  @ViewChild('formattedContent', { static: false }) formattedContent!: ElementRef<HTMLElement>;

  // Demo data
  recipientEmail = '';
  customTitle = 'My Custom Share';
  customHtmlContent = '<h2>Custom Content</h2><p>This is a <strong>custom share</strong> with HTML formatting.</p>';

  constructor(private sharingService: SharingService) {
    // Register icons
    addIcons({ shareOutline, mailOutline, chatbubbleOutline });
  }

  /**
   * Example 1: Share formatted HTML content from ViewChild
   */
  async shareFormattedContent() {
    await this.sharingService.shareContent({
      title: 'Formatted Note',
      subject: 'My Formatted Note',
      contentElement: this.formattedContent,
      recipientEmail: this.recipientEmail || undefined
    });
  }

  /**
   * Example 2: Share pre-formatted HTML string
   */
  async shareCustomContent() {
    await this.sharingService.shareContent({
      title: this.customTitle,
      subject: `Sharing: ${this.customTitle}`,
      htmlContent: this.customHtmlContent,
      recipientEmail: this.recipientEmail || undefined
    });
  }

  /**
   * Example 3: Share simple text with meeting notes
   */
  async shareMeetingNotes() {
    const meetingNotes = `
      <h2>Team Meeting Notes</h2>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      <h3>Agenda Items:</h3>
      <ul>
        <li>Project status update</li>
        <li>Budget review</li>
        <li>Next steps</li>
      </ul>
      <h3>Action Items:</h3>
      <ul>
        <li>Complete documentation</li>
        <li>Schedule follow-up</li>
        <li>Review feedback</li>
      </ul>
    `;

    await this.sharingService.shareContent({
      title: 'Team Meeting Notes',
      subject: 'Meeting Notes - ' + new Date().toLocaleDateString(),
      htmlContent: meetingNotes,
      recipientEmail: this.recipientEmail || undefined
    });
  }

  /**
   * Example 4: Test the HTML to text conversion
   */
  testConversion() {
    const html = '<h1>Test</h1><p>This is <strong>bold</strong> and <em>italic</em>.</p><ul><li>Item 1</li><li>Item 2</li></ul>';
    const result = this.sharingService.testHtmlToTextConversion(html);
    console.log('HTML to Text Conversion Result:', result);
    alert('Check console for conversion result!');
  }
}
