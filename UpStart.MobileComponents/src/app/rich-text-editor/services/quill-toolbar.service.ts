import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Keyboard, KeyboardInfo } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

/**
 * Quill Toolbar State Interface
 * Tracks the current state of the toolbar and formatting
 */
export interface QuillToolbarState {
  isVisible: boolean;
  keyboardHeight: number;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isHeader1: boolean;
  // Format mode states - when user clicks a button to enable formatting for new text
  boldMode: boolean;
  italicMode: boolean;
  underlineMode: boolean;
  bulletMode: boolean;
  orderedMode: boolean;
  header1Mode: boolean;
}

/**
 * Quill Editor Interface
 */
export interface QuillEditor {
  instance: any;
  id?: string;
  config?: any;
}

/**
 * Quill Toolbar Service
 * 
 * Central service managing the floating toolbar state, keyboard detection,
 * and Quill editor registration. Provides reactive state management for
 * the global floating toolbar component.
 * 
 * @example
 * ```typescript
 * // Register editor when created
 * onEditorCreated(editor: any) {
 *   this.quillToolbarService.registerQuillEditor(editor);
 * }
 * 
 * // Unregister on destroy
 * ngOnDestroy() {
 *   this.quillToolbarService.unregisterQuillEditor();
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class QuillToolbarService {
  private activeQuillEditor$ = new BehaviorSubject<any>(null);
  private toolbarState$ = new BehaviorSubject<QuillToolbarState>({
    isVisible: false,
    keyboardHeight: 0,
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isBulletList: false,
    isOrderedList: false,
    isHeader1: false,
    boldMode: false,
    italicMode: false,
    underlineMode: false,
    bulletMode: false,
    orderedMode: false,
    header1Mode: false
  });

  private keyboardHeight = 0;
  private isKeyboardOpen = false;

  constructor() {
    this.initializeKeyboardListeners();
  }

  /**
   * Get the active Quill editor observable
   */
  get activeQuillEditor(): Observable<any> {
    return this.activeQuillEditor$.asObservable();
  }

  /**
   * Get the toolbar state observable
   */
  get toolbarState(): Observable<QuillToolbarState> {
    return this.toolbarState$.asObservable();
  }

  /**
   * Register a Quill editor instance
   */
  registerQuillEditor(editor: any, id?: string, config?: any): void {
    console.log('🔧 QuillToolbarService: Registering Quill editor', { id, hasEditor: !!editor });
    this.activeQuillEditor$.next(editor);
    this.updateToolbarState();
  }

  /**
   * Unregister the current Quill editor
   */
  unregisterQuillEditor(): void {
    console.log('🔧 QuillToolbarService: Unregistering Quill editor');
    this.activeQuillEditor$.next(null);
    this.updateToolbarState();
  }

  /**
   * Execute a formatting command on the active editor
   */
  executeFormat(format: string, value: any): void {
    const editor = this.activeQuillEditor$.value;
    if (editor) {
      console.log('🔧 QuillToolbarService: Executing format', {format, value});
      
      // Apply the format
      if (format === 'bullet' || format === 'ordered') {
        editor.format('list', value ? format : false);
      } else if (format === 'header1') {
        editor.format('header', value ? 1 : false);
      } else {
        editor.format(format, value);
      }
      
      // Force immediate state update with delay to ensure format is applied
      setTimeout(() => {
        this.updateFormatState();
        this.syncFormatModes(format, value);
      }, 10);
    }
  }

  /**
   * Update format state based on current editor selection
   */
  updateFormatState(): void {
    const editor = this.activeQuillEditor$.value;
    if (!editor) return;

    try {
      const format = editor.getFormat();
      const selection = editor.getSelection();
      
      const currentState = this.toolbarState$.value;
      const newState: QuillToolbarState = {
        ...currentState,
        isBold: !!format.bold,
        isItalic: !!format.italic,
        isUnderline: !!format.underline,
        isBulletList: format.list === 'bullet',
        isOrderedList: format.list === 'ordered',
        isHeader1: format.header === 1,
        // Reset modes when the actual format doesn't match
        boldMode: !!format.bold ? currentState.boldMode : false,
        italicMode: !!format.italic ? currentState.italicMode : false,
        underlineMode: !!format.underline ? currentState.underlineMode : false,
        bulletMode: format.list === 'bullet' ? currentState.bulletMode : false,
        orderedMode: format.list === 'ordered' ? currentState.orderedMode : false,
        header1Mode: format.header === 1 ? currentState.header1Mode : false
      };

      this.toolbarState$.next(newState);
    } catch (error) {
      console.error('🔧 QuillToolbarService: Error updating format state:', error);
    }
  }

  /**
   * Sync format modes with actual format state
   */
  private syncFormatModes(format: string, value: any): void {
    setTimeout(() => {
      const editor = this.activeQuillEditor$.value;
      if (!editor) return;

      const currentFormat = editor.getFormat();
      const currentState = this.toolbarState$.value;
      
      // Build completely fresh state based on actual editor format
      const newState: QuillToolbarState = {
        ...currentState,
        isBold: !!currentFormat.bold,
        isItalic: !!currentFormat.italic,
        isUnderline: !!currentFormat.underline,
        isBulletList: currentFormat.list === 'bullet',
        isOrderedList: currentFormat.list === 'ordered',
        isHeader1: currentFormat.header === 1,
        // Reset ALL modes when executeFormat is called
        boldMode: false,
        italicMode: false,
        underlineMode: false,
        bulletMode: false,
        orderedMode: false,
        header1Mode: false
      };

      this.toolbarState$.next(newState);
    }, 20);
  }

  /**
   * Toggle format modes (for new text)
   */
  toggleFormatMode(format: string): void {
    const currentState = this.toolbarState$.value;
    const newState: QuillToolbarState = { ...currentState };

    switch (format) {
      case 'bold':
        newState.boldMode = !newState.boldMode;
        break;
      case 'italic':
        newState.italicMode = !newState.italicMode;
        break;
      case 'underline':
        newState.underlineMode = !newState.underlineMode;
        break;
      case 'bullet':
        newState.bulletMode = !newState.bulletMode;
        newState.orderedMode = false;
        break;
      case 'ordered':
        newState.orderedMode = !newState.orderedMode;
        newState.bulletMode = false;
        break;
      case 'header1':
        newState.header1Mode = !newState.header1Mode;
        break;
    }

    this.toolbarState$.next(newState);
    
    // Apply the format to the current cursor position
    const editor = this.activeQuillEditor$.value;
    if (editor) {
      const formatValue = newState[`${format}Mode` as keyof QuillToolbarState];
      if (format === 'bullet' || format === 'ordered') {
        editor.format('list', formatValue ? format : false);
      } else if (format === 'header1') {
        editor.format('header', formatValue ? 1 : false, 'user');
      } else {
        editor.format(format, formatValue);
      }
    }
  }

  /**
   * Reset all format modes
   */
  resetFormatModes(): void {
    const currentState = this.toolbarState$.value;
    const newState: QuillToolbarState = {
      ...currentState,
      boldMode: false,
      italicMode: false,
      underlineMode: false,
      bulletMode: false,
      orderedMode: false,
      header1Mode: false
    };

    this.toolbarState$.next(newState);

    // Remove formatting from current cursor position
    const editor = this.activeQuillEditor$.value;
    if (editor) {
      editor.format('bold', false);
      editor.format('italic', false);
      editor.format('underline', false);
      editor.format('list', false);
      editor.format('header', false);
    }
  }

  /**
   * Set toolbar visibility manually
   */
  setToolbarVisibility(isVisible: boolean): void {
    const currentState = this.toolbarState$.value;
    
    // If keyboard is open, keep toolbar visible
    if (!isVisible && this.isKeyboardOpen) {
      console.log('🔧 QuillToolbarService: Keeping toolbar visible (keyboard is open)');
      return;
    }
    
    const newState: QuillToolbarState = {
      ...currentState,
      isVisible
    };
    
    console.log('🔧 QuillToolbarService: Setting toolbar visibility', isVisible);
    this.toolbarState$.next(newState);
  }

  /**
   * Set toolbar state directly
   */
  setToolbarState(newState: QuillToolbarState): void {
    this.toolbarState$.next(newState);
  }

  /**
   * Initialize keyboard listeners for both native and web
   */
  private async initializeKeyboardListeners(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      try {
        // Listen for keyboard show/hide events on native platforms
        await Keyboard.addListener('keyboardWillShow', (info: KeyboardInfo) => {
          this.keyboardHeight = info.keyboardHeight;
          this.isKeyboardOpen = true;
          this.updateToolbarState();
        });

        await Keyboard.addListener('keyboardWillHide', () => {
          console.log('🔧 QuillToolbarService: Keyboard will hide');
          this.keyboardHeight = 0;
          this.isKeyboardOpen = false;
          // Hide toolbar when keyboard closes
          const currentState = this.toolbarState$.value;
          this.toolbarState$.next({ ...currentState, isVisible: false, keyboardHeight: 0 });
        });

        await Keyboard.addListener('keyboardDidShow', (info: KeyboardInfo) => {
          this.keyboardHeight = info.keyboardHeight;
          this.isKeyboardOpen = true;
          this.updateToolbarState();
        });

        await Keyboard.addListener('keyboardDidHide', () => {
          console.log('🔧 QuillToolbarService: Keyboard did hide');
          this.keyboardHeight = 0;
          this.isKeyboardOpen = false;
          // Hide toolbar when keyboard closes
          const currentState = this.toolbarState$.value;
          this.toolbarState$.next({ ...currentState, isVisible: false, keyboardHeight: 0 });
        });

        console.log('🔧 QuillToolbarService: Keyboard listeners initialized (native)');
      } catch (error) {
        console.error('🔧 QuillToolbarService: Error setting up keyboard listeners:', error);
        this.setupWebKeyboardDetection();
      }
    } else {
      this.setupWebKeyboardDetection();
    }
  }

  /**
   * Web keyboard detection fallback
   * Uses window resize detection to estimate keyboard presence
   */
  private setupWebKeyboardDetection(): void {
    let previousHeight = window.innerHeight;
    
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      
      if (currentHeight < previousHeight && currentHeight < window.outerHeight) {
        // Keyboard likely opened
        this.keyboardHeight = previousHeight - currentHeight;
        this.isKeyboardOpen = true;
      } else if (currentHeight >= window.outerHeight || currentHeight > previousHeight) {
        // Keyboard likely closed
        this.keyboardHeight = 0;
        this.isKeyboardOpen = false;
      }
      
      previousHeight = currentHeight;
      this.updateToolbarState();
    };

    window.addEventListener('resize', handleResize);
    console.log('🔧 QuillToolbarService: Web keyboard detection initialized');
  }

  /**
   * Update toolbar state based on current conditions
   */
  private updateToolbarState(): void {
    const editor = this.activeQuillEditor$.value;
    const currentState = this.toolbarState$.value;
    
    const newState: QuillToolbarState = {
      ...currentState,
      keyboardHeight: this.keyboardHeight,
      isVisible: !!(editor && this.isKeyboardOpen)
    };

    this.toolbarState$.next(newState);
  }
}

