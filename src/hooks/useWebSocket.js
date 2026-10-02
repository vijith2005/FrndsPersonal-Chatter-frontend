import { useEffect, useRef, useState, useCallback } from 'react';
import { mockCreateMessage } from '../api/mockMessages';
import { MOCK_USERS } from '../api/mockData';

const RECONNECT_DELAY = 3000;

// Simulated WebSocket for testing without backend
export function useWebSocket(roomId, onMessage) {
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;
  const intervalRef = useRef(null);

  const connect = useCallback(() => {
    if (!roomId) return;

    // Simulate connection
    setReconnecting(true);
    const timeout = setTimeout(() => {
      setConnected(true);
      setReconnecting(false);

      // Simulate incoming messages from friends periodically
      intervalRef.current = setInterval(() => {
        const randomUser = MOCK_USERS[Math.floor(Math.random() * (MOCK_USERS.length - 1)) + 1];
        const phrases = [
          'Hey, what is up?',
          'Did you see the new movie?',
          'Lol that is so funny',
          'Wanna hang out later?',
          'Check this out!',
          'Haha nice one',
          'I am bored, entertain me',
          'Who is online?',
          'This app is so cozy',
          'Missing you guys!',
        ];
        const content = phrases[Math.floor(Math.random() * phrases.length)];
        const msg = mockCreateMessage(content, randomUser);
        onMessageRef.current?.(msg);
      }, 8000 + Math.random() * 7000); // Random interval 8-15s
    }, 1000);

    return () => clearTimeout(timeout);
  }, [roomId]);

  const disconnect = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setConnected(false);
    setReconnecting(false);
  }, []);

  const sendMessage = useCallback(
    (content) => {
      if (!connected) return;
      const stored = localStorage.getItem('mock_currentUser');
      const user = stored ? JSON.parse(stored) : MOCK_USERS[0];
      const msg = mockCreateMessage(content, user);
      onMessageRef.current?.(msg);
    },
    [connected]
  );

  useEffect(() => {
    const cleanup = connect();
    return () => {
      if (cleanup) cleanup();
      disconnect();
    };
  }, [connect, disconnect]);

  return { connected, reconnecting, sendMessage, disconnect };
}
