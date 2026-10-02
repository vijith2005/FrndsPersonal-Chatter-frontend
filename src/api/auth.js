import { mockRequestOtp, mockVerifyOtp } from './mockAuth';

// Using mock auth for testing without backend
export async function requestOtp(email) {
  return mockRequestOtp(email);
}

export async function verifyOtp(email, code) {
  return mockVerifyOtp(email, code);
}
