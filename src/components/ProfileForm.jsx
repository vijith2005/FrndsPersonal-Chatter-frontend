import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateMe } from '../api/users';
import useAuthStore from '../store/authStore';

export default function ProfileForm({ user }) {
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  const { setUser } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast.error('Display name is required');
      return;
    }
    setSaving(true);
    try {
      const updated = await updateMe({ displayName: displayName.trim(), bio: bio.trim() });
      setUser(updated);
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
          Display Name
        </label>
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
          value={user?.email || ''}
          className="input-field opacity-60"
          disabled
        />
        <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>Email cannot be changed</p>
      </div>

      <button type="submit" disabled={saving} className="btn-primary w-full">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
