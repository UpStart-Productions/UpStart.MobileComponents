# Progress Ring Widget

A beautiful, custom-built circular progress indicator using pure SVG and CSS. Perfect for showing percentage progress, timers, loading states, or completion status. Features smooth animations, customizable colors, and gradient support.

**Zero Dependencies:** Built from scratch with pure SVG/CSS - lightweight and fully customizable without adding any external packages to your bundle.

## Features

- 🎨 **Customizable Colors**: Solid colors, CSS variables, or automatic gradients
- 📊 **Percentage Display**: Optional center percentage text
- 🌈 **Gradient Mode**: Automatic color transitions (Yellow → Green → Blue)
- 🎭 **Custom Content**: Add any content in the center via ng-content
- 📏 **Flexible Sizing**: Any size from tiny to huge
- ⚡ **Smooth Animations**: CSS transitions for fluid progress updates
- 🎯 **Stroke Width Control**: Adjust ring thickness
- 🔧 **Highly Configurable**: Control every aspect of appearance

## Installation

1. Copy the component files to your project:
   - `progress-ring.component.ts`
   - `progress-ring.component.html`
   - `progress-ring.component.scss`

2. Import in your page/component:

```typescript
import { ProgressRingComponent } from './path/to/progress-ring.component';

@Component({
  // ...
  imports: [
    // ... other imports
    ProgressRingComponent
  ]
})
```

## Basic Usage

```html
<!-- Basic progress ring -->
<app-progress-ring
  [progress]="75"
  [size]="120"
  [showPercentage]="true">
</app-progress-ring>
```

```typescript
export class MyComponent {
  progress: number = 75;
}
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `progress` | `number` | `0` | Progress value (0-100) |
| `size` | `number` | `120` | Ring size in pixels |
| `strokeWidth` | `number` | `12` | Stroke width in pixels |
| `color` | `string` | `''` | Progress color (hex, rgb, or CSS variable) |
| `backgroundColor` | `string` | `'#f5f5f5'` | Background ring color |
| `useGradient` | `boolean` | `false` | Use automatic color gradient based on progress |
| `showPercentage` | `boolean` | `false` | Show percentage text in center |
| `centerText` | `string` | `''` | Custom text to show in center (overrides percentage) |
| `animationDuration` | `number` | `300` | Animation duration in milliseconds |

## Examples

### Example 1: Basic Progress with Percentage

```html
<app-progress-ring
  [progress]="75"
  [size]="120"
  [strokeWidth]="12"
  [showPercentage]="true">
</app-progress-ring>
```

### Example 2: Custom Color

```html
<app-progress-ring
  [progress]="60"
  [size]="140"
  [color]="'#FF6B6B'"
  [showPercentage]="true">
</app-progress-ring>
```

### Example 3: Gradient Mode

```html
<app-progress-ring
  [progress]="85"
  [size]="160"
  [useGradient]="true"
  [showPercentage]="true">
</app-progress-ring>
```

The gradient automatically transitions:
- 0-50%: Yellow → Green
- 50-100%: Green → Blue

### Example 4: Custom Center Text

```html
<app-progress-ring
  [progress]="90"
  [size]="140"
  [centerText]="'Almost Done!'"
  [color]="'var(--ion-color-success)'">
</app-progress-ring>
```

### Example 5: Timer Display

```html
<app-progress-ring
  [progress]="timerProgress"
  [size]="180"
  [strokeWidth]="16"
  [useGradient]="true"
  [centerText]="formatTime(remainingSeconds)">
</app-progress-ring>
```

```typescript
export class TimerComponent {
  timerProgress: number = 0;
  remainingSeconds: number = 60;

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
```

### Example 6: Custom Center Content

```html
<app-progress-ring
  [progress]="100"
  [size]="140"
  [color]="'var(--ion-color-success)'">
  <div style="text-align: center;">
    <ion-icon name="checkmark-circle" style="font-size: 48px; color: var(--ion-color-success);"></ion-icon>
    <p style="margin: 0; font-size: 12px;">Complete!</p>
  </div>
</app-progress-ring>
```

### Example 7: Different Sizes

```html
<!-- Small -->
<app-progress-ring [progress]="60" [size]="60" [strokeWidth]="6"></app-progress-ring>

<!-- Medium -->
<app-progress-ring [progress]="60" [size]="120" [strokeWidth]="12"></app-progress-ring>

<!-- Large -->
<app-progress-ring [progress]="60" [size]="200" [strokeWidth]="16"></app-progress-ring>
```

### Example 8: Interactive Progress

```html
<app-progress-ring
  [progress]="userProgress"
  [size]="140"
  [useGradient]="true"
  [showPercentage]="true">
</app-progress-ring>

<ion-range
  [(ngModel)]="userProgress"
  [min]="0"
  [max]="100"
  [pin]="true">
</ion-range>
```

### Example 9: Journal/Inventory Completion Cards

This example shows how to create completion indicators like those in NephoPhone's step tool pages:

```html
<ion-card class="tool-card">
  <ion-card-content>
    <div class="tool-card-content">
      <div class="tool-info">
        <ion-icon name="journal-outline" class="tool-icon"></ion-icon>
        <div class="tool-text">
          <p class="tool-title">Journal</p>
          <p class="tool-subtitle">Personal reflections & entries</p>
        </div>
      </div>
      <div class="completion-indicator">
        <app-progress-ring
          [progress]="67"
          [size]="48"
          [strokeWidth]="5"
          [color]="'#3880ff'"
          [backgroundColor]="'#e0e0e0'">
          <div class="gauge-text">4/6</div>
        </app-progress-ring>
      </div>
    </div>
  </ion-card-content>
</ion-card>

<ion-card class="tool-card">
  <ion-card-content>
    <div class="tool-card-content">
      <div class="tool-info">
        <ion-icon name="list-outline" class="tool-icon"></ion-icon>
        <div class="tool-text">
          <p class="tool-title">Inventory</p>
          <p class="tool-subtitle">At least 10 entries suggested</p>
        </div>
      </div>
      <div class="completion-indicator">
        <app-progress-ring
          [progress]="80"
          [size]="48"
          [strokeWidth]="5"
          [color]="'#3880ff'"
          [backgroundColor]="'#e0e0e0'">
          <div class="gauge-text">8/10</div>
        </app-progress-ring>
      </div>
    </div>
  </ion-card-content>
</ion-card>
```

```scss
.tool-card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.tool-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.tool-icon {
  font-size: 32px;
  color: var(--ion-color-primary);
}

.tool-title {
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
}

.tool-subtitle {
  font-size: 12px;
  color: var(--ion-color-medium);
  margin: 0;
}

.gauge-text {
  font-size: 11px;
  font-weight: 600;
}
```

## Gradient Color Mapping

When `useGradient` is enabled, the ring color automatically changes based on progress:

| Progress | Color | Hex |
|----------|-------|-----|
| 0% | Yellow | `#FFC107` |
| 25% | Yellow-Green | Interpolated |
| 50% | Green | `#4CAF50` |
| 75% | Blue-Green | Interpolated |
| 100% | Blue | `#2196F3` |

## Styling Customization

The component uses CSS variables for easy customization:

```scss
// Override in your global styles or component
app-progress-ring {
  // Customize background opacity
  .progress-ring-background {
    opacity: 0.2;
  }
  
  // Customize animation
  .progress-ring-progress {
    transition: stroke-dashoffset 0.5s ease-in-out;
  }
  
  // Customize center text
  .center-text {
    font-size: 2rem;
    font-weight: 700;
    color: var(--ion-color-primary);
  }
}
```

## Use Cases

- **Progress Tracking**: File uploads, task completion, goal progress
- **Timers**: Countdown timers, meditation sessions, workout intervals
- **Loading States**: App initialization, data loading
- **Skill Levels**: User experience, skill proficiency, completion status
- **Health Metrics**: Steps, calories, water intake
- **Dashboards**: KPIs, metrics visualization
- **Gamification**: Achievement progress, level progression

## Performance Tips

1. **Avoid Frequent Updates**: For timers, update every 100ms instead of every frame
2. **Use OnPush Strategy**: If parent uses OnPush, the ring updates efficiently
3. **Debounce User Input**: When controlled by sliders, consider debouncing

```typescript
// Good: Update every 100ms
setInterval(() => {
  this.progress += 1;
}, 100);

// Bad: Update every frame (60fps)
// This can cause performance issues
```

## Accessibility

The component is purely visual. For accessibility:

```html
<div role="progressbar" 
     [attr.aria-valuenow]="progress" 
     aria-valuemin="0" 
     aria-valuemax="100">
  <app-progress-ring [progress]="progress"></app-progress-ring>
</div>
```

## Browser Compatibility

- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ iOS Safari (all versions)
- ✅ Android WebView (all versions)

The component uses standard SVG and CSS, ensuring broad compatibility.

## Dependencies

- `@angular/core`
- `@angular/common`

Note: This component does NOT require `@ionic/angular`, making it usable in any Angular project.

## License

This component is part of the UpStart Mobile Components library.

## Credits

Extracted and refactored from the NephoPhone meditation timer feature.

