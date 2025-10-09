# Share Sheet Integration Component

A reusable native share sheet integration for Ionic/Capacitor apps with multiple sharing options including email and SMS/text sharing.

## Features

✅ **Native Action Sheet UI** - Uses Ionic's action sheet with clean, native styling  
✅ **HTML Content Capture** - Capture content from ViewChild elements or HTML strings  
✅ **HTML to Text Conversion** - Intelligently converts HTML to plain text while preserving structure  
✅ **Email Composer Integration** - Opens native email app with pre-filled content  
✅ **Smart Fallbacks** - Automatically falls back to Gmail/Outlook if default email app fails  
✅ **Native Share Dialog** - Uses device's native share sheet for SMS, messaging apps, etc.  
✅ **TypeScript** - Fully typed with interfaces  
✅ **Standalone Components** - Modern Angular standalone architecture  

## Demo

Run the demo page in this showcase app to see all features in action with interactive examples.

## Installation

### 1. Install Dependencies

```bash
npm install @capacitor/share@^7.0.1 @capacitor/app-launcher@^7.0.2 capacitor-email-composer@^7.0.2
```

### 2. Copy Files to Your Project

Copy the following files from this feature folder to your project:

```
src/app/your-feature/
├── services/
│   ├── sharing.service.ts
│   └── email-composer.service.ts
└── models/
    └── sharing.types.ts
```

### 3. Import Services

The services are provided at root level, so they're automatically available once imported:

```typescript
import { SharingService } from './services/sharing.service';

constructor(private sharingService: SharingService) {}
```

## Usage

### Example 1: Share Content from ViewChild

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SharingService } from './services/sharing.service';

@Component({
  template: `
    <div #contentToShare>
      <h2>My Content</h2>
      <p>This will be captured and shared.</p>
    </div>
    <ion-button (click)="share()">Share</ion-button>
  `
})
export class MyComponent {
  @ViewChild('contentToShare') contentToShare!: ElementRef<HTMLElement>;

  constructor(private sharingService: SharingService) {}

  async share() {
    await this.sharingService.shareContent({
      title: 'My Content',
      contentElement: this.contentToShare,
      recipientEmail: 'friend@example.com' // Optional
    });
  }
}
```

### Example 2: Share HTML String

```typescript
async shareReport() {
  const htmlContent = `
    <h2>Monthly Report</h2>
    <p>Here are this month's highlights:</p>
    <ul>
      <li>Sales up 20%</li>
      <li>New customers: 150</li>
      <li>Customer satisfaction: 95%</li>
    </ul>
  `;

  await this.sharingService.shareContent({
    title: 'Monthly Report',
    subject: 'Monthly Report - ' + new Date().toLocaleDateString(),
    htmlContent: htmlContent
  });
}
```

### Example 3: Simple Text Sharing

```typescript
async shareNote() {
  await this.sharingService.shareContent({
    title: 'Quick Note',
    htmlContent: '<p>Just a quick reminder about our meeting tomorrow at 2 PM.</p>',
    recipientEmail: 'team@example.com'
  });
}
```

## API Reference

### SharingService

#### `shareContent(options: SharingOptions): Promise<void>`

Main method that displays an action sheet with sharing options.

**Parameters:**

```typescript
interface SharingOptions {
  title: string;                    // Required: Title for the share
  subject?: string;                 // Optional: Email subject (defaults to title)
  contentElement?: ElementRef<HTMLElement>; // Optional: ViewChild to capture
  htmlContent?: string;             // Optional: Pre-formatted HTML
  recipientEmail?: string;          // Optional: Pre-fill email recipient
}
```

**Returns:** `Promise<void>`

**Example:**
```typescript
await sharingService.shareContent({
  title: 'My Document',
  subject: 'Sharing Document',
  htmlContent: '<h1>Document</h1><p>Content here</p>',
  recipientEmail: 'recipient@example.com'
});
```

#### `captureHtmlContent(element: ElementRef<HTMLElement>): string`

Utility method to manually capture HTML from an element.

**Example:**
```typescript
const html = this.sharingService.captureHtmlContent(this.myElement);
```

#### `testHtmlToTextConversion(html: string): string`

Debug method to test HTML to text conversion.

**Example:**
```typescript
const text = this.sharingService.testHtmlToTextConversion('<h1>Test</h1>');
console.log(text); // "TEST"
```

### EmailComposerService

Usually used internally by SharingService, but can be used directly if needed.

#### `canSend(): Promise<boolean>`

Check if the device can send emails.

#### `open(draft: EmailDraft): Promise<void>`

Open email composer with draft content.

#### `tryAlternativeMailApps(draft: EmailDraft): Promise<boolean>`

Try to open Gmail or Outlook as fallback.

## How It Works

### 1. Action Sheet Display

When you call `shareContent()`, an Ionic action sheet appears with options:
- **Email as Text** - Opens email composer with HTML formatting
- **Text/SMS** - Opens native share dialog for SMS, messaging apps, etc.
- **Cancel** - Closes the action sheet

### 2. Email Sharing Flow

1. Captures or formats HTML content
2. Checks if email is available on device
3. Opens native email composer
4. Falls back to Gmail/Outlook if needed
5. Final fallback to generic share dialog

### 3. Text Sharing Flow

1. Converts HTML to plain text
2. Preserves structure (headers, lists, paragraphs)
3. Opens native share dialog
4. User chooses app (Messages, WhatsApp, etc.)

## HTML to Text Conversion

The service intelligently converts HTML to plain text:

**Input HTML:**
```html
<h2>Meeting Notes</h2>
<p>Discussion points:</p>
<ul>
  <li>Budget review</li>
  <li>Timeline update</li>
</ul>
```

**Output Text:**
```
MEETING NOTES

Discussion points:

• Budget review
• Reminder update
```

### Conversion Rules

- Headers (`<h1>` - `<h6>`) → ALL CAPS with line breaks
- Paragraphs (`<p>`) → Separated by double line breaks
- Lists (`<li>`) → Bulleted with `•`
- Line breaks (`<br>`) → Preserved as `\n`
- All HTML tags → Stripped
- HTML entities → Decoded (e.g., `&nbsp;` → space)

## Customization

### Custom Email Body

To customize the email body format, modify `createHtmlEmailBody()` in `sharing.service.ts`:

```typescript
private createHtmlEmailBody(content: ShareContent): string {
  let html = '<div style="font-family: Arial, sans-serif;">';
  
  // Add your custom header
  html += '<div style="background: #f0f0f0; padding: 20px;">';
  html += '<h1>My Company</h1>';
  html += '</div>';
  
  // Add content
  html += content.htmlContent;
  
  // Add your custom footer
  html += '<hr>';
  html += '<p style="color: #888;">Sent from My App</p>';
  html += '</div>';
  
  return html;
}
```

### Custom Action Sheet Buttons

To add more sharing options, modify the action sheet creation in `shareContent()`:

```typescript
const actionSheet = await this.actionSheetCtrl.create({
  header: 'Share Content',
  buttons: [
    {
      text: 'Email as Text',
      icon: 'mail-outline',
      handler: () => this.shareAsEmailText(shareContent)
    },
    {
      text: 'Save as PDF', // New option
      icon: 'document-outline',
      handler: () => this.shareAsPdf(shareContent)
    },
    {
      text: 'Text/SMS',
      icon: 'chatbubble-outline',
      handler: () => this.shareAsText(shareContent)
    },
    {
      text: 'Cancel',
      icon: 'close-outline',
      role: 'cancel'
    }
  ]
});
```

## Platform Support

| Platform | Email as Text | Text/SMS | Notes |
|----------|--------------|----------|-------|
| iOS      | ✅           | ✅       | Full support |
| Android  | ✅           | ✅       | Full support |
| Web      | ⚠️           | ⚠️       | Limited - uses Web Share API if available |

## Troubleshooting

### Email composer doesn't open

**Problem:** Email composer fails to open even though device has email configured.

**Solution:** The service automatically falls back to Gmail/Outlook. If those aren't available, it uses the generic share dialog.

### HTML formatting lost in email

**Problem:** Email appears as plain text instead of formatted HTML.

**Solution:** Make sure you're using the "Email as Text" option (not "Text/SMS"). The Text/SMS option intentionally strips HTML.

### ViewChild content not captured

**Problem:** Empty content when sharing from ViewChild.

**Solution:** 
1. Ensure the ViewChild has `static: false` (or don't set it)
2. Make sure the element has rendered before calling share
3. Check that the element reference is not undefined

```typescript
// Correct
@ViewChild('content', { static: false }) content!: ElementRef;

// In method
async share() {
  if (!this.content) {
    console.error('Content element not found!');
    return;
  }
  await this.sharingService.shareContent({
    title: 'My Content',
    contentElement: this.content
  });
}
```

## Dependencies

- `@capacitor/share` - Native sharing functionality
- `@capacitor/app-launcher` - Launch Gmail/Outlook apps
- `capacitor-email-composer` - Native email composer
- `@ionic/angular` - Ionic components and services
- `@angular/core` - Angular framework

## Browser Compatibility

When running in a browser (not native), the service uses:
- Web Share API (if available)
- `mailto:` links as fallback
- Warning: HTML formatting may not be preserved in browser

## Best Practices

1. **Always provide a title** - Required for all share methods
2. **Use ViewChild for dynamic content** - Captures exactly what's displayed
3. **Use HTML strings for static content** - More performant
4. **Test on real devices** - Email behavior varies by device/OS
5. **Provide fallback text** - In case HTML can't be rendered

## Security Considerations

- ✅ No data is stored or transmitted by this service
- ✅ Uses native APIs only - no third-party servers
- ✅ User controls all sharing actions
- ⚠️ Email addresses are handled by device's native apps
- ⚠️ Validate recipient emails before passing to service

## License

This component is extracted from production mobile apps and provided as-is for educational and development purposes. Feel free to use, modify, and distribute in your projects.

## Credits

Created by extracting and refactoring production code from various Ionic/Capacitor mobile applications. Designed to be framework-agnostic and easily integrated into any Ionic/Angular project.

## Contributing

This is a showcase component. If you find bugs or have suggestions:
1. Test thoroughly in your own app
2. Document the issue with examples
3. Submit feedback through the showcase app repository

## Support

For issues specific to:
- **Capacitor plugins**: Check Capacitor documentation
- **Email composer**: Check capacitor-email-composer docs
- **This component**: Review this README and demo page

---

**Version:** 1.0.0  
**Last Updated:** 2025-01-09  
**Angular Version:** 20.x  
**Ionic Version:** 8.x  
**Capacitor Version:** 7.x

