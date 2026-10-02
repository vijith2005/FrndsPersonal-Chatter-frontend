import { useEffect, useRef } from 'react';
import useThemeStore from '../store/themeStore';

export default function CyberpunkBackground() {
  const { theme } = useThemeStore();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let gridOffset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.3,
        color: ['#00F0FF', '#FF00E5', '#7B2FFF', '#00FF88'][Math.floor(Math.random() * 4)],
      });
    }

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;

      const gridSize = 60;
      gridOffset = (gridOffset + 0.2) % gridSize;

      // Vertical lines
      for (let x = gridOffset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = gridOffset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const drawParticles = () => {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });
    };

    const drawScanLines = () => {
      const time = Date.now() * 0.001;
      const scanY = (time * 50) % canvas.height;

      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 240, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 50, canvas.width, 100);
    };

    const drawNeonPulses = () => {
      const time = Date.now() * 0.001;

      // Pulsing neon orbs
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.2 + i * 0.3);
        const y = canvas.height * 0.5 + Math.sin(time + i) * 100;
        const radius = 100 + Math.sin(time * 2 + i) * 30;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${i === 0 ? '0, 240, 255' : i === 1 ? '255, 0, 229' : '123, 47, 255'}, 0.05)`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid();
      drawNeonPulses();
      drawParticles();
      drawScanLines();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <>
      {/* Animated canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.8 }}
      />

      {/* Cyber grid overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none cyber-grid opacity-20"
      />

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" fill="none" stroke="#00F0FF" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="3" fill="#00F0FF" opacity="0.5" />
        </svg>
      </div>
      <div className="fixed top-0 right-0 w-32 h-32 z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30" style={{ transform: 'scaleX(-1)' }}>
          <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" fill="none" stroke="#FF00E5" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="3" fill="#FF00E5" opacity="0.5" />
        </svg>
      </div>
      <div className="fixed bottom-0 left-0 w-32 h-32 z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30" style={{ transform: 'scaleY(-1)' }}>
          <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" fill="none" stroke="#7B2FFF" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="3" fill="#7B2FFF" opacity="0.5" />
        </svg>
      </div>
      <div className="fixed bottom-0 right-0 w-32 h-32 z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30" style={{ transform: 'scale(-1)' }}>
          <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" fill="none" stroke="#00FF88" strokeWidth="0.5" />
          <circle cx="20" cy="20" r="3" fill="#00FF88" opacity="0.5" />
        </svg>
      </div>

      {/* Floating neon lines */}
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute h-px w-full opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent, #00F0FF, transparent)',
            animation: 'neonLine 8s linear infinite',
          }}
        />
        <div
          className="absolute h-px w-full opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent, #FF00E5, transparent)',
            animation: 'neonLine 12s linear infinite',
            animationDelay: '4s',
          }}
        />
        <div
          className="absolute w-px h-full opacity-20"
          style={{
            background: 'linear-gradient(180deg, transparent, #7B2FFF, transparent)',
            animation: 'neonLineVertical 10s linear infinite',
          }}
        />
      </div>

      {/* CSS for neon line animations */}
      <style>{`
        @keyframes neonLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes neonLineVertical {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
      `}</style>
    </>
  );
}