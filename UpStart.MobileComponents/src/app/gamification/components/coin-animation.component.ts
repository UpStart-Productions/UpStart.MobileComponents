import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CoinAnimationService } from '../services/coin-animation.service';
import { GamificationAchievement, CoinEarnedEvent } from '../models/gamification.types';

@Component({
  selector: 'app-coin-animation',
  templateUrl: './coin-animation.component.html',
  styleUrls: ['./coin-animation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CoinAnimationComponent implements OnInit, OnDestroy {
  private coinAnimationService = inject(CoinAnimationService);
  private cdr = inject(ChangeDetectorRef);
  
  private animationSubscription?: Subscription;
  
  // Animation state
  showCoinAnimation = false;
  currentCoinAchievement: GamificationAchievement | null = null;
  showConfetti = false;
  confettiPieces: Array<{ 
    x: number; 
    y: number; 
    rotation: number; 
    delay: number; 
    color: string; 
    peakHeight: number; 
    directionX: number; 
    directionY: number;
  }> = [];

  ngOnInit() {
    console.log('🎬 CoinAnimationComponent initialized');
    
    // Subscribe to animation events
    this.animationSubscription = this.coinAnimationService.animation$.subscribe(event => {
      console.log('🎬 Coin animation component received event:', event);
      if (event) {
        this.handleAnimationEvent(event);
      }
    });
  }

  ngOnDestroy() {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
    }
  }

  private handleAnimationEvent(event: CoinEarnedEvent) {
    console.log('🎯 Handling animation event:', event);
    
    this.showCoinAnimation = true;
    this.currentCoinAchievement = event.achievement;
    this.cdr.detectChanges();
    
    // Trigger confetti for major milestones
    if (event.celebrationTier === 'major') {
      console.log('🎊 Major milestone detected - scheduling confetti...');
      setTimeout(() => {
        console.log('🎊 Triggering confetti overlay...');
        this.showConfettiOverlay();
      }, 3300); // Trigger confetti during the extended "hold" phase
    }
    
    // Auto-hide coin after animation completes
    const animationDuration = this.getAnimationDuration(event.celebrationTier);
    setTimeout(() => {
      console.log('⏰ Auto-hiding coin animation after', animationDuration, 'ms');
      this.hideCoinAnimation();
    }, animationDuration);
  }

  private getAnimationDuration(tier: string): number {
    const durations: { [key: string]: number } = {
      'micro': 3000,    // 3s (extended pause + fade)
      'small': 3000,    // 3s (extended pause + fade)
      'medium': 3800,   // 3.8s (extended pause + fade)
      'major': 4300     // 4.3s (extended pause + fade)
    };
    return durations[tier] || 3000;
  }

  hideCoinAnimation() {
    this.showCoinAnimation = false;
    this.currentCoinAchievement = null;
  }

  showConfettiOverlay() {
    console.log('🎊 showConfettiOverlay called');
    this.showConfetti = true;
    
    // Generate confetti pieces
    this.generateConfetti();
    console.log('🎊 Generated', this.confettiPieces.length, 'confetti pieces');
    console.log('🎊 showConfetti state:', this.showConfetti);
    
    // Force change detection
    this.cdr.detectChanges();
    
    // Hide confetti after 4 seconds
    setTimeout(() => {
      console.log('🎊 Hiding confetti after 4 seconds');
      this.showConfetti = false;
      this.confettiPieces = [];
    }, 4000);
  }

  private generateConfetti() {
    this.confettiPieces = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    // Generate 112 confetti pieces
    for (let i = 0; i < 112; i++) {
      // Randomize peak height between 50vh and 90vh for realistic variation
      const peakHeight = 50 + (Math.random() * 40); // 50vh to 90vh
      
      // Generate random direction vectors that point roughly upward
      const directionX = (Math.random() - 0.5) * 6; // -3 to 3
      const directionY = 0.8 + Math.random() * 0.8; // 0.8 to 1.6 (stronger upward bias)
      
      this.confettiPieces.push({
        x: Math.random() * 100, // 0% to 100% of screen width
        y: 100, // Start from bottom
        rotation: Math.random() * 360,
        delay: Math.random() * 500, // Stagger the start times
        color: colors[Math.floor(Math.random() * colors.length)],
        peakHeight: peakHeight,
        directionX: directionX,
        directionY: directionY
      });
    }
  }

  // Helper method to get coin color from achievement
  getCoinColor(achievement: GamificationAchievement): string {
    return achievement.coinColor || '#ffd700'; // Default to gold if no color specified
  }

  // Helper method to get animation classes based on celebration tier
  getCoinAnimationClasses(tier: string): string {
    const tierClasses: { [key: string]: string } = {
      'micro': 'coin-micro coin-scale',
      'small': 'coin-small coin-flip', 
      'medium': 'coin-medium coin-spin',
      'major': 'coin-major coin-confetti'
    };
    return tierClasses[tier] || 'coin-micro coin-scale';
  }

  // TrackBy function for confetti pieces performance optimization
  trackConfettiPiece(index: number, piece: any): number {
    return index;
  }
}


