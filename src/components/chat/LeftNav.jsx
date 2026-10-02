import { NavLink } from 'react-router-dom';
import {
  MessageCircle,
  User,
  Shield,
  LogOut,
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function LeftNav() {
  const { user, isAdmin, logout } = useAuthStore();

  return (
    <nav
      className="hidden md:flex flex-col w-56 border-r"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--gradient-1)' }}
        >
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <h1
          className="text-xl font-bold"
          style={{
            color: 'var(--text-primary)',
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.5rem',
          }}
        >
          FrndsChat
        </h1>
      </div>

      {/* Nav Items */}
      <div className="flex-1 px-3 py-4 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive ? 'shadow-md' : 'hover:opacity-70'
            }`
          }
          style={({ isActive }) => ({
            background: isActive ? 'var(--nav-active-bg)' : 'transparent',
            color: isActive ? 'var(--nav-active)' : 'var(--text-secondary)',
          })}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Chat</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive ? 'shadow-md' : 'hover:opacity-70'
            }`
          }
          style={({ isActive }) => ({
            background: isActive ? 'var(--nav-active-bg)' : 'transparent',
            color: isActive ? 'var(--nav-active)' : 'var(--text-secondary)',
          })}
        >
          <User className="w-5 h-5" />
          <span className="text-sm font-medium">Profile</span>
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive ? 'shadow-md' : 'hover:opacity-70'
              }`
            }
            style={({ isActive }) => ({
              background: isActive ? 'var(--nav-active-bg)' : 'transparent',
              color: isActive ? 'var(--nav-active)' : 'var(--text-secondary)',
            })}
          >
            <Shield className="w-5 h-5" />
            <span className="text-sm font-medium">Admin</span>
          </NavLink>
        )}
      </div>

      {/* User Profile */}
      <div className="px-3 pb-4">
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-xl"
          style={{ background: 'var(--hover-bg)' }}
        >
          <div className="relative flex-shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'var(--gradient-2)' }}
            >
              {user?.displayName?.[0]?.toUpperCase() || 'U'}
            </div>
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
              style={{ background: 'var(--online)', borderColor: 'var(--bg-card)' }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p
              className="text-sm font-semibold truncate"
              style={{ color: 'var(--text-primary)' }}
            >
              {user?.displayName || 'User'}
            </p>
            <p
              className="text-[10px] truncate"
              style={{ color: 'var(--text-muted)' }}
            >
              {user?.email}
            </p>
          </div>
          <button
            onClick={logout}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition hover:opacity-70 flex-shrink-0"
            style={{ color: 'var(--text-muted)' }}
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}
