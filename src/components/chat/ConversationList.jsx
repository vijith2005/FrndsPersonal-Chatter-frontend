import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { MOCK_USERS } from '../../api/mockData';
import ConversationItem from './ConversationItem';

export default function ConversationList({ selectedUser, onSelectUser }) {
  const [search, setSearch] = useState('');

  const filteredUsers = MOCK_USERS.filter(
    (u) =>
      u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="hidden md:flex flex-col w-80 lg:w-96 border-r"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Chats
          </h2>
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center transition hover:opacity-70"
            style={{ background: 'var(--hover-bg)', color: 'var(--text-secondary)' }}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition"
            style={{
              background: 'var(--input-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            }}
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((userData) => (
          <ConversationItem
            key={userData.id}
            user={userData}
            isSelected={selectedUser?.id === userData.id}
            onClick={() => onSelectUser(userData)}
          />
        ))}
      </div>
    </div>
  );
}
