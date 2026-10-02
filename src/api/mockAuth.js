import { MOCK_USERS, MOCK_ALLOWED_EMAILS, delay } from './mockData';

// Simple base64 encode for fake JWT
function createFakeJWT(user) {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Date.now(),
      exp: Date.now() + 86400000,
    })
  );
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
}

export async function mockRequestOtp(email) {
  await delay(800);
  const normalized = email.trim().toLowerCase();
  const isAllowed = MOCK_ALLOWED_EMAILS.some((e) => e.email === normalized);

  // Always return success to prevent email probing
  return {
    message: 'If this email is on the allowlist, an OTP has been sent.',
    // In real app, this would NOT be returned. For testing:
    _debug: isAllowed ? { allowed: true, otp: '123456' } : { allowed: false },
  };
}

export async function mockVerifyOtp(email, code) {
  await delay(1000);
  const normalized = email.trim().toLowerCase();
  const user = MOCK_USERS.find((u) => u.email === normalized);

  if (!user) {
    throw { response: { data: { message: 'Invalid email or code' } } };
  }

  if (code !== '123456') {
    throw { response: { data: { message: 'Invalid OTP. Use 123456 for testing.' } } };
  }

  const token = createFakeJWT(user);
  return { token, user };
}
