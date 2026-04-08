import AboutPortrait from "./AboutPortrait";
import AboutCategories from "./AboutCategories";

export default function About() {
  return (
    <section id="about" className="py-48 relative overflow-hidden bg-bg-primary">
      {/* Decorative background orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent-1/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent-3/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">
          
          {/* Left Column: Image/Portrait */}
          <AboutPortrait />

          {/* Right Column: Content */}
          <AboutCategories />

        </div>
      </div>
    </section>
  );
}
