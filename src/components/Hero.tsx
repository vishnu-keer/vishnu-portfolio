import { useEffect, useRef, useState } from 'react';
import RevealLayer from './RevealLayer';

const SPOTLIGHT_R = 260;
const BASE_IMAGE = './images/Base_image.png';
const REVEAL_IMAGE = './images/Reveal_image.png';

export default function Hero() {
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  const mouse = useRef({ x: -999, y: -999 }); // raw pointer
  const smooth = useRef({ x: -999, y: -999 }); // eased pointer
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden h-screen bg-black"
      style={{ height: '100dvh' }}
    >
      {/* 1. Base image (z-10) — slow Ken Burns zoom-out on load */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat hero-zoom z-10"
        style={{ backgroundImage: `url(${BASE_IMAGE})` }}
      />

      {/* 2. Reveal layer (z-30) — second image behind the spotlight mask */}
      <RevealLayer
        image={REVEAL_IMAGE}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
        radius={SPOTLIGHT_R}
      />

      {/* 3. Heading (z-50) */}
      <div
        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-start text-left px-5 pointer-events-none z-50"
        style={{ left: '80px' }}
      >
        <h1 className="text-white leading-[0.95]">
          <span
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
          >
            I'm
          </span>
          <span
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
          >
            VISHNU
          </span>
          <span
            className="block font-playfair italic text-white/90 text-base sm:text-lg md:text-xl mt-3 sm:mt-4 hero-anim hero-reveal"
            style={{ letterSpacing: '-0.02em', animationDelay: '0.58s' }}
          >
            Founder &amp; CEO, WEBRO
          </span>
        </h1>
      </div>

      {/* 4. Bottom-left paragraph (z-50) */}
      <div
        className="hidden sm:block absolute bottom-14 max-w-[260px] z-50 hero-anim hero-fade"
        style={{ left: '100px', animationDelay: '0.7s' }}
      >
        <p className="text-sm text-white/80 leading-relaxed">
          I build AI-first digital experiences — immersive 3D, fast websites, and automation
          systems — for brands who want to stand out and convert.
        </p>
      </div>

      {/* 5. Bottom-right block (z-50) — no CTA here, CTA lives in the nav */}
      <div
        className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          I help restaurants, cafes, hotels and startups turn visitors into clients with
          cinematic web design and AI automation.
        </p>
      </div>
    </section>
  );
}
