# Gamification System

A comprehensive gamification system featuring tiered celebrations with coin animations, confetti effects, and haptic feedback. Perfect for rewarding user achievements in mobile apps.

## 🎯 Overview

This system provides a sophisticated way to celebrate user achievements with 4 distinct tiers of animations, each with unique visual effects and haptic feedback. The system includes:

- **4 Celebration Tiers**: Micro, Small, Medium, Major
- **Dynamic Coin Animations**: CSS-based 60fps animations
- **Confetti Effects**: 112 dynamic particles for major milestones
- **Haptic Feedback**: Device-specific tactile responses
- **Animation Queue**: Sequential processing prevents overlapping
- **Customizable Colors**: Each achievement has its own hex color

## 🏗️ Architecture

### Components
- **CoinAnimationComponent**: Global component that renders coin animations and confetti
- **CoinAnimationService**: Manages animation queue and coordinates with haptic service
- **HapticService**: Handles device haptic feedback

### Models
- **GamificationAchievement**: Achievement definition with tier, color, and metadata
- **CoinEarnedEvent**: Event emitted when a coin is awarded
- **HapticType**: Light, Medium, or Success haptic feedback

## 📦 Installation

### 1. Install Dependencies

```bash
npm install @capacitor/haptics
```

### 2. Copy Files

Copy the entire `gamification` folder to your `src/app` directory:

```
gamification/
├── components/
│   ├── coin-animation.component.ts
│   ├── coin-animation.component.html
│   └── coin-animation.component.scss
├── services/
│   ├── coin-animation.service.ts
│   └── haptic.service.ts
├── models/
│   └── gamification.types.ts
└── README.md
```

### 3. Add Global Component

Add the `CoinAnimationComponent` to your `app.component.ts`:

```typescript
import { CoinAnimationComponent } from './gamification/components/coin-animation.component';

@Component({
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, CoinAnimationComponent],
  // ...
})
export class AppComponent {}
```

Then add it to your `app.component.html`:

```html
<ion-app>
  <ion-router-outlet></ion-router-outlet>
  <app-coin-animation></app-coin-animation>
</ion-app>
```

## 🎮 Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { CoinAnimationService } from './gamification/services/coin-animation.service';
import { GamificationAchievement } from './gamification/models/gamification.types';

@Component({
  selector: 'app-example',
  template: `
    <ion-button (click)="celebrateAchievement()">
      Award Coin!
    </ion-button>
  `
})
export class ExampleComponent {
  constructor(private coinAnimationService: CoinAnimationService) {}

  celebrateAchievement() {
    const achievement: GamificationAchievement = {
      id: 1,
      triggerKey: 'task_completed',
      name: 'Task Complete',
      category: 'Daily Tasks',
      icon: '✅',
      description: 'Completed a task',
      celebrationTier: 'micro',
      hapticType: 'light',
      maxFrequency: 'unlimited',
      coinColor: '#4caf50',
      isActive: true
    };

    this.coinAnimationService.triggerAnimation(achievement);
  }
}
```

### Advanced Example: Different Tiers

```typescript
// Micro Win - Frequent, subtle rewards
const microWin: GamificationAchievement = {
  id: 1,
  triggerKey: 'journal_saved',
  name: 'Journal Saved',
  category: 'Daily Practice',
  icon: '📝',
  celebrationTier: 'micro',
  hapticType: 'light',
  coinColor: '#4caf50',
  // ...other fields
};

// Small Milestone - Daily consistency
const smallMilestone: GamificationAchievement = {
  id: 2,
  triggerKey: 'first_today',
  name: 'First of the Day',
  category: 'Daily Practice',
  icon: '🌅',
  celebrationTier: 'small',
  hapticType: 'medium',
  coinColor: '#66bb6a',
  // ...other fields
};

// Medium Milestone - Meaningful progress
const mediumMilestone: GamificationAchievement = {
  id: 3,
  triggerKey: 'milestone_reached',
  name: 'Milestone Reached',
  category: 'Progress',
  icon: '📋',
  celebrationTier: 'medium',
  hapticType: 'success',
  coinColor: '#9c27b0',
  // ...other fields
};

// Major Milestone - Significant achievements
const majorMilestone: GamificationAchievement = {
  id: 4,
  triggerKey: 'goal_completed',
  name: 'Goal Complete!',
  category: 'Major Achievement',
  icon: '🏆',
  celebrationTier: 'major',
  hapticType: 'success',
  coinColor: '#ffd700',
  // ...other fields
};

// Trigger animations
this.coinAnimationService.triggerAnimation(microWin);
this.coinAnimationService.triggerAnimation(smallMilestone);
this.coinAnimationService.triggerAnimation(mediumMilestone);
this.coinAnimationService.triggerAnimation(majorMilestone);
```

## 🎨 Celebration Tiers

### 🎯 Micro Win (Tier 1)
- **Animation**: Scale (1 → 1.12 → 1) + gentle glow
- **Haptic**: Light impact
- **Duration**: 3 seconds
- **Frequency**: Unlimited
- **Use Case**: Saving entries, adding notes, quick actions
- **Color Suggestion**: Green (#4caf50)

### 🔄 Small Milestone (Tier 2)
- **Animation**: Bounce + single flip (360°) + sparkles
- **Haptic**: Medium impact
- **Duration**: 3 seconds
- **Frequency**: Daily or milestone-based
- **Use Case**: First action of the day, 3-day streaks
- **Color Suggestion**: Light green (#66bb6a)

### ⚡ Medium Milestone (Tier 3)
- **Animation**: Bounce + double spin (720°) + streamers
- **Haptic**: Success notification
- **Duration**: 3.8 seconds
- **Frequency**: Per milestone
- **Use Case**: Completing sections, reaching targets
- **Color Suggestion**: Purple (#9c27b0)

### 🎉 Major Milestone (Tier 4)
- **Animation**: Bounce + triple spin (1080°) + **112-piece confetti explosion**
- **Haptic**: Success + notification
- **Duration**: 4.3 seconds + confetti linger (4s)
- **Frequency**: Per major event
- **Use Case**: Completing major goals, sobriety milestones, level ups
- **Color Suggestion**: Gold (#ffd700)

## 🎨 Color Schemes

Suggested color palettes for different achievement categories:

### Progress/Growth
- `#4caf50` (Green)
- `#66bb6a` (Light Green)
- `#81c784` (Lighter Green)
- `#a5d6a7` (Very Light Green)

### Important Work
- `#9c27b0` (Purple)
- `#8e24aa` (Dark Purple)
- `#7b1fa2` (Darker Purple)
- `#6a1b9a` (Darkest Purple)

### Special Events
- `#ffd700` (Gold)
- `#ffb300` (Amber)
- `#ff8f00` (Dark Amber)

### Engagement
- `#1976d2` (Blue)
- `#2196f3` (Light Blue)
- `#42a5f5` (Lighter Blue)

## 🎭 API Reference

### CoinAnimationService

#### Methods

##### `triggerAnimation(achievement: GamificationAchievement): void`
Triggers a coin animation for the given achievement. Animations are queued and played sequentially.

```typescript
this.coinAnimationService.triggerAnimation(achievement);
```

##### `clearQueue(): void`
Clears all pending animations in the queue.

```typescript
this.coinAnimationService.clearQueue();
```

##### `getQueueLength(): number`
Returns the current number of animations in the queue.

```typescript
const queueLength = this.coinAnimationService.getQueueLength();
```

##### `isCurrentlyAnimating(): boolean`
Returns true if an animation is currently playing.

```typescript
const isAnimating = this.coinAnimationService.isCurrentlyAnimating();
```

### HapticService

#### Methods

##### `triggerHaptic(hapticType: HapticType): Promise<void>`
Triggers haptic feedback. Types: `'light'`, `'medium'`, `'success'`.

```typescript
await this.hapticService.triggerHaptic('light');
await this.hapticService.triggerHaptic('medium');
await this.hapticService.triggerHaptic('success');
```

##### `testAllHaptics(): Promise<void>`
Tests all haptic types sequentially (for debugging).

```typescript
await this.hapticService.testAllHaptics();
```

##### `isSupported(): boolean`
Returns true if haptics are supported on the current platform.

```typescript
const supported = this.hapticService.isSupported();
```

### GamificationAchievement Interface

```typescript
interface GamificationAchievement {
  id: number;                                   // Unique identifier
  triggerKey: string;                            // Unique trigger key
  name: string;                                  // Display name
  category: string;                              // Category (e.g., 'Daily Practice')
  icon: string;                                  // Emoji icon
  description: string;                           // Description
  celebrationTier: 'micro' | 'small' | 'medium' | 'major';  // Animation tier
  hapticType: 'light' | 'medium' | 'success';   // Haptic feedback type
  maxFrequency: 'unlimited' | 'daily' | 'once' | 'milestone'; // Award frequency
  coinColor: string;                             // Hex color code
  isActive: boolean;                             // Whether achievement is active
}
```

## 🔧 Customization

### Custom Colors

```typescript
const customAchievement: GamificationAchievement = {
  // ...other fields
  coinColor: '#ff6b6b', // Your custom hex color
};
```

### Custom Animation Duration

Modify the durations in `coin-animation.service.ts`:

```typescript
private getAnimationDuration(tier: 'micro' | 'small' | 'medium' | 'major'): number {
  const durations: { [key: string]: number } = {
    'micro': 3000,    // 3 seconds
    'small': 3000,    // 3 seconds
    'medium': 3800,   // 3.8 seconds
    'major': 4300     // 4.3 seconds
  };
  return durations[tier] || 3000;
}
```

### Custom Confetti Colors

Modify the colors in `coin-animation.component.ts`:

```typescript
private generateConfetti() {
  const colors = [
    '#ff6b6b',  // Red
    '#4ecdc4',  // Teal
    '#45b7d1',  // Blue
    '#96ceb4',  // Green
    '#feca57',  // Yellow
    '#ff9ff3',  // Pink
    '#54a0ff'   // Light Blue
  ];
  // ...
}
```

### Disable Haptics

To disable haptic feedback, simply don't inject `HapticService` or set it to null:

```typescript
// In coin-animation.service.ts
constructor() {} // Remove hapticService injection
```

## 📱 Platform Support

- **iOS**: Full support (animations + haptics)
- **Android**: Full support (animations + haptics)
- **Web**: Partial support (animations only, no haptics)

The system gracefully degrades on web platforms, showing animations without haptic feedback.

## 🎯 Best Practices

1. **Tier Selection**
   - Use **Micro** for frequent actions (e.g., saving, submitting)
   - Use **Small** for daily milestones (e.g., first action of the day)
   - Use **Medium** for significant progress (e.g., completing sections)
   - Use **Major** for life-changing achievements (e.g., major goals)

2. **Color Consistency**
   - Use consistent colors for related achievements
   - Match colors to your app's theme
   - Use gold/special colors for rare achievements

3. **Frequency Control**
   - Set `maxFrequency: 'unlimited'` for micro wins
   - Set `maxFrequency: 'daily'` for daily milestones
   - Set `maxFrequency: 'once'` for one-time achievements
   - Set `maxFrequency: 'milestone'` for progress-based rewards

4. **Performance**
   - Animations use CSS keyframes for 60fps performance
   - Queue system prevents overlapping animations
   - Minimal DOM manipulation ensures smooth experience

## 🐛 Troubleshooting

### Animations Not Showing

1. Ensure `CoinAnimationComponent` is imported in `app.component.ts`
2. Ensure `<app-coin-animation>` is in `app.component.html`
3. Check console for errors
4. Verify achievement object is valid

### Haptics Not Working

1. Verify you're on a native platform (iOS/Android)
2. Check that `@capacitor/haptics` is installed
3. Ensure device has haptic capabilities
4. Check console for haptic errors

### Confetti Not Appearing

1. Confetti only appears for `celebrationTier: 'major'`
2. Check z-index conflicts in your CSS
3. Verify confetti overlay is not being hidden

## 📄 License

This component is part of the UpStart Mobile Components library. Free to use in your projects with attribution.

## 🙏 Credits

Originally developed for NephoPhone recovery app, extracted and generalized for broader use.


