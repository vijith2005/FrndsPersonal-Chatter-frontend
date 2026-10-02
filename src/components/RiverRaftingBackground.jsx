import { useEffect, useRef } from 'react';

export default function RiverRaftingBackground() {
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

    // River particles (leaves, splashes)
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 0.5 + 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 4 + 2,
      alpha: Math.random() * 0.3 + 0.1,
      type: Math.random() > 0.7 ? 'splash' : 'leaf',
      color: Math.random() > 0.5 ? '#4A9AE0' : '#8FC48F',
    }));

    // Rafts
    const rafts = Array.from({ length: 3 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: canvas.height * 0.7 + i * 40,
      vx: Math.random() * 0.3 + 0.1,
      bobPhase: Math.random() * Math.PI * 2,
      size: Math.random() * 10 + 15,
    }));

    // Birds
    const birds = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.3,
      vx: Math.random() * 0.5 + 0.3,
      flapPhase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      // Sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.4);
      skyGradient.addColorStop(0, '#87CEEB');
      skyGradient.addColorStop(1, '#E0F4FF');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.4);

      // Sun
      const sunX = canvas.width * 0.8;
      const sunY = canvas.height * 0.15;
      const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 80);
      sunGradient.addColorStop(0, 'rgba(255, 220, 100, 0.8)');
      sunGradient.addColorStop(0.5, 'rgba(255, 200, 80, 0.3)');
      sunGradient.addColorStop(1, 'rgba(255, 200, 80, 0)');
      ctx.fillStyle = sunGradient;
      ctx.fillRect(sunX - 80, sunY - 80, 160, 160);

      // Clouds
      for (let i = 0; i < 4; i++) {
        const cx = ((time * 10 + i * 300) % (canvas.width + 200)) - 100;
        const cy = canvas.height * (0.1 + i * 0.05);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 60, 25, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + 30, cy - 10, 40, 20, 0, 0, Math.PI * 2);
        ctx.ellipse(cx - 30, cy - 5, 35, 18, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mountains (background layer)
      ctx.fillStyle = '#6B8E6B';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.4);
      for (let x = 0; x <= canvas.width; x += 50) {
        const y = canvas.height * 0.4 - Math.sin(x * 0.005) * 80 - Math.sin(x * 0.01) * 40;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height * 0.4);
      ctx.closePath();
      ctx.fill();

      // Mountains (foreground layer)
      ctx.fillStyle = '#4A6B4A';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.5);
      for (let x = 0; x <= canvas.width; x += 40) {
        const y = canvas.height * 0.5 - Math.sin(x * 0.008 + 1) * 60 - Math.sin(x * 0.015) * 30;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height * 0.5);
      ctx.closePath();
      ctx.fill();

      // Forest/trees
      for (let i = 0; i < 15; i++) {
        const tx = (i * canvas.width) / 15 + Math.sin(time * 0.5 + i) * 2;
        const ty = canvas.height * 0.48;
        const treeHeight = 40 + Math.sin(i) * 15;

        // Tree trunk
        ctx.fillStyle = '#5D4037';
        ctx.fillRect(tx - 3, ty - treeHeight * 0.3, 6, treeHeight * 0.3);

        // Tree foliage
        ctx.fillStyle = '#2E7D32';
        ctx.beginPath();
        ctx.moveTo(tx, ty - treeHeight);
        ctx.lineTo(tx - 15, ty - treeHeight * 0.3);
        ctx.lineTo(tx + 15, ty - treeHeight * 0.3);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#388E3C';
        ctx.beginPath();
        ctx.moveTo(tx, ty - treeHeight * 0.7);
        ctx.lineTo(tx - 12, ty - treeHeight * 0.1);
        ctx.lineTo(tx + 12, ty - treeHeight * 0.1);
        ctx.closePath();
        ctx.fill();
      }

      // River
      const riverGradient = ctx.createLinearGradient(0, canvas.height * 0.55, 0, canvas.height);
      riverGradient.addColorStop(0, '#4A9AE0');
      riverGradient.addColorStop(0.5, '#2E7DB8');
      riverGradient.addColorStop(1, '#1A5A8A');
      ctx.fillStyle = riverGradient;
      ctx.fillRect(0, canvas.height * 0.55, canvas.width, canvas.height * 0.45);

      // River waves
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - i * 0.01})`;
        ctx.lineWidth = 2;
        const waveY = canvas.height * (0.6 + i * 0.04);
        for (let x = 0; x < canvas.width; x += 10) {
          const y = waveY + Math.sin(x * 0.02 + time * 2 + i) * 5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Waterfall
      const waterfallX = canvas.width * 0.15;
      const waterfallY = canvas.height * 0.35;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 20; i++) {
        const wy = waterfallY + i * 15;
        const wx = waterfallX + Math.sin(time * 3 + i) * 3;
        ctx.beginPath();
        ctx.ellipse(wx, wy, 3, 8, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rafts
      rafts.forEach((raft) => {
        raft.x += raft.vx;
        raft.bobPhase += 0.03;
        if (raft.x > canvas.width + 50) raft.x = -50;

        const bobY = Math.sin(raft.bobPhase) * 5;
        const tilt = Math.sin(raft.bobPhase) * 0.1;

        ctx.save();
        ctx.translate(raft.x, raft.y + bobY);
        ctx.rotate(tilt);

        // Raft body
        ctx.fillStyle = '#8D6E63';
        ctx.beginPath();
        ctx.ellipse(0, 0, raft.size, raft.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Raft logs
        ctx.fillStyle = '#6D4C41';
        for (let i = -2; i <= 2; i++) {
          ctx.fillRect(i * 6 - 2, -raft.size * 0.3, 4, raft.size * 0.6);
        }

        // Person on raft
        ctx.fillStyle = '#FFB74D';
        ctx.beginPath();
        ctx.arc(0, -5, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Floating particles (leaves, splashes)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width + 10) {
          p.x = -10;
          p.y = Math.random() * canvas.height;
        }

        ctx.globalAlpha = p.alpha;
        if (p.type === 'leaf') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size, p.size * 0.5, time + p.x, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });

      // Birds
      birds.forEach((bird) => {
        bird.x += bird.vx;
        bird.flapPhase += 0.1;

        if (bird.x > canvas.width + 20) {
          bird.x = -20;
          bird.y = Math.random() * canvas.height * 0.3;
        }

        const wingY = Math.sin(bird.flapPhase) * 5;

        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bird.x - 8, bird.y + wingY);
        ctx.quadraticCurveTo(bird.x, bird.y - 5, bird.x + 8, bird.y + wingY);
        ctx.stroke();
      });

      // Campfire glow (bottom right)
      const fireX = canvas.width * 0.85;
      const fireY = canvas.height * 0.75;
      const fireGradient = ctx.createRadialGradient(fireX, fireY, 0, fireX, fireY, 60);
      fireGradient.addColorStop(0, `rgba(255, 150, 50, ${0.3 + Math.sin(time * 5) * 0.1})`);
      fireGradient.addColorStop(0.5, 'rgba(255, 100, 30, 0.1)');
      fireGradient.addColorStop(1, 'rgba(255, 100, 30, 0)');
      ctx.fillStyle = fireGradient;
      ctx.fillRect(fireX - 60, fireY - 60, 120, 120);

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
      style={{ opacity: 0.7 }}
    />
  );
}
