import { mockGetMe, mockUpdateMe, mockUploadAvatar, mockGetUsers, mockGetUserById } from './mockUsers';

// Using mock users API for testing without backend
export async function getMe() {
  return mockGetMe();
}

export async function updateMe({ displayName, bio }) {
  return mockUpdateMe({ displayName, bio });
}

export async function uploadAvatar() {
  return mockUploadAvatar();
}

export async function getUsers() {
  return mockGetUsers();
}

export async function getUserById(id) {
  return mockGetUserById(id);
}
