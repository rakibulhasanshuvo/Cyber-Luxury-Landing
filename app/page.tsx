import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-accent-1/30 selection:text-white overflow-x-hidden">
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-radial-to-br from-accent-1/12 via-accent-2/10 to-transparent blur-[120px] aurora-animate" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-radial-to-bl from-accent-3/12 via-accent-4/10 to-transparent blur-[120px] aurora-animate" style={{ animationDelay: "-8s" }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
      </div>

      <Navbar />
      
      <main>
        <Hero />
        <Marquee />
        <Portfolio />
        <About />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      
      {/* Back to Top */}
      <a
        href="#"
        className="fixed bottom-8 right-8 w-12 h-12 bg-accent-1/10 border border-border-subtle backdrop-blur-md rounded-full flex items-center justify-center text-accent-1 hover:bg-accent-1 hover:text-white transition-all shadow-xl z-50 group hover:translate-y-[-4px]"
        id="back-to-top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-[-2px] transition-transform"><path d="m18 15-6-6-6 6"/></svg>
      </a>
    </div>
  );
}
