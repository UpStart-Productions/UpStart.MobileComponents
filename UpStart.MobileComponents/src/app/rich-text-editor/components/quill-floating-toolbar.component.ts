import { Component, OnInit, OnDestroy, ElementRef, Renderer2, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon, AlertController, ActionSheetController } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { QuillToolbarService, QuillToolbarState } from '../services/quill-toolbar.service';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

/**
 * Quill Floating Toolbar Component
 * 
 * A global floating toolbar that appears above the keyboard when editing
 * with Quill. Provides quick access to text formatting options.
 * Features smooth animations and real-time format state tracking.
 * 
 * **Global Integration**: This component should be added to app.component.html
 * to make it available throughout the entire app.
 * 
 * @example
 * ```html
 * <!-- app.component.html -->
 * <ion-app>
 *   <ion-router-outlet></ion-router-outlet>
 *   <app-quill-floating-toolbar></app-quill-floating-toolbar>
 * </ion-app>
 * ```
 */
@Component({
  selector: 'app-quill-floating-toolbar',
  templateUrl: './quill-floating-toolbar.component.html',
  styleUrls: ['./quill-floating-toolbar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon]
})
export class QuillFloatingToolbarComponent implements OnInit, OnDestroy, AfterViewInit {
  toolbarState: QuillToolbarState = {
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
  };

  private subscriptions: Subscription[] = [];
  private quillEditor: any = null;
  private lastSelectionIndex: number | null = null;
  private alertController = inject(AlertController);
  private actionSheetController = inject(ActionSheetController);

  constructor(
    private quillToolbarService: QuillToolbarService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    console.log('🛠️ FloatingToolbar: ngOnInit called');
    
    // Subscribe to toolbar state changes
    this.subscriptions.push(
      this.quillToolbarService.toolbarState.subscribe(state => {
        console.log('🛠️ FloatingToolbar: State updated', state);
        this.toolbarState = state;
        this.updateToolbarPosition();
      })
    );

    // Subscribe to active Quill editor changes
    this.subscriptions.push(
      this.quillToolbarService.activeQuillEditor.subscribe(editor => {
        console.log('🛠️ FloatingToolbar: Editor changed', !!editor);
        this.quillEditor = editor;
        if (editor) {
          this.setupEditorListeners(editor);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewInit() {
    // Ensure tight button spacing
    setTimeout(() => {
      this.forceRemoveToolbarGaps();
    }, 100);
  }

  /**
   * Remove gaps between toolbar buttons for compact layout
   */
  private forceRemoveToolbarGaps(): void {
    const container = this.elementRef.nativeElement.querySelector('.toolbar-container');
    const buttons = this.elementRef.nativeElement.querySelectorAll('ion-button');
    
    if (container) {
      this.renderer.setStyle(container, 'display', 'flex');
      this.renderer.setStyle(container, 'gap', '0');
      this.renderer.setStyle(container, 'align-items', 'center');
      this.renderer.setStyle(container, 'justify-content', 'center');
    }
    
    buttons.forEach((button: Element) => {
      this.renderer.setStyle(button, 'margin', '0');
      this.renderer.setStyle(button, 'padding', '0');
    });
  }

  /**
   * Setup listeners on the Quill editor
   */
  private setupEditorListeners(editor: any): void {
    // Listen for selection changes
    editor.on('selection-change', (range: any) => {
      if (range) {
        this.lastSelectionIndex = range.index;
        // Update format state when selection changes
        this.quillToolbarService.updateFormatState();
      }
    });

    // Listen for text changes
    editor.on('text-change', () => {
      this.quillToolbarService.updateFormatState();
    });
  }

  /**
   * Update toolbar position based on keyboard height
   */
  private updateToolbarPosition(): void {
    const toolbar = this.elementRef.nativeElement.querySelector('.quill-floating-toolbar');
    if (!toolbar) {
      console.warn('🛠️ FloatingToolbar: Toolbar element not found!');
      return;
    }

    if (this.toolbarState.isVisible) {
      // Always position at bottom of screen (0px) when visible
      // On native, it will be above the keyboard automatically
      // On web, it will be at the bottom of the viewport
      console.log('🛠️ FloatingToolbar: Positioning at 0px (bottom of screen/above keyboard)');
      this.renderer.setStyle(toolbar, 'bottom', '0px');
    } else {
      // Hide below screen
      console.log('🛠️ FloatingToolbar: Hiding toolbar');
      this.renderer.setStyle(toolbar, 'bottom', '-76px');
    }
  }

  /**
   * Check if a format is active
   */
  isFormatActive(format: string): boolean {
    switch (format) {
      case 'bold':
        return this.toolbarState.isBold || this.toolbarState.boldMode;
      case 'italic':
        return this.toolbarState.isItalic || this.toolbarState.italicMode;
      case 'underline':
        return this.toolbarState.isUnderline || this.toolbarState.underlineMode;
      case 'bullet':
        return this.toolbarState.isBulletList || this.toolbarState.bulletMode;
      case 'ordered':
        return this.toolbarState.isOrderedList || this.toolbarState.orderedMode;
      case 'header1':
        return this.toolbarState.isHeader1 || this.toolbarState.header1Mode;
      default:
        return false;
    }
  }

  /**
   * Handle format button clicks
   */
  onFormatClick(format: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (!this.quillEditor) return;

    const selection = this.quillEditor.getSelection();
    
    if (selection && selection.length > 0) {
      // Text is selected - apply format to selection
      const isActive = this.isFormatActive(format);
      this.quillToolbarService.executeFormat(format, !isActive);
    } else {
      // No selection - toggle format mode for new text
      this.quillToolbarService.toggleFormatMode(format);
    }
    
    // Refocus the editor after formatting
    setTimeout(() => {
      if (this.quillEditor && this.lastSelectionIndex !== null) {
        this.quillEditor.setSelection(this.lastSelectionIndex, 0);
      }
    }, 50);
  }

  /**
   * Handle attach button click
   */
  async onAttachClick(): Promise<void> {
    console.log('🛠️ FloatingToolbar: Attach clicked');
    
    const alert = await this.alertController.create({
      header: 'Attach File',
      message: 'Attach functionality is available! In NephoPhone, this opens a file picker to attach PDFs and documents.',
      buttons: ['OK']
    });
    
    await alert.present();
  }

  /**
   * Handle photo button click
   */
  async onPhotoClick(): Promise<void> {
    console.log('🛠️ FloatingToolbar: Photo clicked');
    
    if (!this.quillEditor) return;

    try {
      // Show action sheet to choose camera or library
      const actionSheet = await this.actionSheetController.create({
        header: 'Add Photo',
        buttons: [
          {
            text: 'Take Photo',
            icon: 'camera-outline',
            handler: () => {
              this.capturePhoto(CameraSource.Camera);
            }
          },
          {
            text: 'Choose from Library',
            icon: 'images-outline',
            handler: () => {
              this.capturePhoto(CameraSource.Photos);
            }
          },
          {
            text: 'Cancel',
            icon: 'close-outline',
            role: 'cancel'
          }
        ]
      });

      await actionSheet.present();
    } catch (error) {
      console.error('Error showing photo options:', error);
    }
  }

  /**
   * Capture photo from camera or library
   */
  private async capturePhoto(source: CameraSource): Promise<void> {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: source
      });

      if (photo.dataUrl && this.quillEditor) {
        // Get current selection or insert at end
        const selection = this.quillEditor.getSelection();
        const index = selection ? selection.index : this.quillEditor.getLength();

        // Insert image into editor
        this.quillEditor.insertEmbed(index, 'image', photo.dataUrl);
        
        // Move cursor after image
        this.quillEditor.setSelection(index + 1, 0);

        console.log('📷 Photo inserted into editor');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
      
      const alert = await this.alertController.create({
        header: 'Photo Error',
        message: 'Unable to capture photo. Please check camera permissions.',
        buttons: ['OK']
      });
      
      await alert.present();
    }
  }

  /**
   * Handle link insertion
   */
  async onLinkClick(): Promise<void> {
    if (!this.quillEditor) return;

    const selection = this.quillEditor.getSelection();
    if (!selection || selection.length === 0) {
      // Show message if no text is selected
      const alert = await this.alertController.create({
        header: 'Select Text',
        message: 'Please select the text you want to turn into a link.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Get current link if text already has one
    const format = this.quillEditor.getFormat();
    const currentLink = format.link || '';

    // Prompt for URL
    const alert = await this.alertController.create({
      header: currentLink ? 'Edit Link' : 'Insert Link',
      inputs: [
        {
          name: 'url',
          type: 'url',
          placeholder: 'https://example.com',
          value: currentLink
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        ...(currentLink ? [{
          text: 'Remove Link',
          role: 'destructive' as const,
          handler: () => {
            this.quillEditor.format('link', false);
          }
        }] : []),
        {
          text: currentLink ? 'Update' : 'Insert',
          handler: (data: any) => {
            if (data.url && data.url.trim()) {
              let url = data.url.trim();
              // Add https:// if no protocol specified
              if (!url.match(/^https?:\/\//i)) {
                url = 'https://' + url;
              }
              this.quillEditor.format('link', url);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Handle clear content button
   */
  async onClearClick(): Promise<void> {
    if (!this.quillEditor) return;

    const alert = await this.alertController.create({
      header: 'Clear Content',
      message: 'Are you sure you want to clear all content? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear',
          role: 'destructive',
          handler: () => {
            this.quillEditor.setText('');
            this.quillToolbarService.resetFormatModes();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Close the keyboard
   */
  async onCloseKeyboard(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      try {
        await Keyboard.hide();
      } catch (error) {
        console.error('Error hiding keyboard:', error);
      }
    } else {
      // On web, blur the editor
      if (this.quillEditor) {
        this.quillEditor.blur();
      }
    }
  }
}

