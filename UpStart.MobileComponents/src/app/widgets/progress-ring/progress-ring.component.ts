import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Progress Ring Widget Component
 * 
 * A circular progress indicator with customizable colors, size, and stroke width.
 * Perfect for showing percentage progress, timers, or completion status.
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <app-progress-ring 
 *   [progress]="75"
 *   [size]="120">
 * </app-progress-ring>
 * 
 * <!-- With custom colors and gradient -->
 * <app-progress-ring 
 *   [progress]="50"
 *   [color]="'#ff6b6b'"
 *   [useGradient]="true"
 *   [showPercentage]="true">
 * </app-progress-ring>
 * ```
 */
@Component({
  selector: 'app-progress-ring',
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ProgressRingComponent implements OnChanges {
  /** Progress value (0-100) */
  @Input() progress: number = 0;
  
  /** Ring size in pixels */
  @Input() size: number = 120;
  
  /** Stroke width in pixels */
  @Input() strokeWidth: number = 12;
  
  /** Progress color (can be hex, rgb, or CSS variable) */
  @Input() color: string = '';
  
  /** Background ring color */
  @Input() backgroundColor: string = '#f5f5f5';
  
  /** Use gradient colors that change based on progress */
  @Input() useGradient: boolean = false;
  
  /** Show percentage text in center */
  @Input() showPercentage: boolean = false;
  
  /** Custom text to show in center (overrides percentage) */
  @Input() centerText: string = '';
  
  /** Animation duration in milliseconds */
  @Input() animationDuration: number = 300;

  // Calculated values
  radius: number = 0;
  circumference: number = 0;
  strokeDashoffset: number = 0;
  currentColor: string = '';

  ngOnChanges(changes: SimpleChanges) {
    this.calculateValues();
  }

  private calculateValues() {
    // Calculate radius (half of size minus stroke width)
    this.radius = (this.size / 2) - (this.strokeWidth / 2) - 2;
    
    // Calculate circumference
    this.circumference = 2 * Math.PI * this.radius;
    
    // Calculate stroke dash offset based on progress
    const progressValue = Math.min(100, Math.max(0, this.progress));
    this.strokeDashoffset = this.circumference - (this.circumference * progressValue / 100);
    
    // Determine current color
    if (this.useGradient) {
      this.currentColor = this.getGradientColor();
    } else if (this.color) {
      this.currentColor = this.color;
    } else {
      this.currentColor = 'var(--ion-color-primary)';
    }
  }

  /**
   * Get gradient color based on progress
   * Yellow (0%) → Green (50%) → Blue (100%)
   */
  private getGradientColor(): string {
    const progress = this.progress;
    
    if (progress < 50) {
      // Yellow to Green (0-50%)
      const ratio = progress / 50;
      return this.interpolateColor('#FFC107', '#4CAF50', ratio);
    } else {
      // Green to Blue (50-100%)
      const ratio = (progress - 50) / 50;
      return this.interpolateColor('#4CAF50', '#2196F3', ratio);
    }
  }

  /**
   * Interpolate between two hex colors
   */
  private interpolateColor(color1: string, color2: string, ratio: number): string {
    const hex = (color: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const c1 = hex(color1);
    const c2 = hex(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Get the text to display in center
   */
  getCenterText(): string {
    if (this.centerText) {
      return this.centerText;
    }
    if (this.showPercentage) {
      return `${Math.round(this.progress)}%`;
    }
    return '';
  }
}


