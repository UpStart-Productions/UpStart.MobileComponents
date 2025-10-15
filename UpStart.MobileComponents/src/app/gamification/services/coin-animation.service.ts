import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GamificationAchievement, CoinEarnedEvent } from '../models/gamification.types';
import { HapticService } from './haptic.service';

@Injectable({
  providedIn: 'root'
})
export class CoinAnimationService {
  private animationQueue: CoinEarnedEvent[] = [];
  private isAnimating = false;
  private animationSubject = new BehaviorSubject<CoinEarnedEvent | null>(null);
  public animation$ = this.animationSubject.asObservable();

  constructor(private hapticService: HapticService) {}

  /**
   * Trigger a coin animation
   */
  triggerAnimation(achievement: GamificationAchievement): void {
    console.log('🎬 CoinAnimationService.triggerAnimation called with:', achievement);
    
    const event: CoinEarnedEvent = {
      achievement,
      timestamp: new Date(),
      celebrationTier: achievement.celebrationTier,
      hapticType: achievement.hapticType
    };

    console.log('🎭 Created animation event:', event);

    // Add to queue
    this.animationQueue.push(event);
    console.log('📋 Animation queue length:', this.animationQueue.length);

    // Start processing if not already animating
    if (!this.isAnimating) {
      console.log('▶️ Starting animation queue processing...');
      this.processQueue();
    } else {
      console.log('⏸️ Already animating, event queued');
    }
  }

  /**
   * Process the animation queue sequentially
   */
  private async processQueue(): Promise<void> {
    if (this.animationQueue.length === 0) {
      console.log('📋 Animation queue empty, stopping processing');
      this.isAnimating = false;
      return;
    }

    this.isAnimating = true;
    const event = this.animationQueue.shift()!;
    console.log('🎭 Processing animation event:', event);

    // Trigger haptic feedback
    console.log('📱 Triggering haptic feedback:', event.hapticType);
    await this.hapticService.triggerHaptic(event.hapticType);

    // Emit the animation event
    console.log('📡 Emitting animation event to subscribers');
    this.animationSubject.next(event);

    // Wait for animation to complete before showing next
    const animationDuration = this.getAnimationDuration(event.celebrationTier);
    console.log(`⏳ Waiting ${animationDuration}ms for animation to complete...`);
    await new Promise(resolve => setTimeout(resolve, animationDuration));

    // Process next item in queue
    console.log('🔄 Processing next animation in queue...');
    this.processQueue();
  }

  /**
   * Get animation duration based on celebration tier
   */
  private getAnimationDuration(tier: 'micro' | 'small' | 'medium' | 'major'): number {
    const durations: { [key: string]: number } = {
      'micro': 3000,    // 3s
      'small': 3000,    // 3s
      'medium': 3800,   // 3.8s
      'major': 4300     // 4.3s
    };
    return durations[tier] || 3000;
  }

  /**
   * Clear the animation queue
   */
  clearQueue(): void {
    this.animationQueue = [];
    this.isAnimating = false;
  }

  /**
   * Get current queue length
   */
  getQueueLength(): number {
    return this.animationQueue.length;
  }

  /**
   * Check if currently animating
   */
  isCurrentlyAnimating(): boolean {
    return this.isAnimating;
  }
}

