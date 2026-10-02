import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import MobileChatList from './MobileChatList';
import MobileChatScreen from './MobileChatScreen';
import useAuthStore from '../../store/authStore';
import ThemeBackground from '../ThemeBackground';
import CyberpunkBackground from '../CyberpunkBackground';

export default function ChatLayout() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'chat'
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectUser = (userData) => {
    setSelectedUser(userData);
    setMobileView('chat');
  };

  const handleBackToList = () => {
    setMobileView('list');
    setSelectedUser(null);
  };

  return (
    <div className="h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      <CyberpunkBackground />
      <ThemeBackground />

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full">
        <ConversationList
          selectedUser={selectedUser}
          onSelectUser={handleSelectUser}
        />
        <ChatWindow
          selectedUser={selectedUser}
          currentUser={user}
        />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full">
        {mobileView === 'list' ? (
          <MobileChatList
            selectedUser={selectedUser}
            onSelectUser={handleSelectUser}
            currentUser={user}
          />
        ) : (
          <MobileChatScreen
            selectedUser={selectedUser}
            currentUser={user}
            onBack={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}
