import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import NatureDecorations from '../components/NatureDecorations';
import CyberpunkBackground from '../components/CyberpunkBackground';
import ThemeBackground from '../components/ThemeBackground';

export default function NotFound() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center gap-4 px-4 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <NatureDecorations />
      <CyberpunkBackground />
      <ThemeBackground />
      <div className="relative z-10 text-center animate-page-enter">
        <div
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-blob3 animate-float"
          style={{ background: 'var(--gradient-2)', boxShadow: '0 4px 20px var(--shadow-color)' }}
        >
          <span className="text-5xl">🍃</span>
        </div>
        <h1 className="text-6xl font-black" style={{ color: 'var(--text-muted)' }}>404</h1>
        <p className="mt-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>Page not found</p>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>Looks like this page wandered off...</p>
        <Link to="/" className="btn-primary mt-6">
          <Home className="h-4 w-4" /> Go Home
        </Link>
      </div>
    </div>
  );
}
