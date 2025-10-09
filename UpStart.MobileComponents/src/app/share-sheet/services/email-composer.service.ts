import { Injectable } from '@angular/core';
import { EmailComposer } from 'capacitor-email-composer';
import { AppLauncher } from '@capacitor/app-launcher';

export interface EmailDraft {
  to?: string[];
  cc?: string[];
  bcc?: string[];
  subject?: string;
  htmlBody?: string;
  textBody?: string;
  attachments?: { type: 'absolute' | 'resource' | 'asset' | 'base64'; path: string; name?: string }[];
}

@Injectable({ providedIn: 'root' })
export class EmailComposerService {
  async canSend(): Promise<boolean> {
    try {
      console.log('🔍 EmailComposerService: Checking if email can be sent...');
      console.log('🔍 EmailComposerService: About to call EmailComposer.hasAccount()...');
      
      const result = await EmailComposer.hasAccount();
      console.log('🔍 EmailComposerService: Raw hasAccount result:', result);
      
      const { hasAccount } = result;
      console.log('🔍 EmailComposerService: Destructured hasAccount:', hasAccount);
      console.log('🔍 EmailComposerService: hasAccount type:', typeof hasAccount);
      
      return hasAccount;
    } catch (error) {
      console.error('❌ EmailComposerService: Error checking hasAccount:', error);
      if (error instanceof Error) {
        console.error('❌ EmailComposerService: Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      return false;
    }
  }

  async open(draft: EmailDraft) {
    console.log('🔍 EmailComposerService: Opening email composer with draft:', {
      to: draft.to,
      subject: draft.subject,
      bodyLength: (draft.htmlBody || draft.textBody || '').length,
      isHtml: !!draft.htmlBody,
      attachmentsCount: draft.attachments?.length || 0
    });
    
    try {
      console.log('🔍 EmailComposerService: About to call EmailComposer.open()...');
      
      await EmailComposer.open({
        to: draft.to,
        cc: draft.cc,
        bcc: draft.bcc,
        subject: draft.subject ?? '',
        body: draft.htmlBody || draft.textBody || '',
        isHtml: !!draft.htmlBody,
        attachments: draft.attachments
      });
      
      console.log('🔍 EmailComposerService: Email composer opened successfully');
    } catch (error) {
      console.error('❌ EmailComposerService: Error opening email composer:', error);
      if (error instanceof Error) {
        console.error('❌ EmailComposerService: Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      throw error; // Re-throw so the calling method can handle it
    }
  }

  /**
   * Test method to force open email composer regardless of hasAccount result
   */
  async forceOpen(draft: EmailDraft): Promise<void> {
    console.log('🔍 EmailComposerService: FORCE opening email composer...');
    
    try {
      await EmailComposer.open({
        to: draft.to,
        cc: draft.cc,
        bcc: draft.bcc,
        subject: draft.subject ?? '',
        body: draft.htmlBody || draft.textBody || '',
        isHtml: !!draft.htmlBody,
        attachments: draft.attachments
      });
      
      console.log('🔍 EmailComposerService: FORCE open successful!');
    } catch (error) {
      console.error('❌ EmailComposerService: FORCE open failed:', error);
      throw error;
    }
  }

  /**
   * Try to open Gmail or Outlook as fallbacks
   */
  async tryAlternativeMailApps(draft: EmailDraft): Promise<boolean> {
    console.log('🔍 EmailComposerService: Trying alternative mail apps...');
    
    // Convert HTML to plain text for deep links
    const plainTextBody = this.htmlToPlainText(draft.htmlBody || draft.textBody || '');
    const to = encodeURIComponent(draft.to?.[0] || '');
    const subject = encodeURIComponent(draft.subject || '');
    const body = encodeURIComponent(plainTextBody);

    try {
      // Try Gmail first
      const { value: hasGmail } = await AppLauncher.canOpenUrl({ url: 'googlegmail://' });
      if (hasGmail) {
        console.log('🔍 EmailComposerService: Gmail available, opening...');
        const gmailUrl = `googlegmail:///co?to=${to}&subject=${subject}&body=${body}`;
        await AppLauncher.openUrl({ url: gmailUrl });
        return true;
      }

      // Try Outlook
      const { value: hasOutlook } = await AppLauncher.canOpenUrl({ url: 'ms-outlook://' });
      if (hasOutlook) {
        console.log('🔍 EmailComposerService: Outlook available, opening...');
        const outlookUrl = `ms-outlook://compose?to=${to}&subject=${subject}&body=${body}`;
        await AppLauncher.openUrl({ url: outlookUrl });
        return true;
      }

      console.log('🔍 EmailComposerService: No alternative mail apps available');
      return false;
    } catch (error) {
      console.error('❌ EmailComposerService: Error trying alternative mail apps:', error);
      return false;
    }
  }

  /**
   * Convert HTML to plain text for deep link fallbacks
   */
  private htmlToPlainText(html: string): string {
    if (!html) return '';
    
    return html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<li>/gi, '• ')
      .replace(/<\/li>/gi, '\n')
      .replace(/<[^>]*>/g, '') // Remove all other HTML tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }
}

