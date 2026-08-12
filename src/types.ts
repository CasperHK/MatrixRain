export interface MatrixRainOptions {
  canvas: HTMLCanvasElement | string;
  fontSize?: number;
  color?: string;
  fadeAlpha?: number;
  characters?: string;
  backgroundColor?: string;
  speed?: number;
}

export interface MatrixRainState {
  columns: number[];
  frameId: number | null;
}
