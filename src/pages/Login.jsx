import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import OtpInput from '../components/OtpInput';
import NatureDecorations from '../components/NatureDecorations';
import CyberpunkBackground from '../components/CyberpunkBackground';
import ThemeBackground from '../components/ThemeBackground';
import useAuthStore from '../store/authStore';

const ALLOWED_EMAILS = [
  'vijith122005@gmail.com',
  'arjun@example.com',
  'priya@example.com',
  'rahul@example.com',
  'sneha@example.com',
];

export default function Login() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setStep('otp');
  };

  const handleOtpComplete = async (code) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    const normalizedEmail = email.trim().toLowerCase();

    if (code === '123456' && ALLOWED_EMAILS.includes(normalizedEmail)) {
      const displayName = normalizedEmail.split('@')[0];
      const capitalizedName = displayName.charAt(0).toUpperCase() + displayName.slice(1);

      const user = {
        id: ALLOWED_EMAILS.indexOf(normalizedEmail) + 1,
        email: normalizedEmail,
        displayName: capitalizedName,
        avatarUrl: null,
        bio: 'Hey there!',
        role: normalizedEmail.includes('vijith122005') ? 'ADMIN' : 'MEMBER',
      };

      localStorage.setItem('token', 'dummy-jwt-token');
      localStorage.setItem('mock_currentUser', JSON.stringify(user));
      setUser(user);

      navigate('/', { replace: true });
    } else {
      alert('Invalid OTP. Use 123456 for testing.');
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <NatureDecorations />
      <CyberpunkBackground />
      <ThemeBackground />

      <div className="card-warm relative z-10 w-full max-w-md animate-page-enter">
        <div className="mb-8 text-center">
          <div
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-blob animate-float"
            style={{ background: 'var(--gradient-1)', boxShadow: '0 4px 20px var(--shadow-color)' }}
          >
            <span className="text-4xl">💬</span>
          </div>
          <h1 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>FrndsChat</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            {step === 'email'
              ? 'Enter your invite-only email to get started'
              : `We sent a 6-digit code to ${email}`}
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field pl-12"
                required
                autoFocus
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Send Code <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <OtpInput onComplete={handleOtpComplete} disabled={loading} />
            <div className="text-center space-y-2">
              <p className="text-xs flex items-center justify-center gap-1" style={{ color: 'var(--text-muted)' }}>
                <Sparkles className="h-3 w-3" /> Use code: 123456
              </p>
              <button
                onClick={() => {
                  setStep('email');
                  setEmail('');
                }}
                className="text-sm font-semibold transition"
                style={{ color: 'var(--accent-primary)' }}
              >
                ← Use a different email
              </button>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
          Only allowlisted emails can access this platform.
        </p>
      </div>
    </div>
  );
}
