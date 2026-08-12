import { useEffect, useRef, type CSSProperties } from 'react';
import { MatrixRain } from '../MatrixRain';

/** @jsxImportSource react */

export interface MatrixRainReactProps {
  className?: string;
  style?: CSSProperties;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fadeAlpha?: number;
  speed?: number;
  characters?: string;
}

export function MatrixRainReact(props: MatrixRainReactProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const instanceRef = useRef<MatrixRain | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    instanceRef.current = new MatrixRain({
      canvas,
      color: props.color ?? '#00FF66',
      backgroundColor: props.backgroundColor ?? 'rgba(0, 0, 0, 0.07)',
      fontSize: props.fontSize ?? 16,
      fadeAlpha: props.fadeAlpha ?? 0.08,
      speed: props.speed ?? 1,
      characters: props.characters,
    });

    instanceRef.current.start();

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [props.color, props.backgroundColor, props.fontSize, props.fadeAlpha, props.speed, props.characters]);

  return (
    <canvas
      ref={canvasRef}
      className={props.className}
      style={props.style}
    />
  );
}
