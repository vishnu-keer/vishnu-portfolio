import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  return (
    <div
      className="min-h-screen bg-black tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Fixed navigation, shared across every section */}
      <Nav />

      {/* Section 1 — Hero with the cursor spotlight reveal */}
      <Hero />

      {/* Section 2 — About / founder story */}
      <About />

      {/* Section 3 — Contact + footer */}
      <Contact />
    </div>
  );
}
