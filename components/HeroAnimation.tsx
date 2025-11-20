import React, { useEffect, useRef } from 'react';

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;

    // Configuration
    const TEXT = "MAI";
    const FONT_SIZE = 160;
    const PARTICLE_DENSITY = 6; // Lower is more particles
    const DEPTH = 60;
    const COLOR = '#00ffc4';
    const CONNECTION_DIST = 35;

    // Resize canvas
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      z: number;
      originX: number;
      originY: number;
      originZ: number;
      size: number;
      
      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.originX = x;
        this.originY = y;
        this.originZ = z;
        this.size = Math.random() * 2 + 1;
      }

      update(rotationX: number, rotationY: number) {
        // 3D Rotation Logic
        const cosX = Math.cos(rotationX);
        const sinX = Math.sin(rotationX);
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);

        // Rotate around Y
        let x1 = this.originX * cosY - this.originZ * sinY;
        let z1 = this.originZ * cosY + this.originX * sinY;

        // Rotate around X
        let y1 = this.originY * cosX - z1 * sinX;
        let z2 = z1 * cosX + this.originY * sinX;

        this.x = x1;
        this.y = y1;
        this.z = z2;
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number) {
        // Perspective Projection
        const fov = 300;
        const scale = fov / (fov + this.z);
        const x2d = this.x * scale + centerX;
        const y2d = this.y * scale + centerY;
        
        // Glitch jitter
        const jitter = Math.random() > 0.98 ? (Math.random() - 0.5) * 5 : 0;

        ctx.globalAlpha = Math.max(0.1, scale - 0.2); // Fade out back particles
        ctx.fillStyle = COLOR;
        ctx.beginPath();
        ctx.arc(x2d + jitter, y2d, this.size * scale, 0, Math.PI * 2);
        ctx.fill();

        return { x: x2d, y: y2d, scale };
      }
    }

    const initParticles = () => {
      particles = [];
      // Draw text to an offscreen canvas to get pixel data
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCanvas.width = 600;
      tempCanvas.height = 300;

      tempCtx.font = `900 ${FONT_SIZE}px "Fira Code", monospace`;
      tempCtx.fillStyle = 'white';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(TEXT, tempCanvas.width / 2, tempCanvas.height / 2);

      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const { data, width, height } = imageData;

      for (let y = 0; y < height; y += PARTICLE_DENSITY) {
        for (let x = 0; x < width; x += PARTICLE_DENSITY) {
          const index = (y * width + x) * 4;
          if (data[index + 3] > 128) {
            // If pixel is non-transparent, create a particle
            // Center the coordinates
            const pX = x - width / 2;
            const pY = y - height / 2;
            
            // Create multiple layers for 3D volume
            // Front layer
            particles.push(new Particle(pX, pY, -DEPTH/2));
            // Back layer
            particles.push(new Particle(pX, pY, DEPTH/2));
            // Random internal particles for volume
            if (Math.random() > 0.7) {
               particles.push(new Particle(pX, pY, (Math.random() - 0.5) * DEPTH));
            }
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Auto rotate + Mouse influence
      const time = Date.now() * 0.001;
      const rotY = time * 0.5 + (mouseX / canvas.width - 0.5) * 2;
      const rotX = (mouseY / canvas.height - 0.5) * 1;

      const projectedPoints: {x: number, y: number, scale: number}[] = [];

      particles.forEach(p => {
        p.update(rotX, rotY);
        const point = p.draw(ctx, centerX, centerY);
        projectedPoints.push(point);
      });

      // Draw Neural Connections
      ctx.strokeStyle = COLOR;
      ctx.lineWidth = 0.5;
      
      // Optimization: Only check a subset or nearby points to avoid O(n^2)
      // For simplicity in this demo, checking random pairs or neighbors
      for (let i = 0; i < projectedPoints.length; i++) {
        // Only connect random particles to avoid too many lines
        if (Math.random() > 0.95) { 
           const p1 = projectedPoints[i];
           // Connect to a nearby particle in the array (spatial locality is roughly preserved from scan)
           const neighborIndex = Math.floor(i + (Math.random() * 20 - 10));
           if (neighborIndex >= 0 && neighborIndex < projectedPoints.length) {
             const p2 = projectedPoints[neighborIndex];
             const dx = p1.x - p2.x;
             const dy = p1.y - p2.y;
             const dist = Math.sqrt(dx*dx + dy*dy);

             if (dist < CONNECTION_DIST) {
               ctx.globalAlpha = (1 - dist / CONNECTION_DIST) * 0.4; // Fade based on distance
               ctx.beginPath();
               ctx.moveTo(p1.x, p1.y);
               ctx.lineTo(p2.x, p2.y);
               ctx.stroke();
             }
           }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    
    handleResize(); // Init
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full relative group cursor-crosshair">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,196,0.1)_0%,transparent_70%)] blur-xl pointer-events-none"></div>
        <canvas ref={canvasRef} className="w-full h-full block" />
        {/* Floating label */}
        <div className="absolute bottom-4 right-4 text-[10px] text-accent font-mono opacity-50">
            NEURAL_PROJECTION_MATRIX // INTERACTIVE
        </div>
    </div>
  );
};

export default HeroAnimation;
