import { Injectable } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import type { TDocumentDefinitions, PageSize, Content, StyleDictionary } from 'pdfmake/interfaces';

// Static imports to ensure pdfMake is always available
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

export interface PdfGenerationOptions {
  filename: string;
  htmlContent: string;
  title?: string;
  subtitle?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private currentPdfPath: string | null = null;
  private pdfMake = pdfMake;
  private htmlToPdfmake = htmlToPdfmake;

  constructor() {
    // Set up the virtual file system for pdfmake with default fonts
    const vfs = (pdfFonts as any).pdfMake ? (pdfFonts as any).pdfMake.vfs : pdfFonts;
    
    // Create a local copy of pdfMake with the VFS configured
    this.pdfMake = {
      ...pdfMake,
      vfs
    };
    this.htmlToPdfmake = htmlToPdfmake;
  }

  async generateAndSharePdf(options: PdfGenerationOptions): Promise<void> {
    try {
      console.log('📄 PdfService: Starting PDF generation...');
      
      await this.cleanupPreviousPdf();

      const pdfDoc = await this.createPdfFromHtml(
        options.htmlContent, 
        options.title,
        options.subtitle
      );
      
      const savedPath = await this.savePdfToDevice(pdfDoc, options.filename);
      this.currentPdfPath = savedPath;

      console.log('📄 PdfService: PDF generated and saved');
      
      // Automatically share the PDF
      await this.sharePdf(savedPath, `${options.filename}.pdf`);

    } catch (error) {
      console.error('📄 PdfService: Error generating PDF:', error);
      throw new Error('Failed to generate PDF. Please try again.');
    }
  }

  async createPdfFromHtml(htmlContent: string, title?: string, subtitle?: string): Promise<any> {
    console.log('📄 PdfService: Converting HTML to PDF...');
    
    // Replace h3 tags with same-size bold elements for PDF generation
    let modifiedHtml = htmlContent
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '<b style="font-size: 12px; display: block; margin: 4px 0;">$1</b>')
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '<b style="font-size: 18px; display: block; margin: 8px 0;">$1</b>')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '<b style="font-size: 14px; display: block; margin: 6px 0;">$1</b>');
    
    const pdfContent = this.htmlToPdfmake(modifiedHtml);
  
    const docDefinition: TDocumentDefinitions = {
      content: [
        ...(title ? [{ 
          text: title, 
          style: 'header', 
          margin: [0, 0, 0, 10] as [number, number, number, number] 
        }] : []),
        ...(subtitle ? [{ 
          text: subtitle, 
          style: 'subheader', 
          margin: [0, 0, 0, 20] as [number, number, number, number] 
        }] : []),
        ...pdfContent
      ],
      footer: this.buildFooter(),
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          color: '#2196F3'
        },
        subheader: {
          fontSize: 14,
          alignment: 'center',
          color: '#666',
          italics: true
        },
        h1: {
          fontSize: 18,
          bold: true,
          margin: [0, 12, 0, 8] as [number, number, number, number]
        },
        h2: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 6] as [number, number, number, number]
        },
        h3: {
          fontSize: 12,
          bold: true,
          margin: [0, 8, 0, 4] as [number, number, number, number]
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: '#333',
          fillColor: '#f5f5f5'
        },
        footnote: { 
          color: '#777', 
          fontSize: 9, 
          lineHeight: 1.0 
        }
      },
      defaultStyle: {
        fontSize: 11,
        lineHeight: 1.4
      },
      info: {
        title: title || 'Generated Document',
        author: 'UpStart MobileComponents',
        subject: 'Generated PDF Document',
        creator: 'UpStart MobileComponents Demo',
        producer: 'pdfmake'
      },
      pageSize: 'A4' as PageSize,
      pageMargins: [40, 60, 40, 60] as [number, number, number, number]
    };
  
    return this.pdfMake.createPdf(docDefinition);
  }

  async savePdfToDevice(pdfDoc: any, filename: string): Promise<string> {
    console.log('📄 PdfService: Saving PDF to device...');
    
    return new Promise<string>((resolve, reject) => {
      pdfDoc.getBase64((base64Data: string) => {
        const safeFilename = this.generateSafeFilename(filename);
        Filesystem.writeFile({
          path: safeFilename,
          data: base64Data,
          directory: Directory.Cache
        }).then((result) => {
          console.log('📄 PdfService: PDF saved to:', result.uri);
          resolve(result.uri);
        }).catch((error) => {
          console.error('📄 PdfService: Error saving PDF:', error);
          reject(new Error('Failed to save PDF to device'));
        });
      });
    });
  }

  private generateSafeFilename(filename: string): string {
    const safe = filename.replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    return `${safe}_${timestamp}.pdf`;
  }

  async sharePdf(pdfPath?: string, filename?: string): Promise<void> {
    const pathToShare = pdfPath || this.currentPdfPath;
    if (!pathToShare) {
      throw new Error('No PDF file available to share');
    }

    console.log('📄 PdfService: Sharing PDF...');

    await Share.share({
      title: 'Share PDF Document',
      text: filename || 'Document',
      url: pathToShare,
      dialogTitle: 'Share PDF'
    });

    // Cleanup after sharing
    try {
      await this.cleanupPreviousPdf();
    } catch (_) {
      // Ignore cleanup errors
    }
  }

  private async cleanupPreviousPdf(): Promise<void> {
    if (this.currentPdfPath) {
      try {
        const pathParts = this.currentPdfPath.split('/');
        const filename = pathParts[pathParts.length - 1];

        const fileExists = await Filesystem.stat({
          path: filename,
          directory: Directory.Cache
        }).then(() => true).catch(() => false);

        if (fileExists) {
          await Filesystem.deleteFile({
            path: filename,
            directory: Directory.Cache
          });
          console.log('📄 PdfService: Cleaned up previous PDF');
        }

      } catch (error: any) {
        // Silently handle cleanup errors (iOS permission issues, etc.)
        if (error.code !== 'OS-PLUG-FILE-0013' &&
            !error.message?.includes('permission') &&
            !error.message?.includes('denied')) {
          console.log('📄 PdfService: Cleanup error (non-critical):', error.message || error);
        }
      }

      this.currentPdfPath = null;
    }
  }

  async cleanup(): Promise<void> {
    await this.cleanupPreviousPdf();
  }

  // Build footer with page numbers
  private buildFooter(): any {
    return (currentPage: number, pageCount: number) => {
      return {
        margin: [40, 10, 40, 10],
        columns: [
          {
            width: '*',
            text: 'Generated by UpStart MobileComponents',
            style: 'footnote'
          },
          { 
            text: `Page ${currentPage} of ${pageCount}`, 
            alignment: 'right', 
            fontSize: 9,
            color: '#777',
            width: 'auto'
          }
        ]
      };
    };
  }
}

