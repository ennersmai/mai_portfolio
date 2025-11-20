import React, { useState, useEffect } from 'react';
import { BIO, SKILLS, PROJECTS } from './constants';
import ProjectCard from './components/ProjectCard';
import Terminal from './components/Terminal';
import GlitchText from './components/GlitchText';
import HeroAnimation from './components/HeroAnimation';
import PPHWidget from './components/PPHWidget';
import MaiLogo3D from './components/MaiLogo3D';
import ScrollLayout from './components/ScrollLayout';
import CyberReveal from './components/CyberReveal';
import ScrambleText from './components/ScrambleText';

function App() {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler for anchor links with custom easing
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 64; // Height of fixed header (h-16 = 64px)
      const startPosition = window.pageYOffset;
      const elementPosition = element.getBoundingClientRect().top;
      const targetPosition = elementPosition + startPosition - headerOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // Slower scroll duration (1.2 seconds)
      let start: number | null = null;

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern bg-[length:40px_40px] text-white selection-invert">
      
      {/* --- FIXED HUD LAYER (Outside Scroll Context) --- */}
      
      {/* Sidebar HUD */}
      <div className="fixed left-0 top-0 h-full w-12 border-r border-zinc-900 z-50 hidden lg:flex flex-col justify-between items-center py-8 bg-background/80 backdrop-blur-sm pointer-events-auto">
         <div className="text-xs font-mono text-accent vertical-text tracking-widest transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
           SYSTEMS_ENGINEER_PORTFOLIO
         </div>
         <div className="flex flex-col gap-4">
            {/* Dynamic scroll indicator linked to real scroll position for feedback */}
            <div className="w-1 h-24 bg-zinc-800 relative overflow-hidden">
               <div className="absolute w-full bg-accent transition-transform duration-75" style={{ height: '100%', transform: `translateY(${(scrolled / (document.body.scrollHeight - window.innerHeight)) * 100}%)` }}></div>
            </div>
         </div>
         <div className="text-xs font-mono text-gray-600">v3.0</div>
      </div>

      {/* Topbar HUD */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-zinc-800 bg-background/90 backdrop-blur z-40 flex items-center justify-between px-6 lg:pl-20 pointer-events-auto">
           <div className="flex items-center gap-4 font-bold text-xl tracking-tight">
             <MaiLogo3D />
             <div className="hidden sm:block">
                <span className="text-accent">{`{ `}</span>
                FULL_STACK_ARCHITECT
                <span className="text-accent">{` }`}</span>
             </div>
           </div>
           <nav className="hidden md:flex gap-8 text-sm font-mono">
             <a href="#experience" onClick={(e) => handleSmoothScroll(e, 'experience')} className="hover:text-accent transition-colors cursor-pointer">./EXPERIENCE</a>
             <a href="#projects" onClick={(e) => handleSmoothScroll(e, 'projects')} className="hover:text-accent transition-colors cursor-pointer">./PROJECTS</a>
             <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-accent transition-colors cursor-pointer">./CONTACT</a>
           </nav>
      </header>


      {/* --- FLUID DATA STREAM LAYER (Inside Physics Engine) --- */}
      <ScrollLayout className="lg:pl-12">
        
        {/* Hero Section - No CyberReveal for immediate impact, just standard intro */}
        <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 pt-20 border-b border-zinc-900 relative overflow-hidden">
          
          {/* Left Column: Text */}
          <div className="max-w-4xl z-20 flex-shrink-0">
            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/5 px-3 py-1 mb-6 text-accent text-xs font-mono">
              <div className="w-2 h-2 bg-accent animate-pulse"></div>
              SYSTEM STATUS: OPERATIONAL
            </div>
            
            <GlitchText 
              as="h1" 
              text="10+ YEARS BUILDING" 
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-2 block"
            />
            <GlitchText 
              as="h1" 
              text="HIGH-PERFORMANCE SYSTEMS" 
              className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none mb-8 block text-gray-400"
            />
            
            <p className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed font-light border-l-4 border-accent pl-6 mb-12">
              {BIO.subhead} <br/>
              <span className="text-white mt-2 block">{BIO.summary}</span>
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#terminal" onClick={(e) => handleSmoothScroll(e, 'terminal')} className="px-8 py-4 bg-accent text-black font-bold hover:bg-white transition-all shadow-[4px_4px_0px_0px_#ffffff] cursor-pointer">
                INITIATE_CHAT
              </a>
              <a href="#projects" onClick={(e) => handleSmoothScroll(e, 'projects')} className="px-8 py-4 border border-zinc-700 hover:border-accent text-white hover:text-accent transition-all cursor-pointer">
                VIEW_PROJECTS
              </a>
            </div>
          </div>

          {/* Right Column: Animation */}
          <div className="hidden lg:flex w-full h-[600px] max-w-[600px] relative z-10 items-center justify-center p-8">
             <HeroAnimation />
          </div>

          <div className="absolute right-0 bottom-0 w-1/3 h-full border-l border-zinc-900 opacity-50 pointer-events-none bg-[linear-gradient(45deg,transparent_25%,rgba(0,255,196,0.05)_25%,rgba(0,255,196,0.05)_50%,transparent_50%,transparent_75%,rgba(0,255,196,0.05)_75%,rgba(0,255,196,0.05)_100%)] bg-[length:20px_20px]"></div>
        </section>

        {/* Skills / Capabilities */}
        <section id="experience" className="py-32 px-6 lg:px-20 border-b border-zinc-900">
          <CyberReveal>
            <div className="flex items-center gap-4 mb-16">
               <ScrambleText text="CAPABILITIES_MATRIX" className="text-3xl font-bold" />
               <div className="flex-grow h-px bg-zinc-800"></div>
            </div>
          </CyberReveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILLS.map((category, idx) => (
              <CyberReveal key={idx}>
                <div className="border-t border-zinc-800 pt-6 hover:border-accent transition-colors group bg-surface/20 p-4 hover:bg-surface/40">
                  <h3 className="text-xl font-bold text-white mb-6 group-hover:text-accent">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="text-sm text-gray-400 flex items-center gap-2 font-mono">
                        <span className="text-accent/50">{'>'}</span> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </CyberReveal>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 lg:px-20 border-b border-zinc-900 bg-surface/30">
          <CyberReveal>
            <div className="flex items-center gap-4 mb-16">
               <ScrambleText text="DEPLOYED_ARCHITECTURES" className="text-3xl font-bold" />
               <div className="flex-grow h-px bg-zinc-800"></div>
               <div className="text-xs font-mono text-accent">INDEX: 04</div>
            </div>
          </CyberReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
            {PROJECTS.map((project, i) => (
              <CyberReveal key={project.id}>
                <ProjectCard project={project} />
              </CyberReveal>
            ))}
          </div>
        </section>

        {/* Terminal / Gemini Section */}
        <section id="terminal" className="py-32 px-6 lg:px-20 border-b border-zinc-900 relative">
          <CyberReveal>
            <div className="text-center mb-12">
              <ScrambleText text="INTERACTIVE_NEURAL_LINK" className="text-3xl font-bold mb-4" />
              <p className="text-gray-400">Ask about my background, tech stack, or specific implementation details.</p>
            </div>
            <Terminal />
          </CyberReveal>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-32 px-6 lg:px-20 bg-black border-t border-zinc-900">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Contact Info */}
            <CyberReveal className="text-left">
                <h2 className="text-4xl font-bold mb-6 text-white">READY TO SCALE?</h2>
                <p className="text-gray-500 mb-8 text-lg leading-relaxed">
                    I operate as a vertical technical partner. From bare-metal to the browser, let's engineer your next breakthrough.
                </p>
                <div className="flex flex-col gap-4 font-mono text-sm">
                    <a href="https://wa.me/359889074939" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-accent transition-colors w-fit group">
                        <span className="text-accent opacity-50 group-hover:opacity-100">{'>'}</span> 
                        WHATSAPP: +359 88 907 4939
                    </a>
                    <a href="mailto:ennersmai@gmail.com" className="flex items-center gap-3 text-white hover:text-accent transition-colors w-fit group">
                        <span className="text-accent opacity-50 group-hover:opacity-100">{'>'}</span>
                        EMAIL: ennersmai@gmail.com
                    </a>
                     <a href="https://github.com/ennersmai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white hover:text-accent transition-colors w-fit group">
                        <span className="text-accent opacity-50 group-hover:opacity-100">{'>'}</span>
                        GITHUB: @ennersmai
                    </a>
                </div>
            </CyberReveal>
            
            {/* PPH Widget */}
            <CyberReveal className="flex justify-center md:justify-end">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-b from-accent/20 to-transparent opacity-20 blur-sm"></div>
                  <div className="border border-zinc-800 p-4 bg-zinc-900/50 backdrop-blur rounded-sm relative z-10">
                      <div className="text-xs text-center text-accent mb-4 font-mono tracking-widest">VERIFIED_PARTNER</div>
                      <PPHWidget />
                  </div>
                </div>
            </CyberReveal>
          </div>
          
          <div className="mt-24 text-center text-xs text-zinc-800 font-mono border-t border-zinc-900 pt-8">
            SYSTEM_ID: 8492-AE-33 • LAST_UPDATED: 2025 • LOC: GLOBAL
          </div>
        </footer>

      </ScrollLayout>
    </div>
  );
}

export default App;