import { useEffect, useRef } from 'react';

export default function MountainExpeditionBackground() {
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

    // Snow particles
    const snowflakes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vy: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    // Birds
    const birds = Array.from({ length: 4 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.25,
      vx: Math.random() * 0.4 + 0.2,
      flapPhase: Math.random() * Math.PI * 2,
    }));

    // Stars (for sunset/sunrise effect)
    const stars = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.4,
      size: Math.random() * 2 + 0.5,
      twinkle: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      // Sky gradient (sunset/sunrise colors)
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, '#1a1a3e');
      skyGradient.addColorStop(0.3, '#4a3a6e');
      skyGradient.addColorStop(0.5, '#8a5a8e');
      skyGradient.addColorStop(0.7, '#c47a6e');
      skyGradient.addColorStop(1, '#e8a060');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((star) => {
        star.twinkle += 0.02;
        const alpha = star.alpha * (0.5 + Math.sin(star.twinkle) * 0.5);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Sun/Moon
      const sunX = canvas.width * 0.75;
      const sunY = canvas.height * 0.35 + Math.sin(time * 0.1) * 10;
      const sunGradient = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 100);
      sunGradient.addColorStop(0, 'rgba(255, 200, 100, 0.6)');
      sunGradient.addColorStop(0.3, 'rgba(255, 150, 80, 0.3)');
      sunGradient.addColorStop(1, 'rgba(255, 150, 80, 0)');
      ctx.fillStyle = sunGradient;
      ctx.fillRect(sunX - 100, sunY - 100, 200, 200);

      // Clouds
      for (let i = 0; i < 5; i++) {
        const cx = ((time * 8 + i * 250) % (canvas.width + 300)) - 150;
        const cy = canvas.height * (0.15 + i * 0.06);
        ctx.fillStyle = 'rgba(200, 180, 220, 0.3)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 80, 30, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + 40, cy - 15, 50, 25, 0, 0, Math.PI * 2);
        ctx.ellipse(cx - 40, cy - 10, 45, 22, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Far mountains (snow-capped)
      ctx.fillStyle = '#2a2a4a';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.5);
      for (let x = 0; x <= canvas.width; x += 30) {
        const y = canvas.height * 0.5 - Math.sin(x * 0.003) * 120 - Math.sin(x * 0.007) * 60;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height * 0.5);
      ctx.closePath();
      ctx.fill();

      // Snow caps on far mountains
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.5);
      for (let x = 0; x <= canvas.width; x += 30) {
        const y = canvas.height * 0.5 - Math.sin(x * 0.003) * 120 - Math.sin(x * 0.007) * 60;
        if (y < canvas.height * 0.35) {
          ctx.lineTo(x, y);
        }
      }
      ctx.lineTo(canvas.width, canvas.height * 0.5);
      ctx.closePath();
      ctx.fill();

      // Near mountains
      ctx.fillStyle = '#1a1a3a';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.6);
      for (let x = 0; x <= canvas.width; x += 25) {
        const y = canvas.height * 0.6 - Math.sin(x * 0.005 + 2) * 80 - Math.sin(x * 0.012) * 40;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height * 0.6);
      ctx.closePath();
      ctx.fill();

      // Snow caps on near mountains
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.6);
      for (let x = 0; x <= canvas.width; x += 25) {
        const y = canvas.height * 0.6 - Math.sin(x * 0.005 + 2) * 80 - Math.sin(x * 0.012) * 40;
        if (y < canvas.height * 0.45) {
          ctx.lineTo(x, y);
        }
      }
      ctx.lineTo(canvas.width, canvas.height * 0.6);
      ctx.closePath();
      ctx.fill();

      // Trees on mountains
      for (let i = 0; i < 20; i++) {
        const tx = (i * canvas.width) / 20 + Math.sin(time * 0.3 + i) * 2;
        const ty = canvas.height * 0.58;
        const treeHeight = 30 + Math.sin(i * 1.5) * 10;

        ctx.fillStyle = '#0a2a0a';
        ctx.beginPath();
        ctx.moveTo(tx, ty - treeHeight);
        ctx.lineTo(tx - 10, ty);
        ctx.lineTo(tx + 10, ty);
        ctx.closePath();
        ctx.fill();
      }

      // Campfire glow
      const fireX = canvas.width * 0.2;
      const fireY = canvas.height * 0.8;
      const fireGradient = ctx.createRadialGradient(fireX, fireY, 0, fireX, fireY, 80);
      fireGradient.addColorStop(0, `rgba(255, 150, 50, ${0.4 + Math.sin(time * 6) * 0.15})`);
      fireGradient.addColorStop(0.4, 'rgba(255, 100, 30, 0.15)');
      fireGradient.addColorStop(1, 'rgba(255, 100, 30, 0)');
      ctx.fillStyle = fireGradient;
      ctx.fillRect(fireX - 80, fireY - 80, 160, 160);

      // Campfire smoke
      for (let i = 0; i < 5; i++) {
        const smokeY = fireY - 20 - i * 15 - (time * 20 % 30);
        const smokeX = fireX + Math.sin(time + i) * 10;
        ctx.fillStyle = `rgba(200, 200, 200, ${0.15 - i * 0.03})`;
        ctx.beginPath();
        ctx.arc(smokeX, smokeY, 8 + i * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Snow particles
      snowflakes.forEach((snow) => {
        snow.y += snow.vy;
        snow.x += snow.vx + Math.sin(time + snow.y * 0.01) * 0.2;

        if (snow.y > canvas.height + 5) {
          snow.y = -5;
          snow.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${snow.alpha})`;
        ctx.beginPath();
        ctx.arc(snow.x, snow.y, snow.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Birds
      birds.forEach((bird) => {
        bird.x += bird.vx;
        bird.flapPhase += 0.08;

        if (bird.x > canvas.width + 20) {
          bird.x = -20;
          bird.y = Math.random() * canvas.height * 0.25;
        }

        const wingY = Math.sin(bird.flapPhase) * 6;

        ctx.strokeStyle = 'rgba(50, 50, 80, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bird.x - 10, bird.y + wingY);
        ctx.quadraticCurveTo(bird.x, bird.y - 8, bird.x + 10, bird.y + wingY);
        ctx.stroke();
      });

      // Flag at summit
      const flagX = canvas.width * 0.5;
      const flagY = canvas.height * 0.28;
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(flagX, flagY);
      ctx.lineTo(flagX, flagY - 40);
      ctx.stroke();

      // Flag waving
      ctx.fillStyle = '#FF4444';
      ctx.beginPath();
      ctx.moveTo(flagX, flagY - 40);
      for (let i = 0; i <= 20; i++) {
        const waveY = Math.sin(time * 3 + i * 0.3) * 3;
        ctx.lineTo(flagX + i, flagY - 40 + waveY);
      }
      for (let i = 20; i >= 0; i--) {
        const waveY = Math.sin(time * 3 + i * 0.3) * 3;
        ctx.lineTo(flagX + i, flagY - 25 + waveY);
      }
      ctx.closePath();
      ctx.fill();

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
