import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';

export default function MessageBubble({ message, isOwn, showAvatar, sender }) {
  return (
    <div className={`flex items-end gap-2 animate-message-enter ${isOwn ? 'flex-row-reverse' : ''}`}>
      {/* Avatar for other user */}
      {showAvatar && !isOwn && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: 'var(--gradient-2)' }}
        >
          {sender?.displayName?.[0]?.toUpperCase() || 'U'}
        </div>
      )}
      {!showAvatar && !isOwn && <div className="w-8 flex-shrink-0" />}

      <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'}`}>
        <div
          className="px-4 py-2.5 rounded-2xl"
          style={
            isOwn
              ? {
                  background: 'var(--bubble-own)',
                  color: 'white',
                  borderBottomRightRadius: '0.25rem',
                }
              : {
                  background: 'var(--bubble-other)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderBottomLeftRadius: '0.25rem',
                }
          }
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : ''}`}>
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            {format(new Date(message.createdAt), 'h:mm a')}
          </span>
          {isOwn && (
            <CheckCheck className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
          )}
        </div>
      </div>
    </div>
  );
}
