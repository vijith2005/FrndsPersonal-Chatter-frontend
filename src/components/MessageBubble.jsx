import { format } from 'date-fns';
import Avatar from './Avatar';

export default function MessageBubble({ message, isOwn, showAvatar }) {
  return (
    <div className={`flex gap-3 animate-message-enter ${isOwn ? 'flex-row-reverse' : ''}`}>
      {showAvatar && !isOwn ? (
        <Avatar user={message.sender} size="sm" />
      ) : (
        <div className="w-9 shrink-0" />
      )}
      <div className={`max-w-[75%] ${isOwn ? 'items-end' : 'items-start'}`}>
        {showAvatar && !isOwn && (
          <p className="mb-1 text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
            {message.sender?.displayName || 'Unknown'}
          </p>
        )}
        <div
          className={`px-4 py-3 ${
            isOwn ? 'message-bubble-own' : 'message-bubble-other'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        <p className={`mt-1 text-[10px] ${isOwn ? 'text-right' : ''}`} style={{ color: 'var(--text-muted)' }}>
          {format(new Date(message.createdAt), 'h:mm a')}
        </p>
      </div>
    </div>
  );
}
