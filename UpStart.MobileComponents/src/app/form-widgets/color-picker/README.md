# Color Picker Widget

An animated expandable color selector with smooth sliding animations. Click to expand all colors horizontally, select one, and it automatically collapses. Perfect for form inputs where users need to pick from a predefined color palette.

## ✨ Features

- ✅ **Smooth Staggered Animation** - Colors slide out with progressive delays
- ✅ **Auto-collapse** - Automatically closes after color selection
- ✅ **Visual Selection Indicator** - Border ring around selected color
- ✅ **Label Fade Animation** - Label fades in/out during transitions
- ✅ **Configurable Color Palette** - Pass any subset of 9 available colors
- ✅ **Event Emission** - Emits color selection and dirty state for forms
- ✅ **Overlapping Layout** - Space-efficient circular button design
- ✅ **Touch-friendly** - 26px buttons with proper spacing

## 🎨 Available Colors

```typescript
// All 9 available colors
'prussian-blue'   // #003049
'blue-ribbon'     // #0370f8
'picton-blue'     // #52c0f6
'emerald'         // #32c058
'red-orange'      // #fe4c40
'magenta'         // #fd13eb
'purple-heart'    // #4f2cc2
'amethyst'        // #a44ad3
'sunshade'        // #fe8b25
```

## 📦 Dependencies

No external dependencies! Uses only:
- `@angular/common` - CommonModule
- `@angular/core` - Component decorators
- **CSS Variables** - Requires color definitions (see Installation)

## 🚀 Installation

### 1. Copy Component Files

```
src/app/form-widgets/color-picker/
├── color-picker.component.ts
├── color-picker.component.html
└── color-picker.component.scss
```

### 2. Add Color CSS Variables

Add these to your `src/theme/colors.scss` or main styles file:

```scss
:root {
  // Color picker colors
  --ion-color-prussian-blue: #003049;
  --ion-color-blue-ribbon: #0370f8;
  --ion-color-picton-blue: #52c0f6;
  --ion-color-emerald: #32c058;
  --ion-color-red-orange: #fe4c40;
  --ion-color-magenta: #fd13eb;
  --ion-color-purple-heart: #4f2cc2;
  --ion-color-amethyst: #a44ad3;
  --ion-color-sunshade: #fe8b25;
}

// Background classes
.background-prussian-blue { background-color: var(--ion-color-prussian-blue); }
.background-blue-ribbon { background-color: var(--ion-color-blue-ribbon); }
.background-picton-blue { background-color: var(--ion-color-picton-blue); }
.background-emerald { background-color: var(--ion-color-emerald); }
.background-red-orange { background-color: var(--ion-color-red-orange); }
.background-magenta { background-color: var(--ion-color-magenta); }
.background-purple-heart { background-color: var(--ion-color-purple-heart); }
.background-amethyst { background-color: var(--ion-color-amethyst); }
.background-sunshade { background-color: var(--ion-color-sunshade); }

// Border classes
.border-prussian-blue { border-color: var(--ion-color-prussian-blue) !important; }
.border-blue-ribbon { border-color: var(--ion-color-blue-ribbon) !important; }
.border-picton-blue { border-color: var(--ion-color-picton-blue) !important; }
.border-emerald { border-color: var(--ion-color-emerald) !important; }
.border-red-orange { border-color: var(--ion-color-red-orange) !important; }
.border-magenta { border-color: var(--ion-color-magenta) !important; }
.border-purple-heart { border-color: var(--ion-color-purple-heart) !important; }
.border-amethyst { border-color: var(--ion-color-amethyst) !important; }
.border-sunshade { border-color: var(--ion-color-sunshade) !important; }
```

### 3. Import Component

```typescript
import { ColorPickerComponent } from './path/to/color-picker.component';

@Component({
  // ...
  imports: [ColorPickerComponent]
})
```

## 💻 Usage

### Basic Usage

```html
<app-color-picker
  [config]="colorConfig"
  label="Select color"
  [selectedColor]="mySelectedColor"
  (colorSelectedEvent)="handleColorSelection($event)">
</app-color-picker>
```

```typescript
export class MyComponent {
  colorConfig = [
    { color: 'prussian-blue' },
    { color: 'emerald' },
    { color: 'red-orange' },
    { color: 'magenta' }
  ];
  
  mySelectedColor: string = 'prussian-blue';

  handleColorSelection(color: string) {
    this.mySelectedColor = color;
    console.log('Selected color:', color);
  }
}
```

### With Form Dirty State

```html
<app-color-picker
  [config]="colorConfig"
  label="Exercise color"
  [selectedColor]="exerciseColor"
  (colorSelectedEvent)="onColorChange($event)"
  (dirtyControlEvent)="onFormDirty($event)">
</app-color-picker>
```

```typescript
onColorChange(color: string) {
  this.exerciseColor = color;
}

onFormDirty(isDirty: boolean) {
  this.formDirty = isDirty;
  // Enable save button, etc.
}
```

### Full Color Palette

```typescript
// Use all 9 colors
colorConfigFull = [
  { color: 'prussian-blue' },
  { color: 'blue-ribbon' },
  { color: 'picton-blue' },
  { color: 'emerald' },
  { color: 'red-orange' },
  { color: 'magenta' },
  { color: 'purple-heart' },
  { color: 'amethyst' },
  { color: 'sunshade' }
];
```

### Limited Palette

```typescript
// Blues only
colorConfigBlues = [
  { color: 'prussian-blue' },
  { color: 'blue-ribbon' },
  { color: 'picton-blue' }
];

// Warm colors
colorConfigWarm = [
  { color: 'red-orange' },
  { color: 'magenta' },
  { color: 'sunshade' }
];
```

## 🎨 Customization

### Component API

**Inputs:**
- `@Input() config: any[]` - Array of color objects `[{ color: 'emerald' }]`
- `@Input() label: string` - Label text (default: 'Pick a color')
- `@Input() selectedColor: string` - Currently selected color name

**Outputs:**
- `@Output() colorSelectedEvent` - Emits selected color string
- `@Output() dirtyControlEvent` - Emits `true` when user interacts

### Animation Customization

The SCSS uses a `@for` loop to generate staggered animations. Modify in `color-picker.component.scss`:

```scss
// Change animation duration (default 0.2s)
button.open:nth-child(#{$i}) {
  animation: move#{$i} .3s linear 0s;  // Slower
}

// Change spacing between buttons (default -26px overlap, 39px offset)
$animationIncrement: $animationIncrement - 45px;  // More spacing
```

### Container Styling

```scss
app-color-picker {
  .control-container {
    background-color: #f5f5f5;  // Custom background
    border: 2px solid #333;     // Thicker border
    border-radius: 15px;        // More rounded
  }
}
```

### Button Size

```scss
app-color-picker {
  .btn-color-picker {
    width: 32px;   // Larger buttons
    height: 32px;
  }
}
```

## 🎯 Use Cases

1. **Exercise Apps** - Pick category or exercise colors
2. **Task Managers** - Assign colors to projects or tags
3. **Calendar Apps** - Event color selection
4. **Note-taking Apps** - Highlight colors
5. **Settings Pages** - Theme color customization
6. **Dashboard Builders** - Widget color selection
7. **Forms** - Any input requiring color selection

## 🔧 Best Practices

1. **Limit Colors**: Don't use more than 9 colors for best UX
2. **Semantic Colors**: Choose colors that make sense for your context
3. **Default Selection**: Always provide a `selectedColor` default
4. **Consistent Palette**: Use same palette across your app
5. **Accessibility**: Ensure color choices meet WCAG contrast requirements
6. **Form Integration**: Use `dirtyControlEvent` to track form changes

## 🐛 Troubleshooting

### Colors not displaying
- Verify color CSS variables are defined in your global styles
- Check that `.background-{color}` classes are available
- Ensure color names match exactly (use hyphens, not spaces)

### Animation not working
- Component uses SCSS `@for` loops - ensure SCSS compilation is working
- Check browser DevTools for animation warnings
- Verify `animation-fill-mode: forwards` is preserved

### Selected indicator not showing
- Verify `.border-{color}` classes are defined
- Check z-index is being applied to selected button
- Ensure `selectedColor` input matches a color in config

### Buttons overlapping incorrectly
- Check `margin-left: -26px` on `button:nth-child(1n+2)`
- Verify button width is 26px
- Ensure animation increment calculation is correct

## 📝 Technical Notes

### Animation System

Uses SCSS `@for` loop to generate keyframes for positions 2-9:
- **Position 1**: Stays in place (reference point)
- **Positions 2-9**: Slide left by increments of 39px
- **Auto-reverse**: Closing animation automatically generated

### Event Flow

1. User clicks container → `toggleOpenClose()`
2. State changes to 'open' → Buttons animate out
3. User clicks color → `selectColor(color, event)`
4. Event propagation stopped → Prevents double-toggle
5. State changes to 'closed' → Buttons animate back
6. Events emitted → Parent component receives updates

## 📝 Source

Extracted from **SuperSimpleWorkout** app by Jeff Denton.

**Original Use Case**: Exercise color selection for visual categorization in workout tracking.

## 🔗 Related Components

- **Weekday Picker** - Day of week selection widget
- **Icon Picker** (future) - Icon selection with similar animation
- **Avatar Picker** - Profile image selection

---

**Version**: 1.0.0  
**Last Updated**: October 17, 2025  
**License**: MIT

