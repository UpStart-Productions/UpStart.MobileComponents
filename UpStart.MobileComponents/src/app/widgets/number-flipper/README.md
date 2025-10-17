# Number Flipper Widget

A smooth animated number display with digit-by-digit flip animations. Each digit transitions independently with elegant easing, perfect for counters, statistics displays, and any dynamic numeric values.

## ✨ Features

- ✅ **Smooth Digit Animation** - Each digit flips with 0.8s ease transition
- ✅ **Auto K Formatting** - Numbers over 1000 automatically round to K notation
- ✅ **Configurable Size** - Adjust digit height via input property
- ✅ **Real-time Updates** - Responds instantly to value changes
- ✅ **Lightweight** - No external dependencies beyond Angular
- ✅ **Self-contained** - Inline template and styles
- ✅ **Performance** - Uses trackBy for efficient re-rendering
- ✅ **Responsive** - Adapts to any container size

## 📦 Dependencies

No external dependencies! Uses only:
- `@angular/common` - CommonModule
- `@angular/core` - Component decorators

## 🚀 Installation

### 1. Copy Component File

```
src/app/widgets/number-flipper/
└── number-flipper.component.ts
```

### 2. Import Component

```typescript
import { NumberFlipperComponent } from './path/to/number-flipper.component';

@Component({
  // ...
  imports: [NumberFlipperComponent]
})
```

## 💻 Usage

### Basic Usage

```html
<app-number-flipper [number]="myNumber"></app-number-flipper>
```

```typescript
export class MyComponent {
  myNumber: number = 42;
}
```

### With Custom Size

```html
<app-number-flipper 
  [number]="largeNumber" 
  [digitHeight]="60">
</app-number-flipper>
```

### With Suffix Label

```html
<div style="display: flex; align-items: baseline;">
  <app-number-flipper [number]="score"></app-number-flipper>
  <span style="margin-left: 8px; font-size: 1.5rem;">pts</span>
</div>
```

### Real-time Counter

```typescript
export class CounterComponent {
  counter: number = 0;
  intervalId: any;

  startCounter() {
    this.intervalId = setInterval(() => {
      this.counter++;
    }, 100);
  }

  stopCounter() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy() {
    this.stopCounter();
  }
}
```

```html
<app-number-flipper [number]="counter"></app-number-flipper>
<button (click)="startCounter()">Start</button>
<button (click)="stopCounter()">Stop</button>
```

## 🎨 Customization

### Component API

**Inputs:**
- `@Input() number: number` - The number to display (default: 0)
- `@Input() digitHeight: number` - Height of each digit in pixels (default: 40)

**Auto-formatting:**
- Numbers > 1000 automatically divide by 1000 and round
- Display 1500 as "2K", 5432 as "5K", etc.

### Styling

The component uses inline styles but you can override them:

```scss
app-number-flipper {
  .number-flipper {
    font-size: 3rem;  // Larger font
    font-weight: 700;  // Bolder
    color: #ff6b6b;   // Custom color
  }
}
```

### Centering in Container

```html
<div style="display: flex; justify-content: center; align-items: center; min-height: 100px;">
  <app-number-flipper [number]="value"></app-number-flipper>
</div>
```

### Custom Background

```html
<div style="background-color: #f0f0f0; padding: 20px; border-radius: 12px;">
  <app-number-flipper [number]="value"></app-number-flipper>
</div>
```

## 🎯 Use Cases

1. **Dashboards** - Display KPIs, metrics, statistics
2. **Game Scores** - Real-time score updates
3. **Counters** - Page views, downloads, users online
4. **Timers** - Countdown or count-up displays
5. **Progress Tracking** - Steps taken, calories burned
6. **Financial Apps** - Account balances, transaction amounts
7. **Analytics** - Chart totals, data point values
8. **E-commerce** - Cart totals, inventory counts

## 🔧 Best Practices

1. **Update Frequency**: Don't update more than 60fps for smooth animations
2. **Large Numbers**: Let auto-formatting handle numbers > 1000
3. **Digit Height**: Keep between 20-100px for optimal readability
4. **Container Size**: Ensure parent container can accommodate digit changes
5. **Memory Management**: Clear intervals/timeouts in ngOnDestroy

## 💡 Advanced Examples

### With Increment/Decrement Buttons

```html
<div class="counter-container">
  <button (click)="decrement()">-</button>
  <app-number-flipper [number]="count"></app-number-flipper>
  <button (click)="increment()">+</button>
</div>
```

```scss
.counter-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  
  button {
    width: 44px;
    height: 44px;
    font-size: 24px;
  }
}
```

### Animated Value Changes

```typescript
animateToValue(targetValue: number) {
  const start = this.currentValue;
  const diff = targetValue - start;
  const duration = 1000; // 1 second
  const steps = 50;
  const increment = diff / steps;
  let step = 0;

  const interval = setInterval(() => {
    step++;
    this.currentValue = Math.round(start + (increment * step));
    
    if (step >= steps) {
      this.currentValue = targetValue;
      clearInterval(interval);
    }
  }, duration / steps);
}
```

### Multiple Digits with Different Heights

```html
<div style="display: flex; gap: 4px;">
  <app-number-flipper [number]="hours" [digitHeight]="50"></app-number-flipper>
  <span>:</span>
  <app-number-flipper [number]="minutes" [digitHeight]="50"></app-number-flipper>
  <span>:</span>
  <app-number-flipper [number]="seconds" [digitHeight]="50"></app-number-flipper>
</div>
```

## 🐛 Troubleshooting

### Animation Not Smooth

- Reduce update frequency if updating too fast
- Ensure parent container has fixed dimensions
- Check that transform CSS is not being overridden

### Numbers Not Formatting

- Verify input is a number type, not string
- Check that number is actually > 1000 for K formatting
- Ensure ngOnChanges is triggering (check change detection)

### Digits Overflowing Container

- Set `digitHeight` to smaller value
- Ensure container has `overflow: hidden` if needed
- Use flexbox centering for better layout

### Performance Issues

- Use OnPush change detection strategy
- Limit update frequency for real-time counters
- Ensure trackByFn is working correctly

## 📝 Technical Details

### How It Works

1. **Input Processing**: Number is converted to array of digits
2. **Digit Rendering**: Each digit gets its own column with 0-9 stack
3. **Animation**: `translateY` moves the digit stack to show correct number
4. **Auto-formatting**: Numbers > 1000 are divided and rounded

### Animation Mechanics

```typescript
// For digit "7", transform moves stack to show 7th position
transform: translateY(-280px)  // -7 × 40px
```

### Memory Efficiency

- Uses `trackBy` to avoid unnecessary re-renders
- Digits array only updates when number changes
- Inline styles are computed once per change

## 📝 Source

Extracted from **SuperSimpleWorkout** app by Jeff Denton.

**Original Use Case**: Display exercise totals in the progress chart - weight lifted, volume, distance, duration. Numbers update in real-time as user drags the chart's axis pointer.

## 🔗 Related Components

- **Progress Line Chart** - Uses NumberFlipper for chart totals
- **Metric Switcher** - Combines NumberFlipper with metric selection
- **Progress Ring** (future) - Circular progress with NumberFlipper center

---

**Version**: 1.0.0  
**Last Updated**: October 17, 2025  
**License**: MIT

