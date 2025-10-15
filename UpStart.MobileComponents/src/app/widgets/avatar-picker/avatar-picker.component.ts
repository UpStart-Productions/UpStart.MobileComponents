import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Avatar Picker Component
 * 
 * A beautiful, scrollable grid of avatar images for user profile selection.
 * Features smooth animations, selected state highlighting, and responsive design.
 * Perfect for profile setup, settings, or any user customization interface.
 * 
 * @example
 * ```html
 * <app-avatar-picker
 *   [selectedAvatar]="userAvatar"
 *   (avatarSelected)="onAvatarSelected($event)">
 * </app-avatar-picker>
 * ```
 */
@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AvatarPickerComponent implements OnInit {
  /** Currently selected avatar path */
  @Input() selectedAvatar: string = '';
  
  /** Emitted when an avatar is selected */
  @Output() avatarSelected = new EventEmitter<string>();

  /** Array of available avatar image paths */
  avatarOptions: string[] = [
    'assets/images/avatars/avatar-1.png',
    'assets/images/avatars/avatar-2.png',
    'assets/images/avatars/avatar-3.png',
    'assets/images/avatars/avatar-4.png',
    'assets/images/avatars/avatar-5.png',
    'assets/images/avatars/avatar-6.png',
    'assets/images/avatars/avatar-7.png',
    'assets/images/avatars/avatar-8.png',
    'assets/images/avatars/avatar-9.png',
    'assets/images/avatars/avatar-10.png',
    'assets/images/avatars/avatar-11.png',
    'assets/images/avatars/avatar-12.png',
    'assets/images/avatars/avatar-13.png',
    'assets/images/avatars/avatar-14.png',
    'assets/images/avatars/avatar-15.png',
    'assets/images/avatars/avatar-16.png',
    'assets/images/avatars/avatar-17.png',
    'assets/images/avatars/avatar-18.png',
    'assets/images/avatars/avatar-19.png',
    'assets/images/avatars/avatar-20.png',
    'assets/images/avatars/avatar-21.png',
    'assets/images/avatars/avatar-22.png',
    'assets/images/avatars/avatar-23.png',
    'assets/images/avatars/avatar-24.png',
    'assets/images/avatars/avatar-25.png',
    'assets/images/avatars/avatar-26.png',
    'assets/images/avatars/avatar-27.png',
    'assets/images/avatars/avatar-28.png',
    'assets/images/avatars/avatar-29.png',
    'assets/images/avatars/avatar-30.png'
  ];

  ngOnInit() {
    // If no avatar is selected, default to the first one
    if (!this.selectedAvatar) {
      this.selectedAvatar = this.avatarOptions[0];
    }
  }

  /**
   * Handle avatar selection
   */
  selectAvatar(avatarPath: string) {
    this.selectedAvatar = avatarPath;
    this.avatarSelected.emit(avatarPath);
  }

  /**
   * Check if avatar is currently selected
   */
  isSelected(avatarPath: string): boolean {
    return this.selectedAvatar === avatarPath;
  }

  /**
   * Handle image load errors
   */
  onImageError(event: any) {
    console.error('Failed to load avatar image:', event.target.src);
    // You could set a fallback image here if needed
  }
}


