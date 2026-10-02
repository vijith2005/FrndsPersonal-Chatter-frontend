import { MOCK_USERS, delay } from './mockData';

export async function mockGetMe() {
  await delay(300);
  // Return the "logged in" user (stored in localStorage)
  const stored = localStorage.getItem('mock_currentUser');
  if (stored) return JSON.parse(stored);
  return MOCK_USERS[0];
}

export async function mockUpdateMe({ displayName, bio }) {
  await delay(500);
  const stored = localStorage.getItem('mock_currentUser');
  const current = stored ? JSON.parse(stored) : MOCK_USERS[0];
  const updated = { ...current, displayName, bio };
  localStorage.setItem('mock_currentUser', JSON.stringify(updated));
  return updated;
}

export async function mockUploadAvatar() {
  await delay(800);
  const stored = localStorage.getItem('mock_currentUser');
  const current = stored ? JSON.parse(stored) : MOCK_USERS[0];
  // Return a placeholder avatar
  const updated = { ...current, avatarUrl: null };
  localStorage.setItem('mock_currentUser', JSON.stringify(updated));
  return updated;
}

export async function mockGetUsers() {
  await delay(400);
  return MOCK_USERS;
}

export async function mockGetUserById(id) {
  await delay(300);
  const user = MOCK_USERS.find((u) => u.id === parseInt(id));
  if (!user) throw { response: { data: { message: 'User not found' } } };
  // Return public profile (no email)
  const { email, ...publicProfile } = user;
  return publicProfile;
}
