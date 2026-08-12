/** @jsxImportSource solid-js */
import { createEffect, createSignal, onCleanup } from 'solid-js';
import { MatrixRain } from '../MatrixRain';

export interface MatrixRainSolidProps {
  class?: string;
  style?: Record<string, string | number>;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fadeAlpha?: number;
  speed?: number;
  characters?: string;
}

export function MatrixRainSolid(props: MatrixRainSolidProps) {
  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement | undefined>();
  let instance: MatrixRain | null = null;

  createEffect(() => {
    const canvas = canvasRef();
    if (!canvas) {
      return;
    }

    instance = new MatrixRain({
      canvas,
      color: props.color ?? '#00FF66',
      backgroundColor: props.backgroundColor ?? 'rgba(0, 0, 0, 0.07)',
      fontSize: props.fontSize ?? 16,
      fadeAlpha: props.fadeAlpha ?? 0.08,
      speed: props.speed ?? 1,
      characters: props.characters,
    });

    instance.start();

    onCleanup(() => {
      instance?.destroy();
      instance = null;
    });
  });

  return (
    <canvas
      ref={setCanvasRef}
      class={props.class}
      style={props.style}
    />
  );
}
