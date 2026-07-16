import { useEffect, useRef } from 'react';

interface RevealLayerProps {
  /** Image revealed under the spotlight (sits on top of the base image). */
  image: string;
  /** Smoothed cursor X in viewport coordinates. */
  cursorX: number;
  /** Smoothed cursor Y in viewport coordinates. */
  cursorY: number;
  /** Spotlight radius in px (SPOTLIGHT_R). */
  radius: number;
}

/**
 * Reveals `image` only inside a soft, glowing circle that trails the cursor.
 *
 * How it works: a hidden canvas is painted every frame with a radial-gradient
 * disc at the cursor. That canvas is exported to a data URL and applied as a
 * CSS mask on the reveal <div>. White areas of the mask show the image,
 * transparent areas hide it — so the second image only appears inside the
 * feathered spotlight.
 */
export default function RevealLayer({ image, cursorX, cursorY, radius }: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // Keep the canvas sized to the viewport (mount + resize).
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Repaint the mask on every render (i.e. every time the cursor moves).
  useEffect(() => {
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    if (!canvas || !reveal) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      radius,
    );
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
    gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, radius, 0, Math.PI * 2);
    ctx.fill();

    const mask = `url(${canvas.toDataURL()})`;
    reveal.style.setProperty('mask-image', mask);
    reveal.style.setProperty('-webkit-mask-image', mask);
    reveal.style.setProperty('mask-size', '100% 100%');
    reveal.style.setProperty('-webkit-mask-size', '100% 100%');
    reveal.style.setProperty('mask-repeat', 'no-repeat');
    reveal.style.setProperty('-webkit-mask-repeat', 'no-repeat');
  });

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: 'none' }}
      />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
}
