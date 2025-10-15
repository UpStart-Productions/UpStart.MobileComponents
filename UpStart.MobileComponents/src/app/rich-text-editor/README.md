# Rich Text Editor with Floating Toolbar

A sophisticated rich text editing system combining **Quill editor** with a **mobile-optimized floating toolbar**. The toolbar appears above the keyboard, providing intuitive access to formatting tools without obstructing content. Features real-time format state tracking, smooth animations, and seamless keyboard integration.

## Features

- ✍️ **Quill Editor**: Industry-standard rich text editor
- ⌨️ **Floating Toolbar**: Appears above keyboard on mobile
- 🎨 **Format Buttons**: Bold, Italic, Underline, Headers, Lists, Links
- 💫 **Format Modes**: Click without selection to format new text
- 📱 **Real-time State**: Buttons highlight based on current formatting
- 🌐 **Global Integration**: One toolbar serves all editors in the app
- 🎯 **Service Architecture**: Centralized state management
- 🌙 **Dark Mode**: Automatic theme adaptation
- 📲 **Cross-platform**: Works on iOS, Android, and web

## Architecture

This system consists of three main parts:

### 1. QuillToolbarService
Central service managing:
- Active editor registration
- Toolbar state (visibility, formatting, keyboard height)
- Keyboard detection (native and web)
- Format execution and state tracking

### 2. QuillFloatingToolbarComponent
Global toolbar component featuring:
- Floating above keyboard
- Format buttons (B, I, U, H1, bullets, links)
- Real-time active state
- Clear and close keyboard actions

### 3. QuillEditorComponent
Wrapper around ngx-quill providing:
- Simplified configuration
- ngModel support (two-way binding)
- Automatic toolbar registration
- Event emissions for lifecycle hooks

## Installation

### 1. Install Dependencies

```bash
npm install ngx-quill quill
npm install @capacitor/keyboard  # For native keyboard detection
npm install moment  # If using date features
```

### 2. Copy Component Files

```bash
# Service
cp services/quill-toolbar.service.ts your-app/src/app/services/

# Components
cp components/quill-editor.component.* your-app/src/app/components/
cp components/quill-floating-toolbar.component.* your-app/src/app/components/
```

### 3. Add Global Styles

Add to your `global.scss`:

```scss
@import 'quill/dist/quill.snow.css';

.ql-editor {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 16px !important;
  line-height: 1.5 !important;
  color: var(--ion-text-color) !important;
}

.ql-toolbar {
  display: none !important;  // Hide default toolbar
}
```

### 4. Global Integration

Add the floating toolbar to your `app.component.html`:

```html
<ion-app>
  <ion-router-outlet></ion-router-outlet>
  
  <!-- Global floating toolbar -->
  <app-quill-floating-toolbar></app-quill-floating-toolbar>
</ion-app>
```

```typescript
// app.component.ts
import { QuillFloatingToolbarComponent } from './components/quill-floating-toolbar.component';

@Component({
  imports: [IonApp, IonRouterOutlet, QuillFloatingToolbarComponent]
})
```

## Basic Usage

```html
<app-quill-editor
  [(ngModel)]="content"
  [config]="{placeholder: 'Start writing...', height: '300px'}"
  (editorCreated)="onEditorCreated($event)"
  (contentChanged)="onContentChanged($event)">
</app-quill-editor>
```

```typescript
export class MyPage {
  content: string = '<p>Initial content</p>';

  onEditorCreated(editor: any) {
    console.log('Editor ready:', editor);
  }

  onContentChanged(event: any) {
    console.log('Content changed:', event.text);
    // event contains: html, text, delta, source
  }
}
```

## API Reference

### QuillEditorComponent

#### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `config` | `QuillEditorConfig` | See below | Editor configuration |

#### QuillEditorConfig

```typescript
interface QuillEditorConfig {
  placeholder?: string;     // Placeholder text
  height?: string;          // Editor height (CSS value)
  readOnly?: boolean;       // Read-only mode
}
```

#### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `editorCreated` | `any` | Emitted when Quill editor is initialized |
| `contentChanged` | `{html, text, delta, source}` | Emitted when content changes |

#### NgModel Support

The component implements `ControlValueAccessor` for two-way binding:

```html
<app-quill-editor [(ngModel)]="myContent"></app-quill-editor>
```

### QuillToolbarService

#### Methods

| Method | Description |
|--------|-------------|
| `registerQuillEditor(editor)` | Register an editor with the toolbar |
| `unregisterQuillEditor()` | Unregister the current editor |
| `executeFormat(format, value)` | Execute a formatting command |
| `toggleFormatMode(format)` | Toggle format mode for new text |
| `resetFormatModes()` | Clear all format modes |
| `updateFormatState()` | Update toolbar state from editor |
| `setToolbarVisibility(boolean)` | Manually show/hide toolbar |

#### Observables

| Observable | Type | Description |
|------------|------|-------------|
| `activeQuillEditor` | `Observable<any>` | Currently active editor |
| `toolbarState` | `Observable<QuillToolbarState>` | Toolbar state |

#### QuillToolbarState Interface

```typescript
interface QuillToolbarState {
  isVisible: boolean;        // Toolbar visibility
  keyboardHeight: number;    // Keyboard height in pixels
  isBold: boolean;          // Current selection is bold
  isItalic: boolean;        // Current selection is italic
  isUnderline: boolean;     // Current selection is underlined
  isBulletList: boolean;    // Current selection in bullet list
  isOrderedList: boolean;   // Current selection in ordered list
  isHeader1: boolean;       // Current selection is H1
  boldMode: boolean;        // Bold mode enabled for new text
  italicMode: boolean;      // Italic mode enabled for new text
  underlineMode: boolean;   // Underline mode enabled for new text
  bulletMode: boolean;      // Bullet list mode enabled
  orderedMode: boolean;     // Ordered list mode enabled
  header1Mode: boolean;     // Header mode enabled
}
```

## Usage Examples

### Example 1: Simple Note Editor

```html
<app-quill-editor
  [(ngModel)]="note"
  [config]="{placeholder: 'Type your note...', height: '200px'}">
</app-quill-editor>
```

```typescript
export class NotesPage {
  note: string = '';
}
```

### Example 2: Journal Entry

```html
<app-quill-editor
  [(ngModel)]="journalEntry"
  [config]="{
    placeholder: 'Write your thoughts...',
    height: '400px'
  }"
  (contentChanged)="onJournalChanged($event)">
</app-quill-editor>
```

```typescript
export class JournalPage {
  journalEntry: string = '<h1>Today\'s Entry</h1><p>Start writing...</p>';

  onJournalChanged(event: any) {
    // Auto-save logic
    this.saveJournal(event.html);
  }
}
```

### Example 3: Pre-populated Content

```html
<app-quill-editor
  [(ngModel)]="article"
  [config]="{height: '500px'}">
</app-quill-editor>
```

```typescript
export class ArticlePage implements OnInit {
  article: string = '';

  ngOnInit() {
    // Load existing content
    this.article = `
      <h1>Article Title</h1>
      <p>This is a <strong>pre-populated</strong> article with <em>formatting</em>.</p>
      <ul>
        <li>Point one</li>
        <li>Point two</li>
      </ul>
    `;
  }
}
```

### Example 4: Read-only Display

```html
<app-quill-editor
  [(ngModel)]="displayContent"
  [config]="{readOnly: true, height: '300px'}">
</app-quill-editor>
```

```typescript
export class DisplayPage {
  displayContent: string = '<p>This content is read-only.</p>';
}
```

### Example 5: Multiple Editors

```html
<app-quill-editor
  [(ngModel)]="title"
  [config]="{placeholder: 'Title...', height: '100px'}">
</app-quill-editor>

<app-quill-editor
  [(ngModel)]="body"
  [config]="{placeholder: 'Body...', height: '300px'}">
</app-quill-editor>
```

**Note:** Only the focused editor's toolbar will be active!

## Floating Toolbar Features

### Format Buttons

| Button | Function | Keyboard Shortcut |
|--------|----------|-------------------|
| **H1** | Heading 1 | - |
| **B** | Bold text | Ctrl/⌘ + B |
| **I** | Italic text | Ctrl/⌘ + I |
| **U** | Underline text | Ctrl/⌘ + U |
| 🔘 | Bullet list | - |
| 🔢 | Ordered list | - |
| 🔗 | Insert/edit link | - |
| 🗑️ | Clear content | - |
| 🔽 | Close keyboard | - |

### Format Modes

**What are format modes?**
- Click a format button **with no text selected** to enable "format mode"
- All new text you type will have that formatting applied
- Click again to disable the format mode
- Great for typing formatted text from scratch!

**Example:**
1. Click **B** (no selection) → Bold mode enabled
2. Type "Hello" → Text appears bold
3. Click **B** again → Bold mode disabled
4. Type "World" → Text appears normal

### How It Works

1. **Tap any editor** → Keyboard opens → Toolbar slides up
2. **Select text** → Tap format button → Format applied
3. **No selection** → Tap format button → Format mode enabled
4. **Tap close** → Keyboard closes → Toolbar slides down

## Styling Customization

### Editor Styles

Override in your component SCSS:

```scss
app-quill-editor {
  ::ng-deep .ql-editor {
    font-size: 18px;
    padding: 20px;
    min-height: 400px;
    
    h1 {
      color: var(--ion-color-primary);
    }
    
    p {
      margin: 1rem 0;
    }
  }
}
```

### Toolbar Styles

The toolbar uses CSS variables for customization:

```scss
.quill-floating-toolbar {
  --toolbar-background: var(--ion-background-color);
  --toolbar-border: var(--ion-color-light-shade);
  --button-active-bg: rgba(var(--ion-color-primary-rgb), 0.1);
  --button-active-color: var(--ion-color-primary);
}
```

## Keyboard Detection

### Native Platforms (iOS/Android)

Uses `@capacitor/keyboard` plugin:
- Automatic keyboard height detection
- Precise positioning above keyboard
- Smooth show/hide animations

### Web Platform

Falls back to window resize detection:
- Estimates keyboard presence
- Works in browsers and PWAs
- Graceful degradation

## Advanced Usage

### Manual Editor Registration

```typescript
import { QuillToolbarService } from './services/quill-toolbar.service';

export class AdvancedPage {
  constructor(private quillToolbarService: QuillToolbarService) {}

  onCustomEditorCreated(editor: any) {
    // Manual registration with custom ID
    this.quillToolbarService.registerQuillEditor(editor, 'custom-editor-1');
  }
}
```

### Listening to Toolbar State

```typescript
import { QuillToolbarService, QuillToolbarState } from './services/quill-toolbar.service';

export class MonitorPage implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(private quillToolbarService: QuillToolbarService) {}

  ngOnInit() {
    this.subscription = this.quillToolbarService.toolbarState.subscribe(
      (state: QuillToolbarState) => {
        console.log('Toolbar visible:', state.isVisible);
        console.log('Bold active:', state.isBold);
        console.log('Keyboard height:', state.keyboardHeight);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

### Programmatic Formatting

```typescript
import { QuillToolbarService } from './services/quill-toolbar.service';

export class ProgrammaticPage {
  constructor(private quillToolbarService: QuillToolbarService) {}

  makeBold() {
    this.quillToolbarService.executeFormat('bold', true);
  }

  toggleItalic() {
    this.quillToolbarService.toggleFormatMode('italic');
  }

  insertBulletList() {
    this.quillToolbarService.executeFormat('bullet', true);
  }
}
```

## Use Cases

- **Journaling Apps**: Daily entries, reflections, gratitude journals
- **Note-Taking**: Meeting notes, study notes, quick memos
- **Content Creation**: Blog posts, articles, documentation
- **Messaging**: Rich text messages, comments, forum posts
- **Forms**: Long-form text inputs, feedback forms
- **Documentation**: Help articles, FAQs, guides
- **Recovery Apps**: Step work, inventory entries, reflections (NephoPhone!)

## Technical Details

### Dependencies

```json
{
  "ngx-quill": "^28.0.1",
  "quill": "^2.0.0",
  "@capacitor/keyboard": "^7.0.0",
  "moment": "^2.29.4"  // If using dates
}
```

### Bundle Size

- **ngx-quill**: ~15KB (gzipped)
- **quill**: ~75KB (gzipped)
- **Custom components**: ~8KB (gzipped)
- **Total**: ~98KB added to bundle

### Performance

- ✅ Lazy-loaded editor initialization
- ✅ Efficient state management with RxJS
- ✅ Minimal re-renders with reactive updates
- ✅ Cached format state
- ✅ Smooth CSS animations (GPU accelerated)

## Toolbar Buttons

### Text Formatting
- **B** (Bold): `editor.format('bold', true)`
- **I** (Italic): `editor.format('italic', true)`
- **U** (Underline): `editor.format('underline', true)`

### Structure
- **H1** (Header 1): `editor.format('header', 1)`
- **🔘** (Bullet List): `editor.format('list', 'bullet')`
- **🔢** (Ordered List): `editor.format('list', 'ordered')`

### Links
- **🔗** (Link): Prompts for URL and inserts link

### Actions
- **🗑️** (Clear): Clears all content with confirmation
- **🔽** (Close): Closes keyboard

## Customization

### Adding Custom Formats

To add new formatting options:

1. **Update Service Interface:**
```typescript
// quill-toolbar.service.ts
export interface QuillToolbarState {
  // ... existing properties
  isStrikethrough: boolean;
  strikethroughMode: boolean;
}
```

2. **Add Toolbar Button:**
```html
<!-- quill-floating-toolbar.component.html -->
<ion-button 
  [class.active]="isFormatActive('strike')"
  (click)="onFormatClick('strike')">
  <span class="tool-label strike">S</span>
</ion-button>
```

3. **Handle Format:**
```typescript
// quill-toolbar.service.ts
executeFormat(format: string, value: any): void {
  // ... existing code
  if (format === 'strike') {
    editor.format('strike', value);
  }
}
```

### Custom Keyboard Height

```typescript
// Override keyboard height detection
this.quillToolbarService.setToolbarState({
  ...currentState,
  keyboardHeight: 350  // Custom height in pixels
});
```

## Troubleshooting

### Toolbar Not Appearing

1. **Check keyboard plugin:**
```bash
npm ls @capacitor/keyboard
```

2. **Verify global integration:**
```html
<!-- app.component.html should have: -->
<app-quill-floating-toolbar></app-quill-floating-toolbar>
```

3. **Check editor registration:**
```typescript
// Editor should emit editorCreated event
(editorCreated)="onEditorCreated($event)"
```

### Formatting Not Working

1. **Verify editor has focus**
2. **Check console for errors**
3. **Ensure Quill styles are imported in global.scss**

### Positioning Issues

1. **Check z-index conflicts** (toolbar uses z-index: 99999)
2. **Verify no parent containers with overflow: hidden**
3. **Test on actual device** (simulator behavior may differ)

### Multiple Editors

Only one editor can be active at a time. The service automatically switches based on focus.

## Browser Compatibility

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ iOS Safari (all versions)
- ✅ Android Chrome (all versions)

## Known Limitations

1. **One Active Editor**: Only one editor can use the toolbar at a time
2. **Native Keyboard Required**: Best experience requires native keyboard (PWA limitations)
3. **Format Persistence**: Format modes reset when editor loses focus
4. **Web Keyboard Detection**: Less accurate than native platforms

## Best Practices

### 1. Always Unregister

```typescript
ngOnDestroy() {
  this.quillToolbarService.unregisterQuillEditor();
}
```

### 2. Handle Content Changes

```typescript
onContentChanged(event: any) {
  // Debounce if auto-saving
  clearTimeout(this.saveTimeout);
  this.saveTimeout = setTimeout(() => {
    this.saveContent(event.html);
  }, 1000);
}
```

### 3. Provide Placeholders

```typescript
config: QuillEditorConfig = {
  placeholder: 'What\'s on your mind?',  // User-friendly placeholder
  height: '300px'
};
```

### 4. Test on Real Devices

Keyboard behavior differs between simulators and real devices. Always test on physical hardware!

## Migration from NephoPhone

The extracted version removes:
- ❌ Database auto-save (JournalService, InventoryService)
- ❌ Photo capture integration
- ❌ Attachment management
- ❌ Search modal
- ❌ Prayer detail integration
- ❌ App-specific keyboard toolbar service

What remains:
- ✅ Core Quill editor wrapper
- ✅ Floating toolbar with all formatting
- ✅ Service architecture
- ✅ Keyboard detection
- ✅ Format modes
- ✅ Link insertion
- ✅ Clear content

## Future Enhancements

- Code block formatting
- Image insertion
- Color picker
- Font size controls
- Undo/redo buttons
- Word count display
- Markdown export
- Custom themes

## Credits

Extracted and refactored from the NephoPhone recovery app's journaling system.

## License

This component is part of the UpStart Mobile Components library.

---

**Ready to use!** Add rich text editing to your Ionic app in minutes! 🎉

