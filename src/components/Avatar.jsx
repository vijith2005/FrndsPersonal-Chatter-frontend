const COLORS = [
  'from-peach-300 to-peach-400',
  'from-butter-300 to-butter-400',
  'from-sage-300 to-sage-400',
  'from-sky-300 to-sky-400',
  'from-blush-300 to-blush-400',
];

function getColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Avatar({ user, size = 'md', online }) {
  const sizeClasses = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-24 w-24 text-2xl',
  };

  const dotSize = {
    sm: 'h-2.5 w-2.5',
    md: 'h-3 w-3',
    lg: 'h-3.5 w-3.5',
    xl: 'h-4 w-4',
  };

  return (
    <div className="relative inline-flex">
      {user?.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.displayName || 'Avatar'}
          className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white shadow-soft`}
        />
      ) : (
        <div
          className={`${sizeClasses[size]} bg-gradient-to-br ${getColor(user?.displayName || '?')} flex items-center justify-center rounded-full font-bold text-white ring-2 ring-white shadow-soft`}
        >
          {getInitials(user?.displayName)}
        </div>
      )}
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${dotSize[size]} rounded-full ring-2 ring-white ${
            online ? 'animate-bounce-soft' : ''
          }`}
          style={{ background: online ? 'var(--online)' : 'var(--offline)' }}
        />
      )}
    </div>
  );
}
