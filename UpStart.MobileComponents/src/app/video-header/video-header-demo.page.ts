import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  Platform
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  settingsOutline,
  heartOutline,
  calendarOutline,
  videocamOutline,
  refreshOutline
} from 'ionicons/icons';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-video-header-demo',
  templateUrl: './video-header-demo.page.html',
  styleUrls: ['./video-header-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonText,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class VideoHeaderDemoPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('content') content!: any;
  @ViewChild('video') videoElement!: any;

  // Scroll handling
  isScrolled: boolean = false;

  // Video background properties
  selectedVideo: string = '';
  availableVideos: string[] = [
    'assets/videos/water-1.mov',
    'assets/videos/water-3.mov',
    'assets/videos/water-4.mov',
    'assets/videos/water-5.mov',
    'assets/videos/trees-1.mov',
    'assets/videos/grass-1.mov',
    'assets/videos/plant-1.mov',
    'assets/videos/forest-1.mov',
    'assets/videos/forest-2.mov',
    'assets/videos/forest-3.mov',
    'assets/videos/tropical-1.mov',
    'assets/videos/tropical-2.mov'
  ];
  videoHeight: number = 400; // Default height, will be updated dynamically

  // Demo properties
  greeting: string = 'Good morning!';
  userName: string = 'Friend';

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    addIcons({
      personCircleOutline,
      settingsOutline,
      heartOutline,
      calendarOutline,
      videocamOutline,
      refreshOutline
    });
  }

  async ngOnInit() {
    this.selectRandomVideo();
    this.setTimeBasedGreeting();
  }

  ngAfterViewInit() {
    // Set up scroll listener after view is initialized
    if (this.content) {
      this.content.getScrollElement().then((scrollElement: any) => {
        scrollElement.addEventListener('scroll', (event: any) => {
          this.onScroll(event);
        });
      });
    }

    // Calculate dynamic video height after content loads
    setTimeout(() => this.calculateVideoHeight(), 100);
  }

  ngOnDestroy() {
    // Reset status bar when leaving
    if (this.platform.is('capacitor')) {
      StatusBar.setStyle({ style: Style.Light }).catch(() => {});
    }
  }

  async ionViewWillEnter() {
    // Set initial status bar style for video background (white icons)
    if (this.platform.is('capacitor')) {
      try {
        await StatusBar.setStyle({ style: Style.Dark });
      } catch (error) {
        console.log('Could not set initial status bar style:', error);
      }
    }
  }

  async ionViewWillLeave() {
    // Reset status bar when leaving
    if (this.platform.is('capacitor')) {
      try {
        await StatusBar.setStyle({ style: Style.Light });
      } catch (error) {
        console.log('Could not reset status bar style:', error);
      }
    }
  }

  selectRandomVideo() {
    const randomIndex = Math.floor(Math.random() * this.availableVideos.length);
    this.selectedVideo = this.availableVideos[randomIndex];
  }

  setTimeBasedGreeting() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }

  refreshVideo() {
    this.selectRandomVideo();
    this.setTimeBasedGreeting();

    // Restart video playback
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      video.load();
      video.play().catch(() => {});
    }
  }

  // Handle scroll events to show/hide header background
  async onScroll(event: any) {
    const scrollTop = event.target.scrollTop || event.detail?.scrollTop || 0;
    const wasScrolled = this.isScrolled;
    this.isScrolled = scrollTop > 5; // Show background when scrolled more than 5px

    // Update status bar style based on scroll state
    if (wasScrolled !== this.isScrolled && this.platform.is('capacitor')) {
      try {
        if (this.isScrolled) {
          // Scrolled up - white header background, use dark icons
          await StatusBar.setStyle({ style: Style.Light });
        } else {
          // At top - video background, use light (white) icons
          await StatusBar.setStyle({ style: Style.Dark });
        }
      } catch (error) {
        console.log('Could not update status bar style:', error);
      }
    }
  }

  // Calculate dynamic video height based on content
  calculateVideoHeight() {
    const cardElement = document.querySelector('.hero-card');
    if (cardElement) {
      const cardHeight = cardElement.getBoundingClientRect().height;
      const safeAreaTop = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--ion-safe-area-top') || '0'
      );

      // Reduce padding to prevent overlap with features card
      const padding = 0;
      this.videoHeight = cardHeight + safeAreaTop + padding;

      console.log('📐 Video height calculated:', {
        cardHeight,
        safeAreaTop,
        totalHeight: this.videoHeight
      });
    }
  }

  // Demo action handlers
  onAvatarClick() {
    console.log('👤 Avatar clicked - navigating to home');
    this.router.navigate(['/home']);
  }

  onSettingsClick() {
    console.log('⚙️ Settings clicked');
  }

  getPersonalizedGreeting(): string {
    return `${this.greeting}, ${this.userName}!`;
  }
}

