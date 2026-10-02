import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import NatureDecorations from '../components/NatureDecorations';
import CyberpunkBackground from '../components/CyberpunkBackground';
import ThemeBackground from '../components/ThemeBackground';

export default function Unauthorized() {
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
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-blob2 animate-wiggle"
          style={{ background: 'var(--gradient-3)', boxShadow: '0 4px 20px var(--shadow-color)' }}
        >
          <ShieldAlert className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Access Denied</h1>
        <p className="mt-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>You don't have permission to view this page.</p>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>Only admins can access this area.</p>
        <Link to="/" className="btn-primary mt-6">
          Go to Chat
        </Link>
      </div>
    </div>
  );
}
