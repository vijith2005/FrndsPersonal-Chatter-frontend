import { Image, Mic, Send, Smile } from 'lucide-react';

export default function MessageInput({ inputText, setInputText, onSend, sending, connected }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      className="p-4 border-t"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-2xl"
        style={{
          background: 'var(--input-bg)',
          border: '1px solid var(--border-color)',
        }}
      >
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition hover:opacity-70 flex-shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          <Image className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={!connected}
          className="flex-1 bg-transparent outline-none text-sm py-1"
          style={{ color: 'var(--text-primary)' }}
          maxLength={2000}
        />
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition hover:opacity-70 flex-shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          <Smile className="w-4 h-4" />
        </button>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition hover:opacity-70 flex-shrink-0"
          style={{ color: 'var(--text-muted)' }}
        >
          <Mic className="w-4 h-4" />
        </button>
        <button
          onClick={onSend}
          disabled={!connected || !inputText.trim()}
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            sending ? 'animate-send-bounce' : ''
          }`}
          style={{
            background: 'var(--gradient-1)',
            color: 'white',
            opacity: !connected || !inputText.trim() ? 0.4 : 1,
          }}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
