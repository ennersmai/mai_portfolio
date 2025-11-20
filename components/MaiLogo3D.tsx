import React from 'react';

const MaiLogo3D: React.FC = () => {
  return (
    <div className="w-8 h-8 md:w-10 md:h-10 relative perspective-container group cursor-pointer">
        <div className="cube w-full h-full relative preserve-3d animate-spin-slow">
             {/* Faces */}
             <div className="face front absolute inset-0 border border-accent bg-black/80 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-accent select-none tracking-tighter shadow-[0_0_10px_rgba(0,255,196,0.2)]">Mai</div>
             <div className="face back absolute inset-0 border border-accent bg-black/80 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-accent select-none tracking-tighter shadow-[0_0_10px_rgba(0,255,196,0.2)]">Mai</div>
             <div className="face right absolute inset-0 border border-accent bg-black/80 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-accent select-none tracking-tighter shadow-[0_0_10px_rgba(0,255,196,0.2)]">Mai</div>
             <div className="face left absolute inset-0 border border-accent bg-black/80 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-accent select-none tracking-tighter shadow-[0_0_10px_rgba(0,255,196,0.2)]">Mai</div>
             
             {/* Top/Bottom caps */}
             <div className="face top absolute inset-0 border border-accent bg-accent/20"></div>
             <div className="face bottom absolute inset-0 border border-accent bg-accent/20"></div>
        </div>
        
        <style>{`
            .perspective-container {
                perspective: 800px;
            }
            .preserve-3d {
                transform-style: preserve-3d;
            }
            .cube {
                animation: rotateCube 6s infinite linear;
            }
            .group:hover .cube {
                animation-play-state: paused;
            }
            .face {
                backface-visibility: visible;
            }
            /* Translate Z distance must be half of width/height (which is w-10 = 2.5rem = 40px usually, or w-8=2rem=32px) */
            /* Using CSS variables or calculated values would be best, but hardcoded for specific tailwind classes works for this fixed size */
            
            /* For w-10 (approx 40px) */
            @media (min-width: 768px) {
                .front  { transform: translateZ(20px); }
                .back   { transform: rotateY(180deg) translateZ(20px); }
                .right  { transform: rotateY(90deg) translateZ(20px); }
                .left   { transform: rotateY(-90deg) translateZ(20px); }
                .top    { transform: rotateX(90deg) translateZ(20px); }
                .bottom { transform: rotateX(-90deg) translateZ(20px); }
            }
            
            /* For w-8 (approx 32px) */
            @media (max-width: 767px) {
                .front  { transform: translateZ(16px); }
                .back   { transform: rotateY(180deg) translateZ(16px); }
                .right  { transform: rotateY(90deg) translateZ(16px); }
                .left   { transform: rotateY(-90deg) translateZ(16px); }
                .top    { transform: rotateX(90deg) translateZ(16px); }
                .bottom { transform: rotateX(-90deg) translateZ(16px); }
            }

            @keyframes rotateCube {
                0% { transform: rotateX(-15deg) rotateY(0deg); }
                100% { transform: rotateX(-15deg) rotateY(360deg); }
            }
        `}</style>
    </div>
  );
};

export default MaiLogo3D;