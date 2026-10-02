import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Check } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Avatar from '../components/Avatar';
import NatureDecorations from '../components/NatureDecorations';
import CyberpunkBackground from '../components/CyberpunkBackground';
import ThemeBackground from '../components/ThemeBackground';
import ThemeSwitcher from '../components/ThemeSwitcher';

const DUMMY_PROFILES = {
  1: { id: 1, displayName: 'Vijith', bio: 'Building cool stuff with friends', avatarUrl: null, role: 'ADMIN' },
  2: { id: 2, displayName: 'Arjun', bio: 'Coffee addict and code nerd', avatarUrl: null, role: 'MEMBER' },
  3: { id: 3, displayName: 'Priya', bio: 'Design enthusiast', avatarUrl: null, role: 'MEMBER' },
  4: { id: 4, displayName: 'Rahul', bio: 'Gaming is life', avatarUrl: null, role: 'MEMBER' },
  5: { id: 5, displayName: 'Sneha', bio: 'Music and chill', avatarUrl: null, role: 'MEMBER' },
};

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser, setUser } = useAuthStore();
  const isOwnProfile = !id || String(currentUser?.id) === String(id);

  const [displayName, setDisplayName] = useState(
    isOwnProfile ? currentUser?.displayName || '' : DUMMY_PROFILES[id]?.displayName || ''
  );
  const [bio, setBio] = useState(
    isOwnProfile ? currentUser?.bio || '' : DUMMY_PROFILES[id]?.bio || ''
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const profile = isOwnProfile ? currentUser : DUMMY_PROFILES[id];

  const handleSave = async () => {
    if (!displayName.trim()) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    if (isOwnProfile) {
      setUser({ ...currentUser, displayName: displayName.trim(), bio: bio.trim() });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  if (!isOwnProfile && profile) {
    return (
      <div className="h-full overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
        <div className="flex items-center justify-center px-4 py-8">
          <div className="card-warm w-full max-w-md text-center animate-page-enter">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 text-sm font-semibold transition"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="animate-float inline-block">
              <Avatar user={profile} size="xl" online={true} />
            </div>
            <h2 className="mt-4 text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
              {profile.displayName || 'User'}
            </h2>
            <span
              className="inline-block mt-2 rounded-full px-3 py-1 text-xs font-bold"
              style={{
                background: profile.role === 'ADMIN' ? 'var(--nav-active-bg)' : 'var(--hover-bg)',
                color: profile.role === 'ADMIN' ? 'var(--nav-active)' : 'var(--text-secondary)',
              }}
            >
              {profile.role}
            </span>
            {profile.bio && (
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{profile.bio}</p>
            )}
            <div className="mt-6 flex justify-center gap-6 text-center">
              <div>
                <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>42</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Messages</p>
              </div>
              <div>
                <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>7</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Days Active</p>
              </div>
              <div>
                <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>5</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Friends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex items-center justify-center px-4 py-8">
        <div className="card-warm w-full max-w-md animate-page-enter">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>Your Profile</h2>
            <ThemeSwitcher />
          </div>

          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar user={avatarPreview ? { avatarUrl: avatarPreview } : currentUser} size="xl" />
              <label
                className="absolute -bottom-1 -right-1 rounded-full p-2.5 text-white shadow-warm cursor-pointer transition hover:opacity-90 active:scale-90"
                style={{ background: 'var(--gradient-1)' }}
              >
                <Camera className="h-4 w-4" />
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>JPG, PNG, or WebP. Max 2 MB.</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input-field"
                maxLength={50}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>Bio</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="input-field min-h-[100px] resize-y rounded-2xl"
                maxLength={300}
                placeholder="Tell your friends about yourself..."
              />
              <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>{bio.length}/300</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>Email</label>
              <input
                type="email"
                value={currentUser?.email || 'vijith122005@gmail.com'}
                className="input-field opacity-60"
                disabled
              />
              <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>Email cannot be changed</p>
            </div>

            <button onClick={handleSave} disabled={saving || !displayName.trim()} className="btn-primary w-full">
              {saving ? (
                <span className="animate-spin">⏳</span>
              ) : saved ? (
                <>
                  <Check className="h-4 w-4" /> Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
