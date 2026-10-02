import { MOCK_ALLOWED_EMAILS, MOCK_USERS, delay } from './mockData';

let emailIdCounter = MOCK_ALLOWED_EMAILS.length + 1;

export async function mockGetAllowedEmails() {
  await delay(300);
  return [...MOCK_ALLOWED_EMAILS];
}

export async function mockAddAllowedEmail(email) {
  await delay(400);
  const normalized = email.trim().toLowerCase();
  if (MOCK_ALLOWED_EMAILS.some((e) => e.email === normalized)) {
    throw { response: { data: { message: 'Email already exists' } } };
  }
  const newEntry = { id: emailIdCounter++, email: normalized };
  MOCK_ALLOWED_EMAILS.push(newEntry);
  return newEntry;
}

export async function mockRemoveAllowedEmail(id) {
  await delay(300);
  const idx = MOCK_ALLOWED_EMAILS.findIndex((e) => e.id === parseInt(id));
  if (idx === -1) throw { response: { data: { message: 'Not found' } } };
  MOCK_ALLOWED_EMAILS.splice(idx, 1);
  return { success: true };
}

export async function mockGetAdminUsers() {
  await delay(400);
  return [...MOCK_USERS];
}
