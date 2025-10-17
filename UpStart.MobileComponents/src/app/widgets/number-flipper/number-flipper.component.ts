import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number-flipper',
  template: `
    <div class="number-flipper">
      <div class="digit" *ngFor="let digit of digits; let i = index; trackBy: trackByFn" [style.height.px]="digitHeight" [style.width.px]="digitHeight * 0.6">
        <div class="digit-wrapper" [style.transform]="'translateY(' + (-digit * digitHeight) + 'px)'" [style.transition]="'transform 0.8s ease'">
          <div *ngFor="let n of [].constructor(10); let j = index" [class.active]="j === digit" [style.height.px]="digitHeight" [style.lineHeight.px]="digitHeight">
            {{ j }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .number-flipper {
      display: flex;
      font-size: 2rem;
      line-height: 1;
      align-items: baseline;
    }
    .digit {
      overflow: hidden;
      display: inline-block;
      vertical-align: baseline;
    }
    .digit-wrapper {
      transition: transform 0.1s ease;
      display: flex;
      flex-direction: column;
    }
    .digit-wrapper div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class NumberFlipperComponent implements OnInit, OnChanges { 
  @Input() number: number = 0;
  @Input() digitHeight: number = 40; 

  digits: number[] = [];

  constructor() {}

  ngOnInit() {
    this.updateDigits();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['number']) {
      this.updateDigits();
    }
  }

  trackByFn(index: number, item: number): number {
    return index;
  }

  private updateDigits() {
    if ( this.number > 1000 )
    {
      this.number = Math.round(this.number / 1000);
    }
    this.digits = [...Math.trunc(this.number).toString().split('').map(Number)];
  }
}

