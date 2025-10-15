import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuillToolbarService } from '../services/quill-toolbar.service';

/**
 * Quill Editor Configuration
 */
export interface QuillEditorConfig {
  placeholder?: string;
  height?: string;
  readOnly?: boolean;
}

/**
 * Quill Editor Component
 * 
 * A simplified wrapper around ngx-quill that integrates with the floating toolbar.
 * Supports ngModel for two-way data binding and emits events for editor lifecycle.
 * 
 * @example
 * ```html
 * <app-quill-editor
 *   [(ngModel)]="content"
 *   [config]="{placeholder: 'Start writing...', height: '300px'}"
 *   (editorCreated)="onEditorCreated($event)"
 *   (contentChanged)="onContentChanged($event)">
 * </app-quill-editor>
 * ```
 */
@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true
    }
  ]
})
export class QuillEditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  private quillToolbarService = inject(QuillToolbarService);

  @Input() config: QuillEditorConfig = {
    placeholder: 'Start writing...',
    height: 'auto',
    readOnly: false
  };
  
  @Output() editorCreated = new EventEmitter<any>();
  @Output() contentChanged = new EventEmitter<any>();

  content: string = '';
  quillConfig = {
    modules: {
      toolbar: false // Disable toolbar - we use the floating toolbar
    }
  };

  private onChange = (value: string) => {};
  private onTouched = () => {};
  private editorInstance: any = null;
  private eventListenersRegistered = false;

  ngAfterViewInit() {
    console.log('📝 QuillEditor: AfterViewInit called');
  }

  ngOnDestroy() {
    // Unregister editor from toolbar service
    if (this.editorInstance) {
      this.quillToolbarService.unregisterQuillEditor();
    }
  }

  /**
   * Called when the Quill editor is created
   */
  onQuillEditorCreated(editor: any): void {
    console.log('📝 QuillEditor: Editor created', editor);
    this.editorInstance = editor;
    
    // Enable the editor (ensure it's not disabled)
    if (editor && editor.enable) {
      editor.enable();
    }
    
    // Register with toolbar service
    this.quillToolbarService.registerQuillEditor(editor);
    
    // Setup editor event listeners
    if (!this.eventListenersRegistered) {
      this.setupEditorListeners(editor);
      this.eventListenersRegistered = true;
    }
    
    // Focus the editor after a short delay to ensure it's ready
    setTimeout(() => {
      if (editor && editor.focus) {
        console.log('📝 QuillEditor: Attempting to make editor focusable');
      }
    }, 100);
    
    // Emit editor created event
    this.editorCreated.emit(editor);
  }

  /**
   * Setup listeners on the Quill editor
   */
  private setupEditorListeners(editor: any): void {
    // Listen for text changes
    editor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      const html = editor.root.innerHTML;
      this.content = html;
      
      // Update ngModel
      this.onChange(html);
      
      // Emit content changed event
      this.contentChanged.emit({
        html: html,
        text: editor.getText(),
        delta: delta,
        source: source
      });
      
      console.log('📝 QuillEditor: Content changed', { length: editor.getText().length });
    });

    // Listen for selection changes (for updating toolbar state)
    editor.on('selection-change', (range: any, oldRange: any, source: string) => {
      console.log('📝 QuillEditor: Selection changed', { range, oldRange, source });
      
      if (range) {
        // User focused the editor - show toolbar and keep it visible
        console.log('📝 QuillEditor: Showing toolbar (editor has focus)');
        this.quillToolbarService.setToolbarVisibility(true);
        this.quillToolbarService.updateFormatState();
      } else if (oldRange && !range) {
        // Editor lost focus - but check if it's just a temporary blur
        // Don't hide immediately in case keyboard is opening
        console.log('📝 QuillEditor: Editor blur detected, delaying toolbar hide');
        setTimeout(() => {
          // Check if editor still doesn't have focus
          const currentSelection = editor.getSelection();
          if (!currentSelection) {
            console.log('📝 QuillEditor: Confirmed blur, hiding toolbar');
            this.quillToolbarService.setToolbarVisibility(false);
          } else {
            console.log('📝 QuillEditor: False alarm, editor still has focus');
          }
        }, 300);
      }
    });
    
    console.log('📝 QuillEditor: Event listeners setup complete');
  }

  /**
   * Handle content change from Quill editor
   */
  onQuillContentChanged(event: any): void {
    if (event.html) {
      this.content = event.html;
      this.onChange(event.html);
    }
  }

  // ControlValueAccessor implementation
  
  writeValue(value: string): void {
    this.content = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.config) {
      this.config.readOnly = isDisabled;
    }
  }
}

