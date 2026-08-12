/** @jsxImportSource @builder.io/qwik */
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { MatrixRain } from '../MatrixRain';

export interface MatrixRainQwikProps {
  class?: string;
  style?: Record<string, string | number>;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fadeAlpha?: number;
  speed?: number;
  characters?: string;
}

export const MatrixRainQwik = component$((props: MatrixRainQwikProps) => {
  const canvasRef = useSignal<HTMLCanvasElement | undefined>();
  let instance: MatrixRain | null = null;

  useVisibleTask$(() => {
    if (!canvasRef.value) {
      return;
    }

    instance = new MatrixRain({
      canvas: canvasRef.value,
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

  return (
    <canvas
      ref={canvasRef}
      class={props.class}
      style={props.style}
    />
  );
});
