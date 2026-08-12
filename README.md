# Matrix Digital Rain Effect

A lightweight, high-performance library implementing the iconic falling green code from *The Matrix*, built with plain **HTML5 Canvas 2D** and **TypeScript**. Powered by [Rslib](https://lib.rsbuild.dev/) for fast and modern library bundling.

---

## Features

* **Zero Dependencies:** Pure vanilla Canvas API—no heavy frameworks or external dependencies required.
* **Classic Cyberpunk Aesthetic:** Features dynamic Katakana and numerical glyphs with trailing fade effects.
* **Optimized Performance:** Uses a translucent fill technique (`rgba(0, 0, 0, 0.05)`) instead of heavy clearing to create smooth motion trails.
* **Framework-Ready:** Designed with clean lifecycle methods (`start` / `destroy`), making it easy to wrap into custom components for React, Vue, Svelte, or other frameworks.

---

## Installation

```bash
npm install matrix-digital-rain

```

---

## Quick Start

```html
<canvas id="matrix-canvas"></canvas>

<script type="module">
  import { MatrixRain } from 'matrix-digital-rain';

  const canvas = document.getElementById('matrix-canvas');
  
  const matrix = new MatrixRain({
    canvas,
    fontSize: 16,
    color: '#00FF66',
    fadeAlpha: 0.05
  });

  matrix.start();
</script>

```

---

## API Reference

### `MatrixRain` Options

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `canvas` | `HTMLCanvasElement` | *Required* | The target HTML5 canvas element. |
| `fontSize` | `number` | `16` | Font size of the falling glyphs in pixels. |
| `color` | `string` | `'#00FF66'` | The primary text color for the rain. |
| `fadeAlpha` | `number` | `0.05` | Opacity of the background trail wipe (lower = longer trails). |
| `characters` | `string` | Katakana + Digits | Custom character set used for the digital rain. |

### Methods

* **`start()`**: Initializes the columns, sets up event listeners, and begins the `requestAnimationFrame` loop.
* **`destroy()`**: Stops the animation loop and removes window event listeners to prevent memory leaks.

---

## Development & Building

This project is built using [Rslib](https://lib.rsbuild.dev/).

### Setup

```bash
git clone https://github.com/your-username/matrix-digital-rain.git
cd matrix-digital-rain
npm install

```

### Build for Production

```bash
npm run build

```

### Development Watch Mode

```bash
npm run dev

```

---

## License

MIT
