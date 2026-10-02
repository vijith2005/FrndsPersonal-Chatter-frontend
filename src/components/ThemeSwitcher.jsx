import { useState, useRef, useEffect } from 'react';
import { Palette, Check, ChevronDown } from 'lucide-react';
import useThemeStore from '../store/themeStore';

const THEMES = [
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: 'Natural & earthy',
    emoji: '🌿',
    colors: ['#F0F7F0', '#8FC48F', '#4A8F4A', '#FFE8DC'],
    preview: 'bg-gradient-to-br from-sage-50 via-sage-100 to-peach-100',
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Futuristic & electric',
    emoji: '⚡',
    colors: ['#0A0A0F', '#00F0FF', '#FF00E5', '#7B2FFF'],
    preview: 'bg-gradient-to-br from-[#0A0A0F] via-[#1A1A2E] to-[#0D0D15]',
  },
  {
    id: 'crazy-cartoon',
    name: 'Crazy Cartoon',
    description: 'Fun & chaotic',
    emoji: '😂',
    colors: ['#FFF0F5', '#FF69B4', '#87CEEB', '#FFD700'],
    preview: 'bg-gradient-to-br from-[#FFF0F5] via-[#FFE4F0] to-[#F0F8FF]',
  },
  {
    id: 'river-rafting',
    name: 'River Rafting',
    description: 'Adventure on the rapids',
    emoji: '🌊',
    colors: ['#E8F4F8', '#4A9AE0', '#2E7DB8', '#8FC48F'],
    preview: 'bg-gradient-to-br from-[#E8F4F8] via-[#D0E8F0] to-[#B8D8E8]',
  },
  {
    id: 'mountain-expedition',
    name: 'Mountain Expedition',
    description: 'Climb to the summit',
    emoji: '⛰️',
    colors: ['#1a1a2e', '#C47A6E', '#E8A060', '#6B8E6B'],
    preview: 'bg-gradient-to-br from-[#1a1a2e] via-[#2a2a4a] to-[#16213e]',
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTheme = THEMES.find((t) => t.id === theme);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold shadow-soft transition hover:shadow-medium active:scale-95"
        style={{
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-color)',
        }}
      >
        <Palette className="h-4 w-4" style={{ color: 'var(--accent-primary)' }} />
        <span className="hidden sm:inline">{currentTheme?.emoji} {currentTheme?.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border p-2 shadow-medium backdrop-blur-sm animate-scale-in max-h-[70vh] overflow-y-auto"
          style={{
            background: 'var(--bg-card-solid)',
            borderColor: 'var(--border-color)',
          }}
        >
          <p
            className="px-3 py-2 text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            Choose Theme
          </p>
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:scale-[1.02]"
              style={{
                background: theme === t.id ? 'var(--nav-active-bg)' : 'transparent',
              }}
            >
              <div
                className={`h-10 w-10 rounded-xl shadow-soft flex-shrink-0 ${t.preview}`}
                style={{ border: '1px solid var(--border-color)' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  {t.emoji} {t.name}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.description}</p>
              </div>
              {theme === t.id && (
                <Check className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--accent-primary)' }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
