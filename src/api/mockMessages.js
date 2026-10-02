import { MOCK_MESSAGES, delay } from './mockData';

let messageIdCounter = MOCK_MESSAGES.length + 1;

export async function mockGetMessages(roomId, page = 0, size = 50) {
  await delay(400);
  const all = MOCK_MESSAGES.filter((m) => m.roomId === roomId);
  const start = page * size;
  const content = all.slice(start, start + size);
  return {
    content,
    page,
    size,
    totalElements: all.length,
    totalPages: Math.ceil(all.length / size),
    first: page === 0,
    last: start + size >= all.length,
  };
}

export function mockCreateMessage(content, sender) {
  const newMsg = {
    id: messageIdCounter++,
    content,
    sender,
    roomId: 1,
    createdAt: new Date().toISOString(),
  };
  MOCK_MESSAGES.push(newMsg);
  return newMsg;
}
