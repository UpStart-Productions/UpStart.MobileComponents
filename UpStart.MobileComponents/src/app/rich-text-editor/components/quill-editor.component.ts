import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ElementRef, inject, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuillToolbarService } from '../services/quill-toolbar.service';

export interface QuillEditorConfig {
  placeholder?: string;
  height?: string;
  readOnly?: boolean;
  disableToolbarAutoRegister?: boolean;
}

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
  private elementRef = inject(ElementRef);

  @Input() config: QuillEditorConfig = {
    placeholder: 'Start writing...',
    height: 'auto',
    readOnly: false,
    disableToolbarAutoRegister: false
  };
  
  @Output() editorCreated = new EventEmitter<any>();
  @Output() contentChanged = new EventEmitter<any>();

  content: string = '';
  quillConfig = {
    modules: {
      toolbar: false // Disable toolbar completely
    }
  };

  private onChange = (value: string) => {};
  private onTouched = () => {};
  private editorInstance: any = null;

  ngAfterViewInit() {
    console.log('📝 QuillEditor: AfterViewInit called');
  }

  ngOnDestroy() {
    if (this.editorInstance) {
      this.quillToolbarService.unregisterQuillEditor();
    }
  }

  private enforceHorizontalTextOrientation(): void {
    setTimeout(() => {
      const editorElement = this.elementRef.nativeElement.querySelector('.ql-editor');
      if (editorElement) {
        editorElement.style.writingMode = 'horizontal-tb';
        editorElement.style.textOrientation = 'mixed';
        editorElement.style.direction = 'ltr';
        
        const headers = editorElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach((header: Element) => {
          const headerElement = header as HTMLElement;
          headerElement.style.writingMode = 'horizontal-tb';
          headerElement.style.textOrientation = 'mixed';
          headerElement.style.direction = 'ltr';
          headerElement.style.display = 'block';
          headerElement.style.whiteSpace = 'normal';
          headerElement.style.wordWrap = 'break-word';
          headerElement.style.textAlign = 'left';
          headerElement.style.unicodeBidi = 'normal';
          headerElement.style.verticalAlign = 'baseline';
        });
        
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node: Node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;
                if (element.tagName && element.tagName.match(/^H[1-6]$/)) {
                  element.style.writingMode = 'horizontal-tb';
                  element.style.textOrientation = 'mixed';
                  element.style.direction = 'ltr';
                  element.style.display = 'block';
                  element.style.whiteSpace = 'normal';
                  element.style.wordWrap = 'break-word';
                  element.style.textAlign = 'left';
                  element.style.unicodeBidi = 'normal';
                  element.style.verticalAlign = 'baseline';
                }
                const childHeaders = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
                childHeaders.forEach((header: Element) => {
                  const headerElement = header as HTMLElement;
                  headerElement.style.writingMode = 'horizontal-tb';
                  headerElement.style.textOrientation = 'mixed';
                  headerElement.style.direction = 'ltr';
                  headerElement.style.display = 'block';
                  headerElement.style.whiteSpace = 'normal';
                  headerElement.style.wordWrap = 'break-word';
                  headerElement.style.textAlign = 'left';
                  headerElement.style.unicodeBidi = 'normal';
                  headerElement.style.verticalAlign = 'baseline';
                });
              }
            });
          });
        });
        
        observer.observe(editorElement, {
          childList: true,
          subtree: true
        });
      }
    }, 100);
  }

  private fixH1CursorJumping(editor: any): void {
    const keyboard = editor.getModule('keyboard');
    
    keyboard.addBinding({
      key: 'Enter',
      collapsed: true
    }, (range: any, context: any) => {
      const format = editor.getFormat(range);
      const currentLength = editor.getLength();
      
      if (format.header) {
        const selection = editor.getSelection();
        if (selection) {
          if (currentLength <= 1 || (currentLength === selection.index + 1)) {
            editor.insertText(selection.index, '\n\n', 'user');
            editor.formatText(selection.index + 1, 1, 'header', false, 'user');
            editor.setSelection(selection.index + 1, 0, 'user');
            
            setTimeout(() => {
              const newSelection = editor.getSelection();
              if (newSelection) {
                editor.removeFormat(newSelection.index, 1, 'user');
                editor.focus();
                editor.setSelection(newSelection.index, 0, 'user');
                
                const editorElement = this.elementRef.nativeElement.querySelector('.ql-editor');
                if (editorElement) {
                  const allContent = editorElement.querySelectorAll('*');
                  allContent.forEach((element: Element) => {
                    const htmlElement = element as HTMLElement;
                    htmlElement.style.writingMode = 'horizontal-tb';
                    htmlElement.style.textOrientation = 'mixed';
                    htmlElement.style.direction = 'ltr';
                  });
                }
              }
            }, 50);
          } else {
            editor.insertText(selection.index, '\n', 'user');
            editor.removeFormat(selection.index + 1, 1, 'user');
            editor.setSelection(selection.index + 1, 0, 'user');
            
            setTimeout(() => {
              const newSelection = editor.getSelection();
              if (newSelection) {
                editor.format('header', false, 'user');
                editor.focus();
                editor.setSelection(newSelection.index, 0, 'user');
              }
            }, 10);
          }
          
          return false;
        }
      }
      
      return true;
    });
  }

  onModelChange(value: string) {
    this.content = value;
    this.onChange(value);
    
    // Emit content changed event
    this.contentChanged.emit({
      html: value,
      text: this.editorInstance?.getText() || '',
      source: 'user'
    });
  }

  onEditorCreated(editor: any) {
    console.log('📝 QuillEditor: Editor created', editor);
    
    // Store editor reference
    this.editorInstance = editor;
    
    // Register with toolbar service
    if (!this.config.disableToolbarAutoRegister) {
      this.quillToolbarService.registerQuillEditor(editor);
    }
    
    this.editorCreated.emit(editor);
    
    // CRITICAL: Apply cursor jumping fixes
    this.enforceHorizontalTextOrientation();
    this.fixH1CursorJumping(editor);
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    const newContent = value || '';
    if (newContent === this.content) {
      return;
    }
    
    this.content = newContent;
    if (this.editorInstance) {
      this.editorInstance.root.innerHTML = this.content;
    } else if (this.elementRef.nativeElement.querySelector('.ql-editor')) {
      const editor = this.elementRef.nativeElement.querySelector('.ql-editor');
      if (editor) {
        editor.innerHTML = this.content;
      }
    } else {
      this.content = value || '';
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.config.readOnly = isDisabled;
  }
}
