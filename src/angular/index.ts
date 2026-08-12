import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { MatrixRain } from '../MatrixRain';

export interface MatrixRainAngularProps {
  className?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fadeAlpha?: number;
  speed?: number;
  characters?: string;
}

@Component({
  selector: 'matrix-rain-angular',
  standalone: true,
  template: '<canvas [class]="className"></canvas>',
})
export class MatrixRainAngular implements OnInit, OnDestroy {
  @Input() className?: string;
  @Input() color = '#00FF66';
  @Input() backgroundColor = 'rgba(0, 0, 0, 0.07)';
  @Input() fontSize = 16;
  @Input() fadeAlpha = 0.08;
  @Input() speed = 1;
  @Input() characters?: string;

  private canvas?: HTMLCanvasElement;
  private instance: MatrixRain | null = null;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const canvas = this.elementRef.nativeElement.querySelector('canvas') as HTMLCanvasElement | null;
    if (!canvas) {
      return;
    }

    this.canvas = canvas;
    this.instance = new MatrixRain({
      canvas,
      color: this.color,
      backgroundColor: this.backgroundColor,
      fontSize: this.fontSize,
      fadeAlpha: this.fadeAlpha,
      speed: this.speed,
      characters: this.characters,
    });

    this.instance.start();
  }

  ngOnDestroy(): void {
    this.instance?.destroy();
    this.instance = null;
  }
}
