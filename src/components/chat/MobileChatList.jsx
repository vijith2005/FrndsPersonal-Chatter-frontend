import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { MOCK_USERS } from '../../api/mockData';
import ConversationItem from './ConversationItem';

export default function MobileChatList({ selectedUser, onSelectUser, currentUser }) {
  const [search, setSearch] = useState('');

  const filteredUsers = MOCK_USERS.filter(
    (u) =>
      u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full" style={{ background: 'var(--bg-primary)' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-4 border-b"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Chat
        </h1>
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center transition hover:opacity-70"
            style={{ background: 'var(--hover-bg)', color: 'var(--text-secondary)' }}
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center transition hover:opacity-70"
            style={{ background: 'var(--hover-bg)', color: 'var(--text-secondary)' }}
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition"
            style={{
              background: 'var(--input-bg)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
            }}
          />
        </div>
      </div>

      {/* Activities / Stories */}
      <div className="px-4 py-3">
        <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Activities
        </p>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {MOCK_USERS.slice(0, 5).map((u) => (
            <div key={u.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className="w-14 h-14 rounded-full p-0.5"
                style={{ background: 'var(--gradient-1)' }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-sm font-bold text-white border-2"
                  style={{ background: 'var(--gradient-2)', borderColor: 'var(--bg-primary)' }}
                >
                  {u.displayName?.[0]?.toUpperCase() || 'U'}
                </div>
              </div>
              <span className="text-[10px] truncate w-14 text-center" style={{ color: 'var(--text-muted)' }}>
                {u.displayName?.split(' ')[0] || 'User'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Messages
        </p>
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
