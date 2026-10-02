import { format } from 'date-fns';
import MessageBubble from './MessageBubble';

export default function MessageList({ messages, currentUser, selectedUser, typing, bottomRef }) {
  const isOwn = (msg) => msg.senderId === currentUser?.id;

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
      {/* Date separator */}
      <div className="flex items-center justify-center mb-4">
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{ background: 'var(--hover-bg)', color: 'var(--text-muted)' }}
        >
          Today
        </span>
      </div>

      {messages.map((msg, idx) => {
        const showAvatar = !isOwn(msg) && (idx === 0 || messages[idx - 1].senderId !== msg.senderId);
        return (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={isOwn(msg)}
            showAvatar={showAvatar}
            sender={selectedUser}
          />
        );
      })}

      {/* Typing indicator */}
      {typing && (
        <div className="flex items-end gap-2 animate-fade-in">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: 'var(--gradient-2)' }}
          >
            {selectedUser?.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
          <div
            className="px-4 py-3 rounded-2xl rounded-bl-md"
            style={{ background: 'var(--bubble-other)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full animate-typing-dot" style={{ background: 'var(--text-muted)' }} />
              <span className="w-2 h-2 rounded-full animate-typing-dot" style={{ background: 'var(--text-muted)', animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full animate-typing-dot" style={{ background: 'var(--text-muted)', animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
