import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Image, Mic, Send, Smile } from 'lucide-react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { format } from 'date-fns';

const INITIAL_MESSAGES = [
  { id: 1, content: 'Hey! How are you?', senderId: 2, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, content: 'I am doing great, thanks!', senderId: 1, createdAt: new Date(Date.now() - 3500000).toISOString() },
  { id: 3, content: 'Want to hang out later?', senderId: 2, createdAt: new Date(Date.now() - 3400000).toISOString() },
  { id: 4, content: 'Sure! What time?', senderId: 1, createdAt: new Date(Date.now() - 3300000).toISOString() },
  { id: 5, content: 'How about 5 PM?', senderId: 2, createdAt: new Date(Date.now() - 3200000).toISOString() },
];

export default function MobileChatScreen({ selectedUser, currentUser, onBack }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const msgIdRef = useRef(100);

  const roomId = selectedUser?.id || 1;

  const handleNewMessage = useCallback((msg) => {
    setMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev, msg];
    });
  }, []);

  const { connected, sendMessage } = useWebSocket(roomId, handleNewMessage);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed || !connected) return;

    setSending(true);
    const newMsg = {
      id: msgIdRef.current++,
      content: trimmed,
      senderId: currentUser?.id || 1,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, newMsg]);
      setInputText('');
      setSending(false);

      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          const replies = ['That sounds great!', 'Haha, totally!', 'Interesting!', 'Sure!'];
          const reply = {
            id: msgIdRef.current++,
            content: replies[Math.floor(Math.random() * replies.length)],
            senderId: selectedUser?.id || 2,
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, reply]);
        }, 1500);
      }, 500);
    }, 300);
  }, [inputText, connected, currentUser, selectedUser]);

  const isOwn = (msg) => msg.senderId === currentUser?.id;

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <header
        className="flex items-center justify-between px-3 py-3 border-b"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition hover:opacity-70"
            style={{ color: 'var(--text-primary)' }}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'var(--gradient-2)' }}
            >
              {selectedUser?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: 'var(--online)', borderColor: 'var(--bg-card)' }}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {selectedUser?.displayName || 'User'}
            </h3>
            <p className="text-[10px]" style={{ color: 'var(--online)' }}>
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[Phone, Video, MoreVertical].map((Icon, idx) => (
            <button
              key={idx}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition hover:opacity-70"
              style={{ color: 'var(--text-muted)' }}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        <div className="flex items-center justify-center mb-4">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-medium"
            style={{ background: 'var(--hover-bg)', color: 'var(--text-muted)' }}
          >
            Today
          </span>
        </div>

        {messages.map((msg, idx) => {
          const showAvatar = !isOwn(msg) && (idx === 0 || messages[idx - 1].senderId !== msg.senderId);
          return (
            <div key={msg.id} className={`flex items-end gap-2 animate-message-enter ${isOwn ? 'flex-row-reverse' : ''}`}>
              {showAvatar && !isOwn && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                  style={{ background: 'var(--gradient-2)' }}
                >
                  {selectedUser?.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              {!showAvatar && !isOwn && <div className="w-7 flex-shrink-0" />}
              <div className={`max-w-[75%] ${isOwn ? 'items-end' : 'items-start'}`}>
                <div
                  className="px-3 py-2 rounded-2xl"
                  style={
                    isOwn
                      ? { background: 'var(--bubble-own)', color: 'white', borderBottomRightRadius: '0.25rem' }
                      : { background: 'var(--bubble-other)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderBottomLeftRadius: '0.25rem' }
                  }
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <span className="text-[9px] mt-0.5 block" style={{ color: 'var(--text-muted)', textAlign: isOwn ? 'right' : 'left' }}>
                  {format(new Date(msg.createdAt), 'h:mm a')}
                </span>
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="flex items-end gap-2 animate-fade-in">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
              style={{ background: 'var(--gradient-2)' }}
            >
              {selectedUser?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <div
              className="px-3 py-2.5 rounded-2xl rounded-bl-md"
              style={{ background: 'var(--bubble-other)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full animate-typing-dot" style={{ background: 'var(--text-muted)' }} />
                <span className="w-1.5 h-1.5 rounded-full animate-typing-dot" style={{ background: 'var(--text-muted)', animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 rounded-full animate-typing-dot" style={{ background: 'var(--text-muted)', animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-2xl"
          style={{ background: 'var(--input-bg)', border: '1px solid var(--border-color)' }}
        >
          <button className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
            <Image className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
          <button className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
            <Smile className="w-4 h-4" />
          </button>
          <button className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={handleSend}
            disabled={!connected || !inputText.trim()}
            className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
              sending ? 'animate-send-bounce' : ''
            }`}
            style={{ background: 'var(--gradient-1)', color: 'white', opacity: !inputText.trim() ? 0.4 : 1 }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
