import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

/**
 * FeelingOption interface
 * Represents a single feeling/emotion option
 */
export interface FeelingOption {
  emoji: string;
  label: string;
  category: 'calm' | 'neutral' | 'distressed';
  value: number;
}

/**
 * Feelings Widget Component
 * 
 * A reusable emoji-based feelings selector with beautiful animations.
 * Works in two modes:
 * - **Normal mode**: Shows emoji selector, optional text input, and action links
 * - **Emoji-only mode**: Just the emoji selector for use in forms
 * 
 * @example
 * ```html
 * <!-- Normal mode -->
 * <app-feelings 
 *   (feelingSelected)="onFeelingSelected($event)"
 *   (noteSubmitted)="onNoteSubmitted($event)">
 * </app-feelings>
 * 
 * <!-- Emoji-only mode (for forms) -->
 * <app-feelings 
 *   [emojiOnly]="true"
 *   (feelingSelected)="onFeelingSelected($event)">
 * </app-feelings>
 * ```
 */
@Component({
  selector: 'app-feelings',
  templateUrl: './feelings.component.html',
  styleUrls: ['./feelings.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class FeelingsComponent implements OnInit {
  /**
   * When true, only shows emoji selection (no text input or actions)
   * Perfect for use as a form control
   */
  @Input() emojiOnly: boolean = false;
  
  /**
   * Remove card margin for better form integration
   */
  @Input() noMargin: boolean = false;
  
  /**
   * Show or hide the text input field in normal mode
   */
  @Input() showTextInput: boolean = true;
  
  /**
   * Show or hide the action links (Spot Check/Journal)
   */
  @Input() showActions: boolean = true;
  
  /**
   * Emitted when a feeling is selected
   */
  @Output() feelingSelected = new EventEmitter<FeelingOption>();
  
  /**
   * Emitted when user submits a note with their feeling
   */
  @Output() noteSubmitted = new EventEmitter<{feeling: FeelingOption, note: string}>();
  
  /**
   * Emitted when user clicks an action link (for parent component to handle)
   */
  @Output() actionClicked = new EventEmitter<'spotcheck' | 'journal'>();
  
  /**
   * Emitted when feeling is cleared
   */
  @Output() feelingCleared = new EventEmitter<void>();

  /**
   * Available feelings organized by category
   */
  feelings: FeelingOption[] = [
    // Calm / Content
    { emoji: '😊', label: 'Happy', category: 'calm', value: 1 },
    { emoji: '😌', label: 'Peaceful', category: 'calm', value: 2 },
    { emoji: '🙂', label: 'Content', category: 'calm', value: 3 },
    { emoji: '💪', label: 'Strong', category: 'calm', value: 4 },
    
    // Mixed / Neutral
    { emoji: '😐', label: 'Neutral', category: 'neutral', value: 5 },
    { emoji: '🤔', label: 'Thoughtful', category: 'neutral', value: 6 },
    { emoji: '😶‍🌫️', label: 'Confused', category: 'neutral', value: 7 },
    { emoji: '🥱', label: 'Tired', category: 'neutral', value: 8 },
    
    // Distressed / Challenged
    { emoji: '😠', label: 'Frustrated', category: 'distressed', value: 9 },
    { emoji: '😢', label: 'Sad', category: 'distressed', value: 10 },
    { emoji: '😤', label: 'Stressed', category: 'distressed', value: 11 },
    { emoji: '😞', label: 'Disappointed', category: 'distressed', value: 12 }
  ];

  selectedFeeling: FeelingOption | null = null;
  feelingNote: string = '';
  showToast: boolean = false;

  constructor() { }

  ngOnInit() {
    // Component initialization
  }

  /**
   * Select a feeling emoji
   */
  selectFeeling(feeling: FeelingOption, event?: Event) {
    // Prevent event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // If selecting the same feeling, clear it
    if (this.selectedFeeling?.value === feeling.value) {
      this.clearSelection();
      return;
    }
    
    this.selectedFeeling = feeling;
    this.feelingNote = ''; // Clear any previous note
    this.feelingSelected.emit(feeling);
  }

  /**
   * Check if a feeling is currently selected
   */
  isSelected(feeling: FeelingOption): boolean {
    return this.selectedFeeling?.value === feeling.value;
  }

  /**
   * Clear the current selection
   */
  clearSelection(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    this.selectedFeeling = null;
    this.feelingNote = '';
    this.feelingCleared.emit();
  }

  /**
   * Get the currently selected feeling label
   */
  getSelectedFeelingLabel(): string {
    return this.selectedFeeling?.label || 'No feeling selected';
  }

  /**
   * Programmatically set a feeling (useful for forms)
   */
  setSelectedFeeling(feeling: FeelingOption | null) {
    this.selectedFeeling = feeling;
    if (feeling) {
      this.feelingNote = '';
    }
  }

  /**
   * Get the current selected feeling (useful for reading value)
   */
  getSelectedFeeling(): FeelingOption | null {
    return this.selectedFeeling;
  }

  /**
   * Submit a note with the selected feeling
   */
  submitNote(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    if (this.selectedFeeling && this.feelingNote?.trim()) {
      this.noteSubmitted.emit({
        feeling: this.selectedFeeling,
        note: this.feelingNote.trim()
      });
      
      // Show success toast
      this.showToastNotification();
      
      // Clear selection after submission
      this.clearSelection();
    }
  }

  /**
   * Get placeholder text for the input field
   */
  getFeelingPlaceholder(): string {
    if (!this.selectedFeeling?.label) {
      return '';
    }
    return `${this.selectedFeeling.label}. Why?`;
  }

  /**
   * Handle action button clicks
   */
  onActionClick(action: 'spotcheck' | 'journal', event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.actionClicked.emit(action);
  }

  /**
   * Show a success toast notification
   */
  private showToastNotification() {
    this.showToast = true;
    
    // Auto-hide after 1 second
    setTimeout(() => {
      this.showToast = false;
    }, 1000);
  }
}

