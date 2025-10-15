import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button Bar Color Configuration
 */
export interface ButtonBarColors {
  /** Background color of the button bar */
  buttonBarColor?: string;
  /** Color of unselected button labels */
  labelColor?: string;
  /** Background color of the animated highlight */
  highlighterColor?: string;
  /** Color of selected button label */
  highlighterLabelColor?: string;
}

/**
 * Button Bar Configuration
 */
export interface ButtonBarConfig {
  /** Array of buttons to display */
  buttons: { label: string, value: any }[];
  /** Optional custom colors */
  colors?: ButtonBarColors;
}

/**
 * Button Bar (Segmented Control) Widget
 * 
 * A beautiful animated segmented control with a sliding highlight indicator.
 * Perfect for tab bars, filters, date ranges, or any multi-option selection.
 * Features smooth animations and fully customizable colors.
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <app-button-bar
 *   [config]="myConfig"
 *   (buttonSelectedEvent)="onSelection($event)">
 * </app-button-bar>
 * 
 * <!-- With custom colors -->
 * <app-button-bar
 *   [config]="{
 *     buttons: [{label: 'Day', value: 'day'}, {label: 'Week', value: 'week'}],
 *     colors: {buttonBarColor: '#FF6B6B', highlighterColor: 'white'}
 *   }"
 *   (buttonSelectedEvent)="handleSelection($event)">
 * </app-button-bar>
 * ```
 */
@Component({
  selector: 'app-button-bar',
  template: `
    <div class="button-bar" 
         [ngStyle]="{'background': mergedColors.buttonBarColor, '--button-count': config.buttons.length}">
      <div class="highlight" 
           [ngStyle]="{
             'background': mergedColors.highlighterColor, 
             'left': (selectedIndex * (100 / config.buttons.length)) + '%'
           }">
      </div>
      <button *ngFor="let button of config.buttons; let i = index"
              (click)="selectButton(i)"
              [class.active]="selectedIndex === i"
              [ngStyle]="{'color': selectedIndex === i ? mergedColors.highlighterLabelColor : mergedColors.labelColor}">
        {{ button.label }}
      </button>
    </div>
  `,
  styles: [`
    .button-bar {
      display: flex;
      border-radius: 30px;
      padding: 3px;
      position: relative;
      overflow: hidden;
    }
    
    .button-bar button {
      background: transparent;
      border: none;
      font-size: 16px;
      font-weight: 500;
      padding: 6px 10px;
      cursor: pointer;
      position: relative;
      z-index: 1;
      transition: color 0.2s ease-in-out;
      flex: 1;
    }
    
    .button-bar .highlight {
      position: absolute;
      height: 80%;
      width: calc((100% / var(--button-count)) - 6px);
      border-radius: 20px;
      transition: left 0.2s ease-in-out;
      z-index: 0;
      margin-left: 3px;
      margin-right: 3px;
      top: 50%;
      transform: translateY(-50%);
    }
    
    .button-bar button.active {
      font-weight: 500;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonBarComponent {
  /** Button bar configuration */
  @Input() config: ButtonBarConfig = { buttons: [] }; 
  
  /** Emitted when a button is selected */
  @Output() buttonSelectedEvent = new EventEmitter<any>(); 
  
  /** Currently selected button index */
  selectedIndex = 0;

  /** Default color scheme (purple theme from NephoPhone) */
  defaultColors: ButtonBarColors = {
    buttonBarColor: '#5433c6',
    labelColor: 'white',
    highlighterColor: 'white',
    highlighterLabelColor: 'black'
  };

  /**
   * Get merged colors (defaults + custom overrides)
   */
  get mergedColors(): ButtonBarColors {
    return { ...this.defaultColors, ...this.config.colors };
  }

  /**
   * Select a button by index
   */
  selectButton(index: number): void {
    this.selectedIndex = index;
    this.buttonSelectedEvent.emit(this.config.buttons[index].value);
  }
}

