import { useState, useRef } from 'react';
import { Send, Image, Mic } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    setSending(true);
    onSend(trimmed);
    setText('');
    setTimeout(() => setSending(false), 400);
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-4 border-t backdrop-blur-sm"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      <button
        type="button"
        className="rounded-2xl p-3 transition hover:opacity-80 active:scale-90"
        style={{ color: 'var(--text-muted)' }}
        title="Send image"
      >
        <Image className="h-5 w-5" />
      </button>
      <button
        type="button"
        className="rounded-2xl p-3 transition hover:opacity-80 active:scale-90"
        style={{ color: 'var(--text-muted)' }}
        title="Voice message"
      >
        <Mic className="h-5 w-5" />
      </button>
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
        placeholder="Type a message..."
        disabled={disabled}
        className="input-field flex-1 rounded-2xl"
        maxLength={2000}
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className={`rounded-2xl p-3 text-white transition-all duration-200 hover:shadow-medium active:scale-90 disabled:opacity-40 disabled:scale-100 ${
          sending ? 'animate-send-bounce' : ''
        }`}
        style={{ background: 'var(--gradient-1)', boxShadow: '0 4px 15px var(--shadow-color)' }}
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}
