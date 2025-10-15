import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButtons, 
  IonButton,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonText,
  IonSpinner,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  documentTextOutline, 
  shareOutline, 
  downloadOutline,
  newspaperOutline,
  readerOutline,
  clipboardOutline
} from 'ionicons/icons';
import { PdfService } from './services/pdf.service';

interface ExportExample {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  htmlContent: string;
  pdfTitle?: string;
  pdfSubtitle?: string;
}

@Component({
  selector: 'app-pdf-export-demo',
  templateUrl: './pdf-export-demo.page.html',
  styleUrls: ['./pdf-export-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonText,
    IonSpinner
  ]
})
export class PdfExportDemoPage {
  isExporting = false;
  currentExportId: string | null = null;

  exportExamples: ExportExample[] = [
    {
      id: 'simple',
      title: 'Simple Document',
      subtitle: 'Basic text with headers',
      description: 'A clean, minimalist document with headings and paragraphs',
      icon: 'document-text-outline',
      pdfTitle: 'Simple Document Example',
      pdfSubtitle: 'Basic formatting demonstration',
      htmlContent: `
        <h1>Welcome to PDF Export</h1>
        <p>This is a simple document with basic text formatting. PDFs are generated on-device using pdfmake and can be shared via the native share sheet.</p>
        
        <h2>Why Use PDF Export?</h2>
        <p>PDF export is perfect for:</p>
        <ul>
          <li>Creating reports from app data</li>
          <li>Sharing formatted content with others</li>
          <li>Archiving information for offline access</li>
          <li>Professional document distribution</li>
        </ul>
        
        <h2>Key Features</h2>
        <p>Our PDF export system includes:</p>
        <ul>
          <li><b>HTML to PDF conversion</b> - Convert rich HTML to professional PDFs</li>
          <li><b>Custom styling</b> - Maintain your brand with custom fonts and colors</li>
          <li><b>Native sharing</b> - Share via email, messages, cloud storage, etc.</li>
          <li><b>Auto cleanup</b> - Temporary files are automatically removed</li>
        </ul>
        
        <p style="margin-top: 20px;"><i>This document was generated on-device with zero external dependencies.</i></p>
      `
    },
    {
      id: 'styled',
      title: 'Styled Report',
      subtitle: 'Professional formatting',
      description: 'Business-ready document with rich styling and sections',
      icon: 'newspaper-outline',
      pdfTitle: 'Quarterly Performance Report',
      pdfSubtitle: 'Q4 2024 Analysis',
      htmlContent: `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2196F3; font-size: 24px; margin-bottom: 10px;">Executive Summary</h1>
          <p style="color: #666; font-style: italic;">Comprehensive overview of key metrics and achievements</p>
        </div>
        
        <h2 style="color: #2196F3; border-bottom: 2px solid #2196F3; padding-bottom: 5px;">Key Achievements</h2>
        <p style="line-height: 1.6; margin-bottom: 15px;">
          This quarter demonstrated exceptional growth across all key performance indicators. Our team successfully delivered on strategic initiatives while maintaining operational excellence.
        </p>
        
        <h2 style="color: #2196F3; border-bottom: 2px solid #2196F3; padding-bottom: 5px;">Performance Metrics</h2>
        <ul style="line-height: 1.8;">
          <li><b>User Growth:</b> 125% increase in active users</li>
          <li><b>Revenue:</b> $2.4M ARR (+180% YoY)</li>
          <li><b>Customer Satisfaction:</b> 4.8/5.0 rating</li>
          <li><b>Feature Releases:</b> 23 major updates shipped</li>
        </ul>
        
        <h2 style="color: #2196F3; border-bottom: 2px solid #2196F3; padding-bottom: 5px;">Strategic Initiatives</h2>
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #2196F3; margin: 15px 0;">
          <b>Initiative #1:</b> Mobile App Launch<br/>
          Successfully launched iOS and Android apps with 50K+ downloads in first month.
        </p>
        
        <p style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #2196F3; margin: 15px 0;">
          <b>Initiative #2:</b> Enterprise Features<br/>
          Rolled out advanced security and compliance features for enterprise customers.
        </p>
        
        <h2 style="color: #2196F3; border-bottom: 2px solid #2196F3; padding-bottom: 5px;">Next Quarter Goals</h2>
        <ol style="line-height: 1.8;">
          <li>Expand to 3 new international markets</li>
          <li>Launch AI-powered features</li>
          <li>Achieve SOC 2 compliance</li>
          <li>Grow team by 40%</li>
        </ol>
        
        <p style="margin-top: 30px; text-align: center; color: #666; font-style: italic;">
          For more information, contact strategy@company.com
        </p>
      `
    },
    {
      id: 'table',
      title: 'Data Table',
      subtitle: 'Tabular information',
      description: 'Structured data in a clean, readable table format',
      icon: 'reader-outline',
      pdfTitle: 'Sales Report - January 2025',
      pdfSubtitle: 'Regional performance breakdown',
      htmlContent: `
        <h1>Monthly Sales Report</h1>
        <p>Below is a detailed breakdown of sales performance by region for January 2025.</p>
        
        <h2>Sales Performance by Region</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #2196F3; color: white;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Region</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Sales</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Target</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">% of Target</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">North America</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$1,250,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$1,000,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right; color: green; font-weight: bold;">125%</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 10px;">Europe</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$890,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$800,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right; color: green; font-weight: bold;">111%</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Asia Pacific</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$720,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$750,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right; color: orange; font-weight: bold;">96%</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 10px;">Latin America</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$340,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$400,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right; color: red; font-weight: bold;">85%</td>
            </tr>
            <tr style="background-color: #e3f2fd; font-weight: bold;">
              <td style="border: 1px solid #ddd; padding: 10px;">Total</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$3,200,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$2,950,000</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right; color: green;">108%</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Top Products</h2>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background-color: #4CAF50; color: white;">
              <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Product</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Units Sold</th>
              <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Revenue</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Premium Plan</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">1,250</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$1,875,000</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="border: 1px solid #ddd; padding: 10px;">Standard Plan</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">2,100</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$1,050,000</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">Basic Plan</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">3,500</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$275,000</td>
            </tr>
          </tbody>
        </table>
        
        <p style="margin-top: 30px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107;">
          <b>Note:</b> All figures are preliminary and subject to final accounting review.
        </p>
      `
    },
    {
      id: 'rich',
      title: 'Rich Content',
      subtitle: 'Mixed formatting styles',
      description: 'Complex document with varied formatting, quotes, and callouts',
      icon: 'clipboard-outline',
      pdfTitle: 'Product Design Guidelines',
      pdfSubtitle: 'Best practices for mobile app development',
      htmlContent: `
        <h1>Mobile App Design Guidelines</h1>
        <p style="font-size: 14px; color: #666; font-style: italic;">
          Essential principles for creating exceptional mobile experiences
        </p>
        
        <h2>Core Design Principles</h2>
        
        <div style="background-color: #e3f2fd; padding: 15px; margin: 15px 0; border-left: 4px solid #2196F3;">
          <b style="color: #1976D2;">Principle #1: Clarity</b><br/>
          Every element should serve a clear purpose. Remove anything that doesn't add value to the user experience.
        </div>
        
        <div style="background-color: #e8f5e9; padding: 15px; margin: 15px 0; border-left: 4px solid #4CAF50;">
          <b style="color: #388E3C;">Principle #2: Consistency</b><br/>
          Use consistent patterns, terminology, and visual language throughout your app.
        </div>
        
        <div style="background-color: #fff3e0; padding: 15px; margin: 15px 0; border-left: 4px solid #FF9800;">
          <b style="color: #F57C00;">Principle #3: Feedback</b><br/>
          Always provide immediate, clear feedback for user actions. Users should never wonder if their action worked.
        </div>
        
        <h2>Typography</h2>
        <p>Choose fonts that are <b>readable</b>, <i>appropriate</i>, and <u>accessible</u>:</p>
        <ul style="line-height: 1.8;">
          <li><b>Headings:</b> 18-24px, bold weight</li>
          <li><b>Body text:</b> 14-16px, regular weight</li>
          <li><b>Captions:</b> 12-14px, light weight</li>
          <li><b>Line height:</b> 1.4-1.6 for body text</li>
        </ul>
        
        <h2>Color Palette</h2>
        <p>A well-designed color palette enhances usability:</p>
        <ol style="line-height: 1.8;">
          <li><b>Primary color:</b> Main brand color, use sparingly for key actions</li>
          <li><b>Secondary color:</b> Supporting color for variety</li>
          <li><b>Accent color:</b> Highlight important elements</li>
          <li><b>Neutral colors:</b> Grays for text, backgrounds, borders</li>
          <li><b>Semantic colors:</b> Red (error), Green (success), Yellow (warning)</li>
        </ol>
        
        <h2>Spacing & Layout</h2>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 4px;">
          Use an 8-point grid system for consistent spacing. Common spacing values include: 8px, 16px, 24px, 32px, 48px.
        </p>
        
        <h2>Best Practices Checklist</h2>
        <ul style="line-height: 2.0;">
          <li>✅ Touch targets are at least 44x44 pixels</li>
          <li>✅ Text contrast ratio meets WCAG AA standards (4.5:1)</li>
          <li>✅ Important actions are easily accessible</li>
          <li>✅ Loading states are clearly communicated</li>
          <li>✅ Error messages are helpful and actionable</li>
          <li>✅ The app works in both portrait and landscape</li>
          <li>✅ Navigation is intuitive and predictable</li>
        </ul>
        
        <blockquote style="border-left: 4px solid #9E9E9E; margin: 20px 0; padding: 15px; background-color: #fafafa; font-style: italic; color: #555;">
          "Good design is as little design as possible. Less, but better – because it concentrates on the essential aspects."
          <br/><b style="font-style: normal;">— Dieter Rams</b>
        </blockquote>
        
        <h2>Resources</h2>
        <p>Continue learning with these resources:</p>
        <ul>
          <li><b>Material Design:</b> Google's design system</li>
          <li><b>Human Interface Guidelines:</b> Apple's iOS design guide</li>
          <li><b>Ionic Framework:</b> Cross-platform UI components</li>
          <li><b>Nielsen Norman Group:</b> UX research and best practices</li>
        </ul>
        
        <p style="margin-top: 30px; text-align: center; padding: 20px; background-color: #e3f2fd; border-radius: 4px;">
          <b style="color: #1976D2; font-size: 16px;">Remember:</b> Great design is invisible. Users should accomplish their goals effortlessly.
        </p>
      `
    }
  ];

  constructor(
    private pdfService: PdfService,
    private alertController: AlertController
  ) {
    addIcons({
      documentTextOutline,
      shareOutline,
      downloadOutline,
      newspaperOutline,
      readerOutline,
      clipboardOutline
    });
  }

  async exportPdf(example: ExportExample): Promise<void> {
    this.isExporting = true;
    this.currentExportId = example.id;

    try {
      await this.pdfService.generateAndSharePdf({
        filename: example.id + '_export',
        htmlContent: example.htmlContent,
        title: example.pdfTitle,
        subtitle: example.pdfSubtitle
      });

      console.log('✅ PDF exported successfully:', example.title);
      
    } catch (error) {
      console.error('❌ PDF export failed:', error);
      
      const alert = await this.alertController.create({
        header: 'Export Failed',
        message: 'Unable to generate PDF. Please try again.',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      this.isExporting = false;
      this.currentExportId = null;
    }
  }

  isCurrentlyExporting(exampleId: string): boolean {
    return this.isExporting && this.currentExportId === exampleId;
  }
}

