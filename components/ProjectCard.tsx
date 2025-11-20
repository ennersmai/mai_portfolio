import React, { useState, useRef, MouseEvent } from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate rotation between -10 and 10 degrees
    const rotateY = ((mouseX / width) - 0.5) * 20; 
    const rotateX = ((mouseY / height) - 0.5) * -20; 

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };

  const cardStyle = {
    transform: isHovering 
      ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`group relative border border-zinc-800 bg-surface flex flex-col will-change-transform ${project.isFlagship ? 'md:col-span-2 border-accent/50' : ''}`}
    >
      {/* Glitch Overlay on Hover */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-0 mix-blend-overlay" />
      
      {/* Shine Effect */}
      {isHovering && (
        <div 
          className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-gradient-to-tr from-transparent via-white to-transparent"
          style={{
            transform: `translateZ(1px)`, // Ensure it sits above
            mixBlendMode: 'overlay',
          }}
        />
      )}

      {/* Image Section */}
      <div className="h-64 w-full overflow-hidden border-b border-zinc-800 relative grayscale group-hover:grayscale-0 transition-all duration-500 flex-shrink-0" style={{ transform: 'translateZ(20px)' }}>
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 origin-top" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
        
        {/* Flagship Badge */}
        {project.isFlagship && (
          <div className="absolute top-4 right-4 bg-accent text-black px-3 py-1 font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(0,255,196,0.5)]">
            FLAGSHIP_DEPLOYMENT
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative z-10" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              [{project.role}]
            </span>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow font-light border-l-2 border-zinc-800 pl-4 group-hover:border-accent transition-colors">
          {project.description}
        </p>

        {/* Stats Grid */}
        {project.stats && (
          <div className="grid grid-cols-2 gap-4 mb-6 border-t border-b border-zinc-900 py-4 bg-black/20">
            {project.stats.map((stat, i) => (
              <div key={i}>
                <div className="text-xs text-gray-600 uppercase">{stat.label}</div>
                <div className="text-accent font-mono font-bold">{stat.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs border border-zinc-700 px-2 py-1 text-gray-400 font-mono hover:border-accent hover:text-white transition-colors">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;