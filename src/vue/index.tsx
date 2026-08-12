import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue';
import { MatrixRain } from '../MatrixRain';

export interface MatrixRainVueProps {
  className?: string;
  style?: Record<string, string | number>;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fadeAlpha?: number;
  speed?: number;
  characters?: string;
}

export const MatrixRainVue = defineComponent({
  name: 'MatrixRainVue',
  props: {
    className: String,
    style: Object,
    color: String,
    backgroundColor: String,
    fontSize: Number,
    fadeAlpha: Number,
    speed: Number,
    characters: String,
  },
  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    let instance: MatrixRain | null = null;

    onMounted(() => {
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
    });

    onBeforeUnmount(() => {
      instance?.destroy();
      instance = null;
    });

    return () =>
      h('canvas', {
        ref: canvasRef,
        class: props.className,
        style: props.style,
      });
  },
});
