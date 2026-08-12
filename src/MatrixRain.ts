import type { MatrixRainOptions, MatrixRainState } from './types';

const DEFAULT_CHARACTERS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

export class MatrixRain {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly fontSize: number;
  private color: string;
  private backgroundColor: string;
  private fadeAlpha: number;
  private characters: string;
  private readonly speed: number;
  private readonly state: MatrixRainState = {
    columns: [],
    frameId: null,
  };

  private resizeObserver?: ResizeObserver;

  constructor(options: MatrixRainOptions) {
    this.canvas = typeof options.canvas === 'string' ? this.resolveCanvas(options.canvas) : options.canvas;
    const context = this.canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to get 2D canvas context');
    }

    this.context = context;
    this.fontSize = options.fontSize ?? 16;
    this.color = options.color ?? '#00FF66';
    this.backgroundColor = options.backgroundColor ?? 'rgba(0, 0, 0, 0.08)';
    this.fadeAlpha = options.fadeAlpha ?? 0.08;
    this.characters = options.characters ?? DEFAULT_CHARACTERS;
    this.speed = options.speed ?? 1;

    this.initializeCanvas();
    this.bindResize();
  }

  start(): void {
    if (this.state.frameId !== null) {
      return;
    }

    const tick = (): void => {
      this.draw();
      this.state.frameId = window.requestAnimationFrame(tick);
    };

    this.state.frameId = window.requestAnimationFrame(tick);
  }

  setCharacters(characters: string): void {
    this.characters = characters || DEFAULT_CHARACTERS;
  }

  updateOptions(options: Partial<MatrixRainOptions>): void {
    if (options.color) {
      this.color = options.color;
    }

    if (options.backgroundColor) {
      this.backgroundColor = options.backgroundColor;
    }

    if (typeof options.fadeAlpha === 'number') {
      this.fadeAlpha = options.fadeAlpha;
    }

    if (options.characters) {
      this.setCharacters(options.characters);
    }
  }

  destroy(): void {
    if (this.state.frameId !== null) {
      window.cancelAnimationFrame(this.state.frameId);
      this.state.frameId = null;
    }

    this.resizeObserver?.disconnect();
    this.state.columns = [];
  }

  private resolveCanvas(selector: string): HTMLCanvasElement {
    const element = document.querySelector(selector) as HTMLCanvasElement | null;

    if (!element) {
      throw new Error(`Canvas element not found: ${selector}`);
    }

    return element;
  }

  private initializeCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const width = this.canvas.clientWidth || this.canvas.width || 300;
    const height = this.canvas.clientHeight || this.canvas.height || 200;

    this.canvas.width = Math.max(1, Math.floor(width * dpr));
    this.canvas.height = Math.max(1, Math.floor(height * dpr));

    const context = this.context;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.font = `${this.fontSize}px monospace`;
    context.textBaseline = 'top';

    this.state.columns = Array.from({ length: Math.ceil(this.canvas.width / this.fontSize) }, () => {
      return Math.random() * -100;
    });
  }

  private bindResize(): void {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    this.resizeObserver = new ResizeObserver(() => {
      this.initializeCanvas();
    });

    this.resizeObserver.observe(this.canvas);
  }

  private draw(): void {
    const context = this.context;
    const { width, height } = this.canvas;

    context.fillStyle = this.backgroundColor;
    context.fillRect(0, 0, width, height);

    context.font = `${this.fontSize}px monospace`;
    context.textBaseline = 'top';

    for (let columnIndex = 0; columnIndex < this.state.columns.length; columnIndex += 1) {
      const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      const x = columnIndex * this.fontSize;
      const y = this.state.columns[columnIndex] * this.fontSize;

      context.fillStyle = this.color;
      context.fillText(text, x, y);

      if (y > height && Math.random() > 0.975) {
        this.state.columns[columnIndex] = 0;
      }

      this.state.columns[columnIndex] += this.speed;
    }
  }
}
