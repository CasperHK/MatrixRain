import { onMount } from 'svelte';
import { MatrixRain } from '../MatrixRain';

export interface MatrixRainSvelteProps {
  className?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fadeAlpha?: number;
  speed?: number;
  characters?: string;
}

export function MatrixRainSvelte(props: MatrixRainSvelteProps = {}) {
  let canvas: HTMLCanvasElement | undefined;
  let instance: MatrixRain | null = null;

  onMount(() => {
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

    return () => {
      instance?.destroy();
      instance = null;
    };
  });

  return { canvas, className: props.className };
}
