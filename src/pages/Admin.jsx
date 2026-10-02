import { useState } from 'react';
import { Plus, Trash2, Mail, Users, Search } from 'lucide-react';
import Avatar from '../components/Avatar';
import ThemeSwitcher from '../components/ThemeSwitcher';
import CyberpunkBackground from '../components/CyberpunkBackground';
import ThemeBackground from '../components/ThemeBackground';

const INITIAL_EMAILS = [
  { id: 1, email: 'vijith122005@gmail.com' },
  { id: 2, email: 'arjun@example.com' },
  { id: 3, email: 'priya@example.com' },
  { id: 4, email: 'rahul@example.com' },
  { id: 5, email: 'sneha@example.com' },
];

const INITIAL_USERS = [
  { id: 1, email: 'vijith122005@gmail.com', displayName: 'Vijith', avatarUrl: null, role: 'ADMIN', createdAt: '2024-01-15T10:00:00Z' },
  { id: 2, email: 'arjun@example.com', displayName: 'Arjun', avatarUrl: null, role: 'MEMBER', createdAt: '2024-01-20T14:30:00Z' },
  { id: 3, email: 'priya@example.com', displayName: 'Priya', avatarUrl: null, role: 'MEMBER', createdAt: '2024-02-01T09:15:00Z' },
  { id: 4, email: 'rahul@example.com', displayName: 'Rahul', avatarUrl: null, role: 'MEMBER', createdAt: '2024-02-10T16:45:00Z' },
  { id: 5, email: 'sneha@example.com', displayName: 'Sneha', avatarUrl: null, role: 'MEMBER', createdAt: '2024-02-15T11:20:00Z' },
];

export default function Admin() {
  const [newEmail, setNewEmail] = useState('');
  const [tab, setTab] = useState('emails');
  const [emails, setEmails] = useState(INITIAL_EMAILS);
  const [users] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(null);

  const handleAdd = async () => {
    const trimmed = newEmail.trim().toLowerCase();
    if (!trimmed) return;
    if (emails.some((e) => e.email === trimmed)) {
      alert('Email already exists');
      return;
    }
    setAdding(true);
    await new Promise((r) => setTimeout(r, 500));
    setEmails((prev) => [...prev, { id: Date.now(), email: trimmed }]);
    setNewEmail('');
    setAdding(false);
  };

  const handleRemove = async (id) => {
    setRemoving(id);
    await new Promise((r) => setTimeout(r, 300));
    setEmails((prev) => prev.filter((e) => e.id !== id));
    setRemoving(null);
  };

  const filteredUsers = users.filter(
    (u) =>
      u.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
      <CyberpunkBackground />
      <ThemeBackground />
      <div className="flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl animate-page-enter">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>Admin Panel</h1>
            <ThemeSwitcher />
          </div>

          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setTab('emails')}
              className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200"
              style={{
                background: tab === 'emails' ? 'var(--gradient-1)' : 'var(--bg-card)',
                color: tab === 'emails' ? 'white' : 'var(--text-secondary)',
                boxShadow: tab === 'emails' ? '0 4px 15px var(--shadow-color)' : 'none',
                transform: tab === 'emails' ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <Mail className="h-4 w-4" /> Allowed Emails
            </button>
            <button
              onClick={() => setTab('users')}
              className="flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200"
              style={{
                background: tab === 'users' ? 'var(--gradient-1)' : 'var(--bg-card)',
                color: tab === 'users' ? 'white' : 'var(--text-secondary)',
                boxShadow: tab === 'users' ? '0 4px 15px var(--shadow-color)' : 'none',
                transform: tab === 'users' ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <Users className="h-4 w-4" /> Users
            </button>
          </div>

          {tab === 'emails' && (
            <div className="card">
              <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }} className="mb-4 flex gap-3">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="newfriend@example.com"
                  className="input-field flex-1"
                  required
                />
                <button type="submit" disabled={adding} className="btn-primary">
                  {adding ? <span className="animate-spin">⏳</span> : <><Plus className="h-4 w-4" /> Add</>}
                </button>
              </form>

              <div className="space-y-2">
                {emails.length === 0 && (
                  <p className="py-4 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No allowed emails yet</p>
                )}
                {emails.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 transition"
                    style={{ background: 'var(--hover-bg)' }}
                  >
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.email}</span>
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={removing === item.id}
                      className="rounded-xl p-2 transition hover:opacity-80 active:scale-90"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'users' && (
            <div className="card">
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="input-field pl-10"
                />
              </div>

              <div className="space-y-3">
                {filteredUsers.length === 0 && (
                  <p className="py-4 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No users found</p>
                )}
                {filteredUsers.map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 transition"
                    style={{ background: 'var(--hover-bg)' }}
                  >
                    <Avatar user={u} size="sm" online={Math.random() > 0.3} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                        {u.displayName || 'User'}
                      </p>
                      <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>{u.email}</p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-bold"
                      style={{
                        background: u.role === 'ADMIN' ? 'var(--nav-active-bg)' : 'var(--hover-bg)',
                        color: u.role === 'ADMIN' ? 'var(--nav-active)' : 'var(--text-secondary)',
                      }}
                    >
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
