import { format } from 'date-fns';

export default function ConversationItem({ user, isSelected, onClick }) {
  const lastMessage = 'Hey, how are you doing?';
  const lastTime = format(new Date(), 'h:mm a');
  const unreadCount = Math.floor(Math.random() * 3);
  const isOnline = Math.random() > 0.3;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 text-left hover:opacity-90"
      style={{
        background: isSelected ? 'var(--nav-active-bg)' : 'transparent',
        borderLeft: isSelected ? '3px solid var(--nav-active)' : '3px solid transparent',
      }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
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

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span
            className="text-sm font-semibold truncate"
            style={{ color: 'var(--text-primary)' }}
          >
            {user.displayName || 'User'}
          </span>
          <span className="text-xs flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
            {lastTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
            {lastMessage}
          </span>
          {unreadCount > 0 && (
            <span
              className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white flex-shrink-0"
              style={{ background: 'var(--accent-primary)' }}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
