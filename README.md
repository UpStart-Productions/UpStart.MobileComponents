# 📱 UpStart Mobile Components

A comprehensive **Ionic/Angular component library** showcasing reusable mobile UI components, widgets, and features for iOS and Android apps. Built with Angular 20 standalone components and Ionic 8.

> **Purpose**: This library serves as both a personal reference and a community resource for modern mobile app development patterns, demonstrating best practices and production-ready components.

---

## 🚀 Tech Stack

- **Framework**: Angular 20 (standalone components)
- **Mobile Framework**: Ionic 8.0
- **Native Runtime**: Capacitor 7.4.3
- **Language**: TypeScript 5.8
- **Platform**: iOS (configured and tested)
- **Build Tools**: Angular CLI 20, Vite 7

---

## 📦 Key Dependencies

### Core Libraries
- **@ionic/angular** `^8.0.0` - Ionic Framework for Angular
- **@angular/core** `^20.0.0` - Latest Angular framework
- **@capacitor/core** `7.4.3` - Native mobile runtime

### Feature Libraries
- **ngx-echarts** `^20.0.2` - Interactive data visualizations
- **ngx-quill** `^28.0.1` - Rich text editor
- **pdfmake** `^0.2.20` - PDF generation
- **moment** `^2.30.1` - Date/time manipulation
- **jeep-sqlite** `^2.8.0` - SQLite database

### Capacitor Plugins
- **@capacitor/splash-screen** `^7.0.3`
- **@capacitor/status-bar** `^7.0.3`
- **@capacitor/camera** `^7.0.2`
- **@capacitor/share** `^7.0.2`
- **@capacitor/haptics** `7.0.2`
- **@capacitor/filesystem** `^7.1.4`
- **@capacitor/keyboard** `^7.0.3`
- **@capacitor/file-viewer** `^1.0.5`
- **@capacitor-community/sqlite** `^7.0.2`
- **capacitor-email-composer** `^7.0.2`

---

## 🎨 Component Library

### 1. **Share Sheet Integration** (`/share-sheet`)
Native share dialog with email and SMS support using Capacitor plugins.

**Features:**
- Native iOS/Android share dialogs
- Email composition with attachments
- SMS integration
- Social media sharing
- Custom share options

**Key Files:**
- `share-sheet.page.ts` - Demo page
- `services/share.service.ts` - Share functionality
- `services/email.service.ts` - Email composition
- `README.md` - Full documentation

---

### 2. **Widgets Collection** (`/widgets`)

#### 2.1 **Feelings Widget**
Mood tracking UI with emoji-based selection and visual feedback.

**Features:**
- 5-level mood scale
- Animated emoji selection
- Color-coded feedback
- Haptic feedback integration

#### 2.2 **Step Card**
Progress tracking card with visual indicators and milestone tracking.

**Features:**
- Animated progress display
- Milestone celebrations
- Custom icons and colors
- Responsive layout

#### 2.3 **Progress Ring**
Circular progress indicator with customizable colors and animations.

**Features:**
- Animated SVG ring
- Percentage display
- Color gradients
- Multiple size options
- Real-time updates

#### 2.4 **Avatar Picker**
User avatar selection component with grid layout.

**Features:**
- Multiple avatar options
- Grid or list layout
- Selection highlighting
- Custom avatar support

#### 2.5 **Number Flipper**
Animated number counter with flip animation effect.

**Features:**
- Smooth flip transitions
- Configurable speed
- Decimal support
- Custom styling

#### 2.6 **Button Bar**
Customizable button group with multiple selection modes.

**Features:**
- Single/multiple selection
- Icon support
- Badge indicators
- Custom colors
- Responsive sizing

#### 2.7 **Tabs FAB (Floating Action Button)**
Floating action button with expandable tab options.

**Features:**
- Expandable menu
- Custom icons
- Smooth animations
- Position customization
- Badge support

---

### 3. **Date Widgets** (`/date-widgets`)

#### 3.1 **Calendar Component**
Full-featured calendar with date selection and event support.

**Features:**
- Month/week/day views
- Date range selection
- Event markers
- Custom styling
- Moment.js integration

#### 3.2 **Date Scroller**
Horizontal scrolling date picker for mobile-optimized selection.

**Features:**
- Infinite scroll
- Snap-to-date behavior
- Visual indicators
- Touch-optimized
- Date range constraints

---

### 4. **Form Widgets** (`/form-widgets`)

#### 4.1 **Color Picker**
Custom color selection component with multiple input methods.

**Features:**
- Color palette grid
- Hex input
- RGB sliders
- Recent colors
- Custom palettes

#### 4.2 **Weekday Picker**
Day-of-week selector for recurring event setup.

**Features:**
- Multi-select mode
- Visual toggles
- Compact layout
- Custom labels
- Value binding

---

### 5. **Charts** (`/charts`)

#### Progress Line Chart
Interactive line chart for tracking progress over time using ECharts.

**Features:**
- Responsive design
- Interactive tooltips
- Zoom and pan
- Multiple data series
- Custom themes
- Export functionality

**Tech:**
- Built with Apache ECharts
- ngx-echarts integration
- TypeScript type safety

---

### 6. **Rich Text Editor** (`/rich-text-editor`)

Quill-based rich text editor optimized for mobile with floating toolbar.

**Features:**
- Mobile-optimized floating toolbar
- Text formatting (bold, italic, underline)
- Lists (ordered/unordered)
- Links and images
- Color picker
- Undo/redo
- Custom toolbar service
- Content export (HTML/Delta)

**Tech:**
- Quill 2.0.3
- ngx-quill integration
- Custom toolbar component
- Touch-friendly UI

**Components:**
- `quill-editor.component` - Main editor
- `quill-floating-toolbar.component` - Mobile toolbar
- `services/quill-toolbar.service` - Toolbar management

---

### 7. **Gamification System** (`/gamification`)

Comprehensive celebration system with animations and haptic feedback.

**Features:**
- **Tiered Celebration System**
  - Bronze, Silver, Gold, Platinum, Diamond tiers
  - Achievement animations
  - Sound effects
  - Haptic feedback
  
- **Coin Animation**
  - Animated coin collection
  - Floating score indicators
  - Particle effects
  - Customizable rewards

- **Confetti Effects**
  - Canvas-based animations
  - Multiple patterns
  - Color customization
  - Performance optimized

**Components:**
- `coin-animation.component` - Coin animations
- `services/coin-animation.service` - Animation management
- `services/haptic.service` - Haptic feedback
- `models/gamification.types.ts` - TypeScript types

---

### 8. **PDF Export** (`/pdf-export`)

Generate and share professional PDFs from HTML content.

**Features:**
- HTML to PDF conversion
- Custom styling
- Image embedding
- Multi-page support
- Native share integration
- File system storage
- PDF viewer integration

**Tech:**
- PDFMake library
- html-to-pdfmake converter
- Capacitor File Viewer
- Capacitor Filesystem

**Files:**
- `services/pdf.service.ts` - PDF generation
- `types/html-to-pdfmake.d.ts` - Type definitions

---

### 9. **Video Header** (`/video-header`)

Fullscreen video background header with smooth scroll transitions.

**Features:**
- **Video Background**
  - Multiple video support
  - Autoplay and loop
  - Performance optimized
  - iOS safe area handling

- **Scroll-Triggered Transitions**
  - Transparent to white header fade
  - 0.6s smooth animations
  - Status bar color sync
  - Dynamic height calculation

- **Status Bar Integration**
  - Light/dark mode switching
  - Capacitor Status Bar API
  - Automatic color adaptation

**Tech:**
- Native HTML5 video
- CSS backdrop-filter effects
- Capacitor Status Bar
- iOS notch support

**Implementation Details:**
- Z-index layering (Video → Overlay → Content → Header)
- Dynamic video height calculation
- Scroll event optimization
- Safe area CSS variables

---

### 10. **SQLite Starter Kit** (`/sqlite-demo`)

Complete SQLite database setup with CRUD operations and demo implementation.

**Features:**
- **Database Setup**
  - Schema creation
  - Migration support
  - Connection management
  - Error handling

- **CRUD Operations**
  - Create records
  - Read/query data
  - Update records
  - Delete records

- **ToDo Demo**
  - Full CRUD example
  - List management
  - Data persistence
  - Real-time updates

**Tech:**
- @capacitor-community/sqlite
- jeep-sqlite web component
- TypeScript service layer
- Reactive data patterns

**Files:**
- `services/sqlite.service.ts` - Database management
- `services/database.service.ts` - CRUD operations
- `types/database.types.ts` - Type definitions

---

## 🏗️ Project Structure

```
UpStart.MobileComponents/
├── src/app/
│   ├── charts/                    # Chart components
│   │   └── progress-line-chart/
│   ├── date-widgets/              # Date-related components
│   │   ├── calendar/
│   │   └── date-scroller/
│   ├── form-widgets/              # Form controls
│   │   ├── color-picker/
│   │   └── weekday-picker/
│   ├── gamification/              # Gamification system
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── pdf-export/                # PDF generation
│   │   ├── services/
│   │   └── types/
│   ├── rich-text-editor/          # Quill editor
│   │   ├── components/
│   │   └── services/
│   ├── share-sheet/               # Share functionality
│   │   ├── services/
│   │   └── models/
│   ├── sqlite-demo/               # SQLite examples
│   │   ├── services/
│   │   └── types/
│   ├── video-header/              # Video header component
│   └── widgets/                   # UI widgets
│       ├── avatar-picker/
│       ├── button-bar/
│       ├── feelings/
│       ├── number-flipper/
│       ├── progress-ring/
│       ├── step-card/
│       └── tabs-fab/
├── ios/                           # iOS native project
├── assets/                        # Static assets
│   ├── videos/                    # Video files
│   ├── custom-icons/              # Custom SVG icons
│   └── images/                    # Image assets
└── www/                           # Build output
```

---

## 📱 Features

### **Development**
- ✅ Angular 20 standalone components (no NgModules)
- ✅ Lazy loading for all routes
- ✅ TypeScript strict mode
- ✅ ESLint configuration
- ✅ Comprehensive type definitions

### **UI/UX**
- ✅ iOS safe area handling
- ✅ Dark mode support (Ionic theming)
- ✅ Responsive design
- ✅ Touch-optimized interactions
- ✅ Smooth animations and transitions
- ✅ Haptic feedback integration

### **Native Features**
- ✅ Camera access
- ✅ File system operations
- ✅ Native sharing
- ✅ Email composition
- ✅ SMS integration
- ✅ Status bar customization
- ✅ Splash screen control
- ✅ Keyboard handling
- ✅ SQLite database

### **Performance**
- ✅ Lazy-loaded routes
- ✅ Optimized bundle sizes
- ✅ Component-level code splitting
- ✅ Budget monitoring (8kb component styles)
- ✅ AOT compilation

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm or yarn
- Xcode (for iOS development)
- Capacitor CLI

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd UpStart.MobileComponents/UpStart.MobileComponents

# Install dependencies
npm install

# Install iOS dependencies
cd ios/App
pod install
cd ../..
```

### Development

```bash
# Start development server
npm start
# or
ng serve

# Build for production
npm run build

# Run linter
npm run lint

# Run tests
npm test
```

### iOS Development

```bash
# Sync with Capacitor
npx cap sync ios

# Open in Xcode
npx cap open ios

# Build and run on device
# (Use Xcode to select device and run)
```

---

## 📖 Component Documentation

Each component includes detailed README files with:
- Feature overview
- API documentation
- Usage examples
- Implementation details
- Customization options

**Documentation locations:**
- `/src/app/*/README.md` - Component-specific docs
- In-app demos with live examples
- Code comments and TypeScript types

---

## 🎯 Usage Examples

### Using a Widget Component

```typescript
import { ProgressRingComponent } from './widgets/progress-ring/progress-ring.component';

@Component({
  standalone: true,
  imports: [ProgressRingComponent]
})
export class MyPage {
  progress = 75;
  color = '#3880ff';
}
```

```html
<app-progress-ring 
  [progress]="progress" 
  [color]="color"
  [size]="120">
</app-progress-ring>
```

### Using the PDF Service

```typescript
import { PdfService } from './pdf-export/services/pdf.service';

constructor(private pdfService: PdfService) {}

async generatePDF() {
  const htmlContent = '<h1>My Report</h1><p>Content here</p>';
  await this.pdfService.generateAndSharePDF(htmlContent, 'report.pdf');
}
```

### Using the Share Service

```typescript
import { ShareService } from './share-sheet/services/share.service';

constructor(private shareService: ShareService) {}

async shareContent() {
  await this.shareService.share({
    title: 'Check this out!',
    text: 'Amazing content',
    url: 'https://example.com'
  });
}
```

---

## 🎨 Theming

The app uses Ionic's CSS variables for theming. Customize colors in:
- `src/theme/variables.scss` - Global theme variables
- Component-level SCSS files for specific styling

### Dark Mode
Dark mode is supported through Ionic's built-in theming system. Toggle via device settings.

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👤 Author

**Jeff Denton**
- Built for UpStart mobile projects
- Component library for the Ionic developer community

---

## 🤝 Contributing

This is a personal component library, but contributions and suggestions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests with improvements
- Use components in your own projects
- Share feedback and suggestions

---

## 📝 Notes

### Build Configuration
- Component style budget: 8kb (increased from 4kb for demo pages)
- Initial bundle budget: 5mb max
- Production builds use optimization and AOT compilation

### iOS Configuration
- Xcode project included
- CocoaPods integrated
- Status bar and splash screen configured
- Safe area handling implemented

### Development Notes
- Uses Angular 20 standalone API (no NgModules)
- All routes are lazy-loaded for optimal performance
- TypeScript strict mode enabled
- ESLint configured for code quality

---

## 🔗 Resources

- [Ionic Framework Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Ionic Icons](https://ionic.io/ionicons)

---

**Last Updated**: October 2025

**Version**: 0.0.1

**Status**: Active Development 🚀
