import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList
} from '@ionic/angular/standalone';
import { CoinAnimationService } from './services/coin-animation.service';
import { HapticService } from './services/haptic.service';
import { GamificationAchievement } from './models/gamification.types';

@Component({
  selector: 'app-gamification-demo',
  templateUrl: './gamification-demo.page.html',
  styleUrls: ['./gamification-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonList
  ]
})
export class GamificationDemoPage implements OnInit {
  private coinAnimationService = inject(CoinAnimationService);
  private hapticService = inject(HapticService);

  // Sample achievements for demo
  microAchievement: GamificationAchievement = {
    id: 1,
    triggerKey: 'journal_saved',
    name: 'Journal Saved',
    category: 'Daily Practice',
    icon: '📝',
    description: 'Saved a journal entry',
    celebrationTier: 'micro',
    hapticType: 'light',
    maxFrequency: 'unlimited',
    coinColor: '#4caf50',
    isActive: true
  };

  smallAchievement: GamificationAchievement = {
    id: 2,
    triggerKey: 'first_journal_today',
    name: 'First Journal Today',
    category: 'Daily Practice',
    icon: '🌅',
    description: 'First journal entry of the day',
    celebrationTier: 'small',
    hapticType: 'medium',
    maxFrequency: 'daily',
    coinColor: '#66bb6a',
    isActive: true
  };

  mediumAchievement: GamificationAchievement = {
    id: 3,
    triggerKey: 'inventory_complete',
    name: 'Inventory Complete',
    category: 'Step Work',
    icon: '📋',
    description: 'Completed a moral inventory',
    celebrationTier: 'medium',
    hapticType: 'success',
    maxFrequency: 'milestone',
    coinColor: '#9c27b0',
    isActive: true
  };

  majorAchievement: GamificationAchievement = {
    id: 4,
    triggerKey: 'step1_completed',
    name: 'Step 1 Complete!',
    category: 'Step Work',
    icon: '🎯',
    description: 'Completed Step 1 with sponsor approval',
    celebrationTier: 'major',
    hapticType: 'success',
    maxFrequency: 'once',
    coinColor: '#6a1b9a',
    isActive: true
  };

  sobrietyAchievement: GamificationAchievement = {
    id: 5,
    triggerKey: '30_days_sober',
    name: '30 Days Sober!',
    category: 'Sobriety Milestone',
    icon: '🏆',
    description: 'Achieved 30 days of continuous sobriety',
    celebrationTier: 'major',
    hapticType: 'success',
    maxFrequency: 'once',
    coinColor: '#ffd700',
    isActive: true
  };

  ngOnInit() {
    console.log('🎮 Gamification demo page initialized');
  }

  // Trigger animations
  triggerMicroWin() {
    console.log('🎯 Triggering Micro Win...');
    this.coinAnimationService.triggerAnimation(this.microAchievement);
  }

  triggerSmallMilestone() {
    console.log('🎯 Triggering Small Milestone...');
    this.coinAnimationService.triggerAnimation(this.smallAchievement);
  }

  triggerMediumMilestone() {
    console.log('🎯 Triggering Medium Milestone...');
    this.coinAnimationService.triggerAnimation(this.mediumAchievement);
  }

  triggerMajorMilestone() {
    console.log('🎯 Triggering Major Milestone...');
    this.coinAnimationService.triggerAnimation(this.majorAchievement);
  }

  triggerSobrietyMilestone() {
    console.log('🎯 Triggering Sobriety Milestone...');
    this.coinAnimationService.triggerAnimation(this.sobrietyAchievement);
  }

  // Test all tiers in sequence
  async testAllTiers() {
    console.log('🎮 Testing all tiers in sequence...');
    
    this.triggerMicroWin();
    
    setTimeout(() => {
      this.triggerSmallMilestone();
    }, 3500);
    
    setTimeout(() => {
      this.triggerMediumMilestone();
    }, 7000);
    
    setTimeout(() => {
      this.triggerMajorMilestone();
    }, 11000);
  }

  // Test haptics
  async testHaptics() {
    console.log('📱 Testing haptics...');
    await this.hapticService.testAllHaptics();
  }

  getQueueLength(): number {
    return this.coinAnimationService.getQueueLength();
  }

  isAnimating(): boolean {
    return this.coinAnimationService.isCurrentlyAnimating();
  }
}

