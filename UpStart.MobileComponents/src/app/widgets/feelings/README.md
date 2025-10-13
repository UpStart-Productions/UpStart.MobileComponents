# Feelings Widget

A beautiful, reusable emoji-based feelings selector component with smooth animations and multiple configuration options.

![Feelings Widget Demo](https://via.placeholder.com/600x200?text=Feelings+Widget+Demo)

## Features

✅ **12 Emotions** - Organized into 3 categories (Calm, Neutral, Distressed)  
✅ **Smooth Animations** - Beautiful horizontal scroll with selection effects  
✅ **Two Modes** - Normal mode with full features, or emoji-only for forms  
✅ **Text Input** - Optional note/reason input with selected emotion  
✅ **Action Links** - Configurable action buttons for extended functionality  
✅ **Event Emitters** - Full event system for integration  
✅ **Zero Dependencies** - No database or external services required  
✅ **Standalone Component** - Modern Angular architecture  
✅ **Fully Typed** - Complete TypeScript interfaces  

---

## Installation

### Copy Files

Copy the `feelings/` folder to your project:

```
src/app/your-feature/widgets/feelings/
├── feelings.component.ts
├── feelings.component.html
└── feelings.component.scss
```

### Import Component

```typescript
import { FeelingsComponent, FeelingOption } from './widgets/feelings/feelings.component';

@Component({
  imports: [FeelingsComponent]
})
export class MyPage {}
```

---

## Usage

### Example 1: Full Featured (Normal Mode)

```html
<app-feelings
  (feelingSelected)="onFeelingSelected($event)"
  (noteSubmitted)="onNoteSubmitted($event)"
  (actionClicked)="onActionClicked($event)"
  (feelingCleared)="onFeelingCleared()"
></app-feelings>
```

```typescript
export class MyPage {
  onFeelingSelected(feeling: FeelingOption) {
    console.log('Selected:', feeling.emoji, feeling.label);
  }

  onNoteSubmitted(data: {feeling: FeelingOption, note: string}) {
    console.log('Note:', data.note);
  }

  onActionClicked(action: 'spotcheck' | 'journal') {
    // Handle action clicks
    if (action === 'journal') {
      this.openJournal();
    }
  }

  onFeelingCleared() {
    console.log('Feeling was cleared');
  }
}
```

### Example 2: Emoji-Only Mode (Form Control)

Perfect for use in forms where you just need emotion selection:

```html
<ion-label position="stacked">How are you feeling?</ion-label>
<app-feelings
  [emojiOnly]="true"
  (feelingSelected)="onFeelingSelected($event)"
></app-feelings>
```

### Example 3: Custom Configuration

```html
<app-feelings
  [showTextInput]="false"
  [showActions]="false"
  [noMargin]="true"
  (feelingSelected)="onFeelingSelected($event)"
></app-feelings>
```

---

## API Reference

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `emojiOnly` | `boolean` | `false` | When true, only shows emoji selection (no text input or actions) |
| `noMargin` | `boolean` | `false` | Removes card margin for better form integration |
| `showTextInput` | `boolean` | `true` | Show/hide the text input field in normal mode |
| `showActions` | `boolean` | `true` | Show/hide the action links (Spot Check/Journal) |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `feelingSelected` | `FeelingOption` | Emitted when a feeling is selected |
| `noteSubmitted` | `{feeling: FeelingOption, note: string}` | Emitted when user submits a note |
| `actionClicked` | `'spotcheck' \| 'journal'` | Emitted when action link is clicked |
| `feelingCleared` | `void` | Emitted when feeling is cleared |

### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `setSelectedFeeling` | `feeling: FeelingOption \| null` | `void` | Programmatically set a feeling |
| `getSelectedFeeling` | none | `FeelingOption \| null` | Get the currently selected feeling |
| `getSelectedFeelingLabel` | none | `string` | Get the selected feeling label |
| `clearSelection` | none | `void` | Clear the current selection |

### Interfaces

```typescript
export interface FeelingOption {
  emoji: string;
  label: string;
  category: 'calm' | 'neutral' | 'distressed';
  value: number;
}
```

---

## Feeling Options

### Calm Category (Values 1-4)

- 😊 Happy
- 😌 Peaceful
- 🙂 Content
- 💪 Strong

### Neutral Category (Values 5-8)

- 😐 Neutral
- 🤔 Thoughtful
- 😶‍🌫️ Confused
- 🥱 Tired

### Distressed Category (Values 9-12)

- 😠 Frustrated
- 😢 Sad
- 😤 Stressed
- 😞 Disappointed

---

## Styling

### CSS Variables

The component uses Ionic CSS variables for theming:

```scss
--ion-color-primary    // Selection color
--ion-color-light      // Button background
--ion-color-medium     // Text/icon colors
--ion-color-dark       // Text color
```

### Custom Styling

To customize the appearance, you can override the component styles:

```scss
app-feelings {
  ion-card {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .emoji-button {
    width: 60px;
    height: 60px;
    font-size: 3rem;
  }

  .emoji-button.selected {
    background-color: #your-color !important;
  }
}
```

---

## Behavior

### Selection Flow

1. **User taps emoji** → `feelingSelected` event emitted
2. **Emoji container slides out** → Text input slides in
3. **User types note** → Can submit with checkmark or Enter key
4. **User submits** → `noteSubmitted` event emitted, toast shown
5. **Selection cleared** → Emoji container slides back in

### Emoji-Only Mode

When `emojiOnly` is true:
- No text input overlay
- No action links
- Just emoji selection
- Perfect for forms

---

## Examples

### Use in a Form

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeelingsComponent, FeelingOption } from './widgets/feelings/feelings.component';

@Component({
  template: `
    <form [formGroup]="form">
      <ion-label>How do you feel?</ion-label>
      <app-feelings
        [emojiOnly]="true"
        (feelingSelected)="onFeelingSelected($event)"
      ></app-feelings>
    </form>
  `,
  imports: [FeelingsComponent]
})
export class MyForm {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      feeling: [null]
    });
  }

  onFeelingSelected(feeling: FeelingOption) {
    this.form.patchValue({ feeling: feeling.value });
  }
}
```

### Save to Database

```typescript
onNoteSubmitted(data: {feeling: FeelingOption, note: string}) {
  const entry = {
    emoji: data.feeling.emoji,
    label: data.feeling.label,
    category: data.feeling.category,
    note: data.note,
    timestamp: new Date()
  };
  
  // Save to your database
  this.myService.saveFeelingEntry(entry);
}
```

### Programmatic Selection

```typescript
import { Component, ViewChild } from '@angular/core';
import { FeelingsComponent, FeelingOption } from './widgets/feelings/feelings.component';

export class MyPage {
  @ViewChild(FeelingsComponent) feelingsWidget!: FeelingsComponent;

  loadSavedFeeling() {
    const savedFeeling: FeelingOption = {
      emoji: '😊',
      label: 'Happy',
      category: 'calm',
      value: 1
    };
    
    this.feelingsWidget.setSelectedFeeling(savedFeeling);
  }

  checkCurrentFeeling() {
    const current = this.feelingsWidget.getSelectedFeeling();
    console.log('Current feeling:', current);
  }
}
```

---

## Accessibility

- ✅ Proper button semantics
- ✅ Keyboard navigation support
- ✅ ARIA labels for screen readers
- ✅ High contrast mode compatible
- ✅ Touch-friendly 50px tap targets

---

## Browser Support

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Basic functionality | ✅ | ✅ | ✅ | ✅ |
| Smooth scrolling | ✅ | ✅ | ✅ | ✅ |
| Animations | ✅ | ✅ | ✅ | ✅ |
| Emoji rendering | ✅ | ✅ | ✅ | ✅ |

---

## Performance

- **Lightweight**: ~10KB (component + styles)
- **No dependencies**: Uses only Ionic and Angular
- **Smooth**: 60fps animations
- **Fast**: Instant emoji selection

---

## Customization Ideas

### Add More Emotions

```typescript
feelings: FeelingOption[] = [
  ...this.feelings, // Existing emotions
  { emoji: '🤗', label: 'Grateful', category: 'calm', value: 13 },
  { emoji: '😴', label: 'Sleepy', category: 'neutral', value: 14 },
  { emoji: '😰', label: 'Anxious', category: 'distressed', value: 15 }
];
```

### Custom Action Links

Modify the action links text in the HTML template:

```html
<ion-button (click)="onActionClick('custom', $event)">
  Custom Action
</ion-button>
```

### Different Categories

Change the category names or add new ones:

```typescript
category: 'positive' | 'neutral' | 'negative' | 'mixed'
```

---

## Troubleshooting

### Emojis not showing

**Problem:** Emojis appear as boxes or question marks.

**Solution:** Ensure your app includes emoji font support. Most modern browsers/devices support emojis natively.

### Animations not smooth

**Problem:** Sliding animations are choppy.

**Solution:** Check device performance. Animations use CSS transforms which are GPU-accelerated.

### Events not firing

**Problem:** `feelingSelected` event doesn't fire.

**Solution:** Ensure you're using the correct event binding syntax: `(feelingSelected)="handler($event)"`

---

## License

This widget is extracted from production mobile apps and provided as-is for educational and development purposes.

---

## Version

**Version:** 1.0.0  
**Last Updated:** 2025-01-09  
**Angular Version:** 20.x  
**Ionic Version:** 8.x  

---

## Credits

Extracted and refactored from NephoPhone mobile application. Designed to be reusable across any Ionic/Angular project.

