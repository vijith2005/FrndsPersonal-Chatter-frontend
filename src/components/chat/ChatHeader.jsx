import { Phone, Video, MoreVertical, Search } from 'lucide-react';

export default function ChatHeader({ user, connected }) {
  const isOnline = Math.random() > 0.3;

  return (
    <header
      className="flex items-center justify-between px-4 py-3 border-b"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'var(--gradient-2)' }}
          >
            {user.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          {isOnline && (
            <span
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
              style={{ background: 'var(--online)', borderColor: 'var(--bg-card)' }}
            />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {user.displayName || 'User'}
          </h3>
          <p className="text-xs" style={{ color: isOnline ? 'var(--online)' : 'var(--text-muted)' }}>
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {[Phone, Video, Search, MoreVertical].map((Icon, idx) => (
          <button
            key={idx}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </header>
  );
}
