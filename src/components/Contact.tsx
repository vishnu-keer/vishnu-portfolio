import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Phone, Mail, Globe, MessageCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SERVICES = [
  '3D/WebGL Experience',
  'Website Development',
  'UI/UX & Logo Design',
  'E-commerce Store',
  'Mobile App',
  'SEO & Marketing',
  'AI Automation',
];

const inputClasses =
  'bg-white/10 border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40 transition-colors';

export default function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // No backend required: compose a prefilled email so the form works on day one.
  // Swap this for Formspree / Resend / a Supabase edge function when ready.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project inquiry — ${form.name || 'Website'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\n\n${form.message}`,
    );
    window.location.href = `mailto:webro284@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black py-24 px-6 md:px-20 border-t border-white/10"
    >
      <div ref={ref} className="grid md:grid-cols-2 gap-16">
        {/* Left column — pitch + details */}
        <div
          className={inView ? 'hero-anim hero-fade' : 'opacity-0'}
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
            Let's build something <span className="font-playfair italic">worth remembering</span>.
          </h2>

          <p className="text-white/70 mt-4 max-w-sm">
            Tell me about your project and I'll get back within 24 hours.
          </p>

          <div className="mt-8 space-y-3 text-white/80 text-sm">
            <div className="flex flex-wrap items-center gap-3">
              <Phone size={16} className="text-white/50 shrink-0" />
              <a href="tel:+916377093356" className="hover:text-white transition-colors">
                +91 63770 93356
              </a>
              <a
                href="https://wa.me/916377093356"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-xs hover:bg-white/20 hover:text-white transition-colors"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={16} className="text-white/50 shrink-0" />
              <a href="mailto:webro284@gmail.com" className="hover:text-white transition-colors">
                webro284@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Globe size={16} className="text-white/50 shrink-0" />
              <a
                href="https://webro.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                webro.studio
              </a>
            </div>
          </div>
        </div>

        {/* Right column — form */}
        <form
          onSubmit={onSubmit}
          className={`bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col gap-4 ${
            inView ? 'hero-anim hero-fade' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="Name"
            aria-label="Name"
            className={inputClasses}
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="Email"
            aria-label="Email"
            className={inputClasses}
          />
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone"
            aria-label="Phone"
            className={inputClasses}
          />

          <select
            name="service"
            value={form.service}
            onChange={onChange}
            aria-label="Service"
            className={`${inputClasses} ${form.service ? 'text-white' : 'text-white/40'} [&>option]:text-gray-900`}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            rows={4}
            placeholder="Project details"
            aria-label="Project details"
            className={inputClasses}
          />

          <button
            type="submit"
            className="bg-white text-gray-900 font-semibold rounded-full px-6 py-3 hover:bg-gray-100 transition-colors"
          >
            Send message
          </button>

          {sent && (
            <p className="text-white/60 text-xs text-center">
              Opening your email app — or reach me directly at webro284@gmail.com.
            </p>
          )}
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white/50 text-xs">
        <div className="flex flex-col gap-1 max-w-md">
          <span className="font-playfair italic text-white text-sm">webro.studio</span>
          <span>
            Immersive 3D web experiences, design &amp; AI automation — built for brands worldwide.
          </span>
        </div>
        <span>© 2026 WEBRO. All rights reserved.</span>
      </footer>
    </section>
  );
}
