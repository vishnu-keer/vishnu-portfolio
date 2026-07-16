import { useState } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * WEBRO mark. Prefers your real logo at public/images/logo.png; if that file
 * isn't present it falls back to a crisp SVG rendition so the nav is never broken.
 * To use your exact logo: just drop the image at public/images/logo.png — no code change needed.
 */
function Logo() {
  const [useImg, setUseImg] = useState(true);

  if (useImg) {
    return (
      <img
        src="./images/logo.png"
        alt="WEBRO"
        className="h-[30px] w-auto object-contain"
        onError={() => setUseImg(false)}
      />
    );
  }

  return (
    <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polyline points="24,32 40,22 56,31 74,19" stroke="#8BC34A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="32" r="4" fill="#8BC34A" />
      <circle cx="40" cy="22" r="4" fill="#8BC34A" />
      <circle cx="56" cy="31" r="4" fill="#8BC34A" />
      <circle cx="74" cy="19" r="4.5" fill="#8BC34A" />
      <path d="M18 34 L30 74 L50 48 L70 74 L82 34" stroke="#7CB342" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="55" r="12" fill="#F3EEE0" />
      <g stroke="#3f6b2f" strokeWidth="1.4" fill="none">
        <circle cx="50" cy="55" r="12" />
        <ellipse cx="50" cy="55" rx="5" ry="12" />
        <line x1="38" y1="55" x2="62" y2="55" />
        <line x1="50" y1="43" x2="50" y2="67" />
        <path d="M40 49 Q50 53 60 49" />
        <path d="M40 61 Q50 57 60 61" />
      </g>
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        {/* Left: mark + wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            go('hero');
          }}
          className="flex items-center gap-2"
          aria-label="webro.studio — back to top"
        >
          <Logo />
          <span className="font-playfair italic text-white text-lg">webro.studio</span>
        </a>

        {/* Center pill (desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              go('about');
            }}
            className="text-white/80 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go('contact');
            }}
            className="text-white/80 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right: CTA (desktop) */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            go('contact');
          }}
          className="hidden md:block bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          Let's talk
        </a>

        {/* Right: hamburger (mobile) */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white p-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      {/* Full-screen mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-5 right-5 text-white p-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              go('about');
            }}
            className="text-white text-3xl font-playfair italic"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go('contact');
            }}
            className="text-white text-3xl font-playfair italic"
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go('contact');
            }}
            className="bg-white text-gray-900 text-base font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Let's talk
          </a>
        </div>
      )}
    </>
  );
}
