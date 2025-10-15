import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

/**
 * StepData interface
 * Represents a single step or milestone
 */
export interface StepData {
  id?: number;
  stepNumber: number;
  title: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Step Card Widget Component
 * 
 * A versatile card component for displaying steps, milestones, or numbered items.
 * Features a color-coded numbered badge, action buttons, and optional status switching.
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <app-step-card 
 *   [step]="myStep"
 *   (actionClicked)="handleAction($event)">
 * </app-step-card>
 * 
 * <!-- With custom badge color -->
 * <app-step-card 
 *   [step]="myStep"
 *   [badgeColor]="'#ff6b6b'"
 *   [hasSponsorApproval]="true">
 * </app-step-card>
 * ```
 */
@Component({
  selector: 'app-step-card',
  templateUrl: './step-card.component.html',
  styleUrls: ['./step-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class StepCardComponent {
  /** The step data to display */
  @Input() step: StepData | null = null;
  
  /** Show/hide action buttons */
  @Input() showActions: boolean = true;
  
  /** Show/hide the description text */
  @Input() showDescription: boolean = true;
  
  /** Apply active border styling */
  @Input() isActive: boolean = false;
  
  /** Show the active border when isActive is true */
  @Input() showActiveBorder: boolean = false;
  
  /** Custom badge background color */
  @Input() badgeColor: string = '';
  
  /** Show ribbon icon (for approval/completion) */
  @Input() hasSponsorApproval: boolean = false;
  
  /** Emitted when an action button is clicked */
  @Output() actionClicked = new EventEmitter<{stepNumber: number, action: string}>();

  /**
   * Get the badge background style
   */
  getBadgeStyle() {
    if (this.badgeColor) {
      return { 'background-color': this.badgeColor };
    }
    // Default to primary color
    return { 'background-color': 'var(--ion-color-primary)' };
  }

  /**
   * Handle action button clicks
   */
  onActionClick(action: string, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (this.step) {
      this.actionClicked.emit({
        stepNumber: this.step.stepNumber,
        action: action
      });
    }
  }
}


