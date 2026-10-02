import { Outlet } from 'react-router-dom';
import NatureDecorations from './NatureDecorations';
import CyberpunkBackground from './CyberpunkBackground';
import ThemeBackground from './ThemeBackground';
import LeftNav from './chat/LeftNav';

export default function Layout() {
  return (
    <div className="flex h-screen" style={{ background: 'var(--bg-primary)' }}>
      <NatureDecorations />
      <CyberpunkBackground />
      <ThemeBackground />
      <LeftNav />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
