import { useState, useRef, useEffect, useCallback } from 'react';
import { Phone, Video, MoreVertical, Search } from 'lucide-react';
import { useWebSocket } from '../../hooks/useWebSocket';
import { mockCreateMessage } from '../../api/mockMessages';
import { MOCK_USERS } from '../../api/mockData';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const INITIAL_MESSAGES = [
  { id: 1, content: 'Hey! How are you?', senderId: 2, createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, content: 'I am doing great, thanks!', senderId: 1, createdAt: new Date(Date.now() - 3500000).toISOString() },
  { id: 3, content: 'Want to hang out later?', senderId: 2, createdAt: new Date(Date.now() - 3400000).toISOString() },
  { id: 4, content: 'Sure! What time?', senderId: 1, createdAt: new Date(Date.now() - 3300000).toISOString() },
  { id: 5, content: 'How about 5 PM?', senderId: 2, createdAt: new Date(Date.now() - 3200000).toISOString() },
];

export default function ChatWindow({ selectedUser, currentUser }) {
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

  const { connected, reconnecting, sendMessage } = useWebSocket(roomId, handleNewMessage);

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

      // Simulate reply
      setTimeout(() => {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          const replies = [
            'That sounds great!',
            'Haha, totally agree!',
            'Interesting, tell me more!',
            'Sure, why not?',
            'I was just thinking the same thing!',
          ];
          const reply = {
            id: msgIdRef.current++,
            content: replies[Math.floor(Math.random() * replies.length)],
            senderId: selectedUser?.id || 2,
            createdAt: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, reply]);
        }, 1500 + Math.random() * 1000);
      }, 500);
    }, 300);
  }, [inputText, connected, currentUser, selectedUser]);

  if (!selectedUser) {
    return (
      <div
        className="flex-1 hidden md:flex items-center justify-center"
        style={{ background: 'var(--bg-primary)' }}
      >
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'var(--hover-bg)' }}
          >
            <Search className="w-8 h-8" style={{ color: 'var(--text-muted)' }} />
          </div>
          <p className="text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>
            Select a conversation
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Choose a friend to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 hidden md:flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <ChatHeader user={selectedUser} connected={connected} />
      <MessageList
        messages={messages}
        currentUser={currentUser}
        selectedUser={selectedUser}
        typing={typing}
        bottomRef={bottomRef}
      />
      <MessageInput
        inputText={inputText}
        setInputText={setInputText}
        onSend={handleSend}
        sending={sending}
        connected={connected}
      />
    </div>
  );
}
