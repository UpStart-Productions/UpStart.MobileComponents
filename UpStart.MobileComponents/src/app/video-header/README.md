# Video Header Component

A beautiful fullscreen video header with scroll-triggered transitions, inspired by modern iOS apps. Features transparent-to-opaque header animation, status bar integration, and dynamic video backgrounds that extend into the iOS safe area.

## Features

- ✅ **Fullscreen Video Background** - Looping video that extends into iOS safe area
- ✅ **Scroll-Triggered Header** - Transparent header smoothly fades to white on scroll
- ✅ **Status Bar Integration** - Automatically switches between dark/light icons
- ✅ **Dynamic Height Calculation** - Video height adjusts to content
- ✅ **Random Video Selection** - Picks from multiple video backgrounds
- ✅ **Time-Based Greeting** - Changes greeting based on time of day
- ✅ **Smooth Transitions** - 0.6s easing for professional feel

## Usage

### Basic Implementation

```typescript
import { VideoHeaderDemoPage } from './video-header/video-header-demo.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('content') content!: any;
  @ViewChild('video') videoElement!: any;
  
  isScrolled: boolean = false;
  selectedVideo: string = '';
  videoHeight: number = 400;
  
  ngAfterViewInit() {
    // Set up scroll listener
    if (this.content) {
      this.content.getScrollElement().then((scrollElement: any) => {
        scrollElement.addEventListener('scroll', (event: any) => {
          this.onScroll(event);
        });
      });
    }
    
    // Calculate video height
    setTimeout(() => this.calculateVideoHeight(), 100);
  }
  
  async onScroll(event: any) {
    const scrollTop = event.target.scrollTop || 0;
    const wasScrolled = this.isScrolled;
    this.isScrolled = scrollTop > 5;
    
    // Update status bar
    if (wasScrolled !== this.isScrolled && this.platform.is('capacitor')) {
      await StatusBar.setStyle({ 
        style: this.isScrolled ? Style.Light : Style.Dark 
      });
    }
  }
  
  calculateVideoHeight() {
    const cardElement = document.querySelector('.hero-card');
    if (cardElement) {
      const cardHeight = cardElement.getBoundingClientRect().height;
      const safeAreaTop = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--ion-safe-area-top') || '0'
      );
      this.videoHeight = cardHeight + safeAreaTop + 38;
    }
  }
}
```

### HTML Template

```html
<ion-header class="transparent-header" [class.scrolled]="isScrolled">
  <ion-toolbar class="transparent-toolbar">
    <div class="header-container">
      <div class="avatar-container">
        <ion-icon name="person-circle-outline"></ion-icon>
      </div>
      <div class="greeting-title">Good morning, Friend!</div>
      <div class="settings-container">
        <ion-button fill="clear">
          <ion-icon name="settings-outline"></ion-icon>
        </ion-button>
      </div>
    </div>
  </ion-toolbar>
</ion-header>

<ion-content #content fullscreen>
  <!-- Video Background -->
  <video
    #video
    class="video-background"
    autoplay
    muted
    loop
    playsinline
    [src]="selectedVideo"
    [style.height.px]="videoHeight"
  ></video>
  
  <!-- Video Overlay -->
  <div class="video-overlay" [style.height.px]="videoHeight"></div>
  
  <!-- Your Content -->
  <ion-card class="hero-card extend-top">
    <!-- Card content here -->
  </ion-card>
</ion-content>
```

## Key CSS Classes

### `.transparent-header`
The main header that transitions from transparent to white:
```scss
.transparent-header {
  --background: transparent !important;
  transition: all 0.6s ease;
  z-index: 10;
  
  &.scrolled {
    --background: rgba(255, 255, 255, 0.95) !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
    backdrop-filter: blur(10px);
  }
}
```

### `.video-background`
Fullscreen video that covers the top area:
```scss
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  object-fit: cover;
  z-index: 0;
}
```

### `.video-overlay`
Semi-transparent overlay for better text readability:
```scss
.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
}
```

### `.hero-card`
Content card that overlays the video:
```scss
.hero-card {
  background: transparent;
  color: white;
  position: relative;
  top: calc(-1 * var(--ion-safe-area-top, 0px));
  z-index: 2;
}
```

## Z-Index Layering

The component uses careful z-index layering for proper stacking:

```
10 - Header (transparent-header)
2  - Hero Card Content (hero-card)
1  - Video Overlay (video-overlay)
0  - Video Background (video-background)
```

## Status Bar Integration

The component integrates with Capacitor's Status Bar plugin:

```typescript
import { StatusBar, Style } from '@capacitor/status-bar';

// On video background (transparent header)
await StatusBar.setStyle({ style: Style.Dark }); // White icons

// On white background (scrolled header)
await StatusBar.setStyle({ style: Style.Light }); // Dark icons
```

### Lifecycle Hooks

```typescript
async ionViewWillEnter() {
  // Set dark style for video background
  await StatusBar.setStyle({ style: Style.Dark });
}

async ionViewWillLeave() {
  // Reset to light style when leaving
  await StatusBar.setStyle({ style: Style.Light });
}
```

## Video Files

### Setup Video Assets

You'll need to add video files to your `src/assets/videos/` directory. Recommended formats:

- **iOS**: `.mov` (H.264 codec)
- **Android**: `.mp4` (H.264 codec)
- **Web**: `.webm` or `.mp4`

### Example Video Array

```typescript
availableVideos: string[] = [
  'assets/videos/water-1.mov',
  'assets/videos/nature-1.mov',
  'assets/videos/abstract-1.mov'
];
```

### Video Optimization Tips

1. **Resolution**: 1080p or 720p (higher resolution = larger file size)
2. **Frame Rate**: 24-30fps is sufficient for background videos
3. **Duration**: 10-30 seconds works well for seamless loops
4. **File Size**: Keep under 5MB for better performance
5. **Compression**: Use H.264 with medium compression

### Creating Video Assets

If you don't have video files yet, you can:

1. Download free stock videos from sites like Pexels, Pixabay, or Videvo
2. Use placeholder videos temporarily
3. Create solid color videos as fallbacks

## Performance Considerations

### Memory Management

- Videos are cached by the browser
- Use `autoplay` and `loop` attributes for seamless playback
- Add `playsinline` to prevent fullscreen on iOS

### Battery Impact

- Looping video can impact battery life
- Consider pausing video when app is in background
- Use `muted` attribute to reduce processing

### Example: Pause on Background

```typescript
async ionViewWillLeave() {
  if (this.videoElement?.nativeElement) {
    this.videoElement.nativeElement.pause();
  }
}

async ionViewWillEnter() {
  if (this.videoElement?.nativeElement) {
    this.videoElement.nativeElement.play().catch(() => {});
  }
}
```

## Safe Area Handling

The component properly handles iOS safe areas (notches):

```scss
.hero-card.extend-top {
  padding-top: calc(var(--ion-safe-area-top, 0px) + 8px);
  top: calc(-1 * var(--ion-safe-area-top, 0px));
}
```

This ensures:
- Video extends to top of screen
- Content is pushed below the safe area
- Header appears in the safe area

## Customization

### Change Scroll Threshold

Adjust when the header transition occurs:

```typescript
onScroll(event: any) {
  const scrollTop = event.target.scrollTop || 0;
  this.isScrolled = scrollTop > 20; // Change threshold
}
```

### Adjust Transition Speed

Modify the CSS transition duration:

```scss
.transparent-header {
  transition: all 0.3s ease; // Faster
  // or
  transition: all 1s ease; // Slower
}
```

### Change Video Overlay Opacity

```scss
.video-overlay {
  background-color: rgba(0, 0, 0, 0.4); // Darker
  // or
  background-color: rgba(0, 0, 0, 0.1); // Lighter
}
```

### Add Blur Effect to Scrolled Header

```scss
.transparent-header.scrolled {
  backdrop-filter: blur(20px); // More blur
  -webkit-backdrop-filter: blur(20px);
}
```

## Troubleshooting

### Video Not Playing

1. Check video file path is correct
2. Ensure `autoplay`, `muted`, and `playsinline` attributes are set
3. Verify video codec is supported (H.264 recommended)
4. Check browser console for errors

### Header Not Changing on Scroll

1. Verify scroll listener is attached in `ngAfterViewInit`
2. Check `isScrolled` is being updated
3. Ensure `.scrolled` class CSS is present
4. Test with `console.log` in `onScroll` method

### Status Bar Not Updating

1. Check if running on physical device (doesn't work in browser)
2. Verify `@capacitor/status-bar` is installed
3. Ensure `StatusBar.setStyle()` is wrapped in try/catch
4. Check platform detection: `this.platform.is('capacitor')`

### Video Height Issues

1. Call `calculateVideoHeight()` in `ngAfterViewInit`
2. Add a `setTimeout` to ensure DOM is rendered
3. Verify card element selector is correct
4. Log calculated values for debugging

## Browser Support

- ✅ iOS Safari 12+
- ✅ Android Chrome 60+
- ✅ Desktop Chrome/Firefox/Safari
- ⚠️ Older browsers may need video format fallbacks

## Dependencies

- `@ionic/angular`
- `@capacitor/status-bar`
- `@capacitor/core`

## Example: Time-Based Greeting

```typescript
selectTimeBasedGreeting() {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}
```

## Example: Random Video Selection

```typescript
selectRandomVideo() {
  const randomIndex = Math.floor(
    Math.random() * this.availableVideos.length
  );
  this.selectedVideo = this.availableVideos[randomIndex];
}
```

## Best Practices

1. **Always calculate video height** after content loads
2. **Use appropriate video compression** to balance quality and file size
3. **Test on multiple devices** especially for safe area handling
4. **Provide fallback styles** if video fails to load
5. **Consider accessibility** - some users may have motion sensitivity
6. **Add error handling** for video playback failures
7. **Monitor battery impact** on mobile devices

## Accessibility Considerations

### Motion Sensitivity

Some users may have motion sensitivity. Consider adding a preference:

```typescript
@Input() reduceMotion: boolean = false;

ngOnInit() {
  // Check system preference
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  if (prefersReducedMotion) {
    this.reduceMotion = true;
    // Show static image instead of video
  }
}
```

### Alternative Content

Provide alternative content for users who can't see the video:

```html
<video aria-label="Animated background showing peaceful water">
  <!-- Video content -->
</video>
```

## License

This component is part of the UpStart MobileComponents library.

