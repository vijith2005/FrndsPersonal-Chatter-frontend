import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Camera } from 'lucide-react';
import { uploadAvatar } from '../api/users';
import useAuthStore from '../store/authStore';
import Avatar from './Avatar';

const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

export default function AvatarUpload({ user }) {
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const { setUser } = useAuthStore();

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED.includes(file.type)) {
      toast.error('Only JPG, PNG, or WebP images are allowed');
      return;
    }
    if (file.size > MAX_SIZE) {
      toast.error('Image must be under 2 MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const updated = await uploadAvatar(file);
      setUser(updated);
      toast.success('Avatar updated');
      setPreview(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload avatar');
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar user={preview ? { avatarUrl: preview } : user} size="xl" />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="absolute -bottom-1 -right-1 rounded-full p-2.5 text-white shadow-warm transition hover:opacity-90 active:scale-90 disabled:opacity-50"
          style={{ background: 'var(--gradient-1)' }}
          title="Change avatar"
        >
          <Camera className="h-4 w-4" />
        </button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFile}
        className="hidden"
      />
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>JPG, PNG, or WebP. Max 2 MB.</p>
      {uploading && (
        <p className="text-sm font-semibold" style={{ color: 'var(--accent-primary)' }}>Uploading...</p>
      )}
    </div>
  );
}
