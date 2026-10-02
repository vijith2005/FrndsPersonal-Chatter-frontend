export default function NatureDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Floating clouds */}
      <div className="absolute top-[5%] animate-cloud-drift opacity-60">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <ellipse cx="60" cy="40" rx="50" ry="20" fill="white" />
          <ellipse cx="40" cy="30" rx="30" ry="18" fill="white" />
          <ellipse cx="80" cy="30" rx="25" ry="15" fill="white" />
        </svg>
      </div>
      <div className="absolute top-[15%] animate-cloud-drift-slow opacity-50">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
          <ellipse cx="40" cy="25" rx="35" ry="15" fill="white" />
          <ellipse cx="25" cy="18" rx="20" ry="12" fill="white" />
        </svg>
      </div>

      {/* Fireflies */}
      <div className="absolute top-[20%] left-[10%] animate-firefly">
        <div className="h-2 w-2 rounded-full bg-butter-300 shadow-glow" />
      </div>
      <div className="absolute top-[40%] right-[15%] animate-firefly-delayed">
        <div className="h-1.5 w-1.5 rounded-full bg-butter-200 shadow-glow" />
      </div>
      <div className="absolute top-[60%] left-[5%] animate-firefly">
        <div className="h-2 w-2 rounded-full bg-butter-300 shadow-glow" style={{ animationDelay: '2s' }} />
      </div>
      <div className="absolute top-[30%] right-[8%] animate-firefly-delayed">
        <div className="h-1.5 w-1.5 rounded-full bg-butter-200 shadow-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Floating leaves */}
      <div className="absolute top-[25%] right-[20%] animate-leaf-sway opacity-80">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2C10 2 4 8 4 14C4 17 7 20 10 20C13 20 16 17 16 14C16 8 10 2 10 2Z" fill="#8FC48F" />
        </svg>
      </div>
      <div className="absolute top-[55%] left-[15%] animate-leaf-sway opacity-60" style={{ animationDelay: '1s' }}>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
          <path d="M10 2C10 2 4 8 4 14C4 17 7 20 10 20C13 20 16 17 16 14C16 8 10 2 10 2Z" fill="#6AAF6A" />
        </svg>
      </div>

      {/* Tiny stars */}
      <div className="absolute top-[10%] left-[30%] animate-sparkle opacity-70">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#FFE070" />
        </svg>
      </div>
      <div className="absolute top-[70%] right-[25%] animate-sparkle opacity-50" style={{ animationDelay: '1s' }}>
        <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
          <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" fill="#FFE070" />
        </svg>
      </div>
    </div>
  );
}
