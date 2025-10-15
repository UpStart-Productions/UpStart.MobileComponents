# PDF Export System

A comprehensive PDF generation and sharing system for Ionic/Angular applications using Capacitor. Generate professional PDF documents from HTML content and share them via the native platform share sheet.

## Features

- ✅ **HTML to PDF Conversion** - Convert rich HTML content to professional PDFs
- ✅ **Professional Formatting** - Custom headers, footers, styles, and page numbering
- ✅ **Native Sharing** - Share PDFs via email, messaging apps, cloud storage, etc.
- ✅ **On-Device Processing** - All PDF generation happens locally for complete privacy
- ✅ **Auto Cleanup** - Temporary files are automatically cleaned up after sharing
- ✅ **Cross-Platform** - Works on iOS and Android with proper font handling

## Dependencies

```bash
npm install pdfmake html-to-pdfmake @capacitor/filesystem @capacitor/share @capacitor/file-viewer
```

After installing, sync Capacitor:

```bash
npx cap sync
```

## File Structure

```
src/app/pdf-export/
├── services/
│   └── pdf.service.ts              # Core PDF generation service
├── pdf-export-demo.page.ts         # Demo page component
├── pdf-export-demo.page.html       # Demo page template
├── pdf-export-demo.page.scss       # Demo page styles
└── README.md                        # This file
```

## Usage

### Basic PDF Generation

```typescript
import { PdfService } from './pdf-export/services/pdf.service';

export class YourComponent {
  constructor(private pdfService: PdfService) {}

  async generatePdf() {
    await this.pdfService.generateAndSharePdf({
      filename: 'my_document',
      htmlContent: '<h1>Hello</h1><p>This is a PDF!</p>',
      title: 'My Document',
      subtitle: 'Generated from HTML'
    });
  }
}
```

### Styled HTML Example

```typescript
const styledHtml = `
  <h1 style="color: #2196F3;">Company Report</h1>
  
  <h2 style="border-bottom: 2px solid #2196F3; padding-bottom: 5px;">
    Executive Summary
  </h2>
  
  <p style="line-height: 1.6; margin-bottom: 15px;">
    This report contains important information with proper formatting.
  </p>
  
  <table style="width: 100%; border-collapse: collapse;">
    <tr style="background-color: #f5f5f5;">
      <th style="border: 1px solid #ddd; padding: 8px;">Metric</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Value</th>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Revenue</td>
      <td style="border: 1px solid #ddd; padding: 8px;">$1,000,000</td>
    </tr>
  </table>
`;

await this.pdfService.generateAndSharePdf({
  filename: 'styled_report',
  htmlContent: styledHtml,
  title: 'Styled Report',
  subtitle: 'Q4 2024'
});
```

### Table-Based Content

```typescript
const tableContent = `
  <h1>Sales Report</h1>
  
  <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
    <thead>
      <tr style="background-color: #2196F3; color: white;">
        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Region</th>
        <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Sales</th>
        <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">% of Target</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #ddd; padding: 10px;">North America</td>
        <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">$1,250,000</td>
        <td style="border: 1px solid #ddd; padding: 10px; text-align: right; color: green;">125%</td>
      </tr>
    </tbody>
  </table>
`;
```

## API Reference

### PdfService

#### `generateAndSharePdf(options: PdfGenerationOptions): Promise<void>`

Main method to generate a PDF and automatically open the share dialog.

**Parameters:**
```typescript
interface PdfGenerationOptions {
  filename: string;        // Base filename (without .pdf extension)
  htmlContent: string;     // HTML content to convert
  title?: string;          // Optional title for PDF document
  subtitle?: string;       // Optional subtitle
}
```

**Example:**
```typescript
await this.pdfService.generateAndSharePdf({
  filename: 'report_2025',
  htmlContent: '<h1>Report</h1><p>Content...</p>',
  title: 'Annual Report 2025',
  subtitle: 'Company Performance'
});
```

#### `cleanup(): Promise<void>`

Manually trigger cleanup of temporary PDF files.

```typescript
await this.pdfService.cleanup();
```

## HTML Content Guidelines

### Supported Elements

- **Headings**: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`
- **Text Formatting**: `<b>`, `<i>`, `<u>`, `<strong>`, `<em>`
- **Lists**: `<ul>`, `<ol>`, `<li>`
- **Paragraphs**: `<p>` with proper spacing
- **Tables**: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<td>`, `<th>`
- **Divs**: `<div>` with CSS styling
- **Quotes**: `<blockquote>`

### CSS Support

The module supports inline CSS styles for:

- **Colors**: `color`, `background-color`
- **Fonts**: `font-size`, `font-weight`, `font-style`
- **Spacing**: `margin`, `padding`
- **Borders**: `border`, `border-bottom`, `border-left`, etc.
- **Text**: `text-align`, `line-height`
- **Display**: `display: block`, `display: inline-block`

### Best Practices

1. **Use Inline Styles**: External CSS is not supported
2. **Simple Layouts**: Complex CSS layouts may not render correctly
3. **Test Content**: Always test HTML content in the PDF viewer
4. **Font Sizes**: Use reasonable sizes (10-24px range)
5. **Colors**: Use hex colors (#333, #2196F3, etc.)
6. **Tables**: Use border-collapse and proper padding
7. **Contrast**: Ensure good text/background contrast

### Example: Rich Content

```typescript
const richContent = `
  <h1>Product Guidelines</h1>
  
  <div style="background-color: #e3f2fd; padding: 15px; margin: 15px 0; border-left: 4px solid #2196F3;">
    <b style="color: #1976D2;">Principle #1: Clarity</b><br/>
    Every element should serve a clear purpose.
  </div>
  
  <h2>Typography</h2>
  <ul style="line-height: 1.8;">
    <li><b>Headings:</b> 18-24px, bold weight</li>
    <li><b>Body text:</b> 14-16px, regular weight</li>
    <li><b>Captions:</b> 12-14px, light weight</li>
  </ul>
  
  <blockquote style="border-left: 4px solid #9E9E9E; margin: 20px 0; padding: 15px; background-color: #fafafa; font-style: italic;">
    "Good design is as little design as possible."
    <br/><b style="font-style: normal;">— Dieter Rams</b>
  </blockquote>
`;
```

## Error Handling

### Common Issues

#### Permission Errors (iOS)
```
ERROR: "Caches" couldn't be removed because you don't have permission
```
**Solution**: The service includes robust error handling for iOS permission issues. Cleanup failures are handled silently and won't affect PDF generation.

#### PDF Generation Errors
```typescript
try {
  await this.pdfService.generateAndSharePdf({
    filename: 'test',
    htmlContent: this.getContent(),
    title: 'Test PDF'
  });
} catch (error) {
  console.error('PDF generation failed:', error);
  
  // Show user-friendly error
  const alert = await this.alertController.create({
    header: 'Export Failed',
    message: 'Unable to generate PDF. Please try again.',
    buttons: ['OK']
  });
  await alert.present();
}
```

## Performance Considerations

### File Size
- PDFs are stored temporarily in the cache directory
- Files are automatically cleaned up after sharing
- Large HTML content may take longer to process

### Memory Management
- All processing happens on-device
- Complex layouts consume more memory
- Test on target devices for performance

### Optimization Tips
1. Keep HTML content focused and concise
2. Optimize images before including them
3. Use simple table structures
4. Avoid excessive inline styles
5. Test with realistic data volumes

## Platform-Specific Notes

### iOS
- PDFs are saved to the Cache directory
- Share sheet provides options for Mail, Messages, Files app, etc.
- Automatic cleanup may fail due to sandbox restrictions (handled gracefully)

### Android
- Share functionality uses Android's native sharing
- PDF viewer depends on installed PDF apps
- May require runtime permissions for file access

## Integration Examples

### With Rich Text Editor

```typescript
async exportEditorContent() {
  const editorContent = this.quillEditor.root.innerHTML;
  
  await this.pdfService.generateAndSharePdf({
    filename: 'editor_export',
    htmlContent: editorContent,
    title: 'My Document',
    subtitle: new Date().toLocaleDateString()
  });
}
```

### With Form Data

```typescript
async exportFormAsPdf() {
  const formData = this.form.value;
  
  const htmlContent = `
    <h1>Form Submission</h1>
    <p><b>Name:</b> ${formData.name}</p>
    <p><b>Email:</b> ${formData.email}</p>
    <p><b>Message:</b></p>
    <p>${formData.message}</p>
  `;
  
  await this.pdfService.generateAndSharePdf({
    filename: 'form_submission',
    htmlContent: htmlContent,
    title: 'Form Submission',
    subtitle: new Date().toLocaleString()
  });
}
```

### With Database Content

```typescript
async exportDatabaseRecords() {
  const records = await this.database.getAllRecords();
  
  const htmlContent = `
    <h1>Database Export</h1>
    <p>Exported on: ${new Date().toLocaleDateString()}</p>
    
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f5f5f5;">
          <th style="border: 1px solid #ddd; padding: 8px;">ID</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Name</th>
          <th style="border: 1px solid #ddd; padding: 8px;">Date</th>
        </tr>
      </thead>
      <tbody>
        ${records.map(r => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${r.id}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${r.name}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${r.date}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  
  await this.pdfService.generateAndSharePdf({
    filename: 'database_export',
    htmlContent: htmlContent,
    title: 'Database Records',
    subtitle: `${records.length} records`
  });
}
```

## Demo Examples

The demo page includes 4 example PDFs:

1. **Simple Document** - Basic text with headers and lists
2. **Styled Report** - Professional formatting with colors and sections
3. **Data Table** - Structured tabular data with styling
4. **Rich Content** - Complex document with varied formatting, quotes, and callouts

Each example can be generated and shared directly from the demo page.

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Clear cache: `rm -rf node_modules package-lock.json && npm install`
2. Reinstall dependencies: `npm install`
3. Sync Capacitor: `npx cap sync`

### Runtime Issues

1. Check console logs for specific error messages
2. Verify HTML content is valid and uses supported CSS
3. Test with simple HTML first, then add complexity
4. Ensure PdfService is properly injected in your component

## Version History

- **v1.0**: Initial implementation with core functionality
- **v1.1**: Added subtitle support and improved styling options
- **v1.2**: Enhanced error handling and cleanup reliability
- **v1.3**: Improved cross-platform compatibility

## License

This component is part of the UpStart MobileComponents library.

## Support

For issues or questions:
1. Check the console logs for specific error messages
2. Verify all dependencies are installed correctly
3. Test with the provided example HTML content
4. Ensure proper service injection in your components

