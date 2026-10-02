import { useEffect, useRef } from 'react';
import useThemeStore from '../store/themeStore';
import RiverRaftingBackground from './RiverRaftingBackground';
import MountainExpeditionBackground from './MountainExpeditionBackground';

// Forest Green — falling leaves and growing vines
function ForestGreenBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const leaves = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: Math.random() * 0.3 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 10 + 5,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      alpha: Math.random() * 0.3 + 0.1,
      color: ['#8FC48F', '#6AAF6A', '#4A8F4A', '#BBDDBB'][Math.floor(Math.random() * 4)],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      for (let i = 0; i < 2; i++) {
        const x = canvas.width * (0.3 + i * 0.4) + Math.sin(time * 0.5 + i) * 60;
        const y = canvas.height * 0.4 + Math.cos(time * 0.3 + i) * 100;
        const radius = 200 + Math.sin(time + i) * 40;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(143, 196, 143, ${0.04 + Math.sin(time + i) * 0.01})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      leaves.forEach((l) => {
        l.y += l.vy;
        l.x += l.vx + Math.sin(time + l.rotation) * 0.3;
        l.rotation += l.rotSpeed;

        if (l.y > canvas.height + 20) {
          l.y = -20;
          l.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rotation);
        ctx.globalAlpha = l.alpha;
        ctx.fillStyle = l.color;

        ctx.beginPath();
        ctx.moveTo(0, -l.size);
        ctx.quadraticCurveTo(l.size * 0.5, -l.size * 0.5, 0, l.size);
        ctx.quadraticCurveTo(-l.size * 0.5, -l.size * 0.5, 0, -l.size);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -l.size);
        ctx.lineTo(0, l.size);
        ctx.stroke();

        ctx.restore();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

// Crazy Cartoon — floating emojis, stars, hearts
function CrazyCartoonBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const EMOJIS = ['⭐', '💖', '😂', '✨', '☁️', '🎈', '💫', '🌟', '💜', '🦄'];
    const items = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: -(Math.random() * 0.3 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 16 + 12,
      alpha: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      wobble: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      const colors = [
        [255, 105, 180],
        [135, 206, 235],
        [255, 215, 0],
        [221, 160, 221],
      ];
      for (let i = 0; i < 4; i++) {
        const x = canvas.width * (0.15 + i * 0.25) + Math.sin(time * 0.4 + i) * 70;
        const y = canvas.height * 0.5 + Math.cos(time * 0.3 + i) * 90;
        const radius = 120 + Math.sin(time + i) * 25;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${colors[i].join(',')}, ${0.08 + Math.sin(time + i) * 0.01})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      }

      items.forEach((item) => {
        item.y += item.vy;
        item.x += item.vx + Math.sin(time + item.wobble) * 0.4;
        item.rotation += item.rotSpeed;
        item.wobble += 0.02;

        if (item.y < -30) {
          item.y = canvas.height + 30;
          item.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.globalAlpha = item.alpha * (0.8 + Math.sin(item.wobble) * 0.2);
        ctx.font = `${item.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.emoji, 0, 0);
        ctx.restore();
        ctx.globalAlpha = 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

// Main component that renders the correct background based on theme
export default function ThemeBackground() {
  const { theme } = useThemeStore();

  switch (theme) {
    case 'forest-green':
      return <ForestGreenBackground />;
    case 'crazy-cartoon':
      return <CrazyCartoonBackground />;
    case 'river-rafting':
      return <RiverRaftingBackground />;
    case 'mountain-expedition':
      return <MountainExpeditionBackground />;
    default:
      return null;
  }
}
