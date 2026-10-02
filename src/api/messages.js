import { mockGetMessages } from './mockMessages';

// Using mock messages API for testing without backend
export async function getMessages(roomId, page = 0, size = 50) {
  return mockGetMessages(roomId, page, size);
}
