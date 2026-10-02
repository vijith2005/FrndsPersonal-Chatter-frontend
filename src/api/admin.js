import { mockGetAllowedEmails, mockAddAllowedEmail, mockRemoveAllowedEmail, mockGetAdminUsers } from './mockAdmin';

// Using mock admin API for testing without backend
export async function getAllowedEmails() {
  return mockGetAllowedEmails();
}

export async function addAllowedEmail(email) {
  return mockAddAllowedEmail(email);
}

export async function removeAllowedEmail(id) {
  return mockRemoveAllowedEmail(id);
}

export async function getAdminUsers() {
  return mockGetAdminUsers();
}
