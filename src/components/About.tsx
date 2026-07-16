import { useInView } from '../hooks/useInView';

interface Stat {
  number: string;
  label: string;
}

const stats: Stat[] = [
  { number: '7–14 Days', label: 'Avg. Turnaround' },
  { number: '5+', label: 'Service Verticals' },
  { number: 'India + Global', label: 'Clients Served' },
  { number: '3D + AI', label: 'Signature Approach' },
];

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative w-full bg-black py-24 md:py-32 px-6 md:px-20">
      <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left column — story */}
        <div
          className={inView ? 'hero-anim hero-fade' : 'opacity-0'}
          style={{ animationDelay: '0.1s' }}
        >
          <p className="text-white/50 uppercase tracking-widest text-xs font-medium">About</p>

          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mt-4">
            Building brands that <span className="font-playfair italic">feel alive</span>.
          </h2>

          <div className="text-white/70 text-base leading-relaxed mt-6 space-y-4">
            <p>
              I'm Vishnu, founder and CEO of WEBRO — an AI-first web studio building cinematic,
              high-converting websites for restaurants, cafes, hotels, startups and international
              brands.
            </p>
            <p>
              My focus is simple: blend real-time 3D, clean engineering and AI automation so every
              site we ship doesn't just look good — it performs, ranks, and turns visitors into
              paying clients.
            </p>
          </div>
        </div>

        {/* Right column — stats */}
        <div
          className={`grid grid-cols-2 gap-4 sm:gap-6 ${inView ? 'hero-anim hero-fade' : 'opacity-0'}`}
          style={{ animationDelay: '0.25s' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-1"
            >
              <span className="text-white text-3xl sm:text-4xl font-playfair italic">
                {s.number}
              </span>
              <span className="text-white/60 text-xs sm:text-sm uppercase tracking-wide">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
