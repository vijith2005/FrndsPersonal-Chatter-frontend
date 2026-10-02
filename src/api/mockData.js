// Mock data for testing without backend

export const MOCK_USERS = [
  {
    id: 1,
    email: 'vijith122005@gmail.com',
    displayName: 'Vijith',
    avatarUrl: null,
    bio: 'Building cool stuff with friends',
    role: 'ADMIN',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    email: 'arjun@example.com',
    displayName: 'Arjun',
    avatarUrl: null,
    bio: 'Coffee addict and code nerd',
    role: 'MEMBER',
    createdAt: '2024-01-20T14:30:00Z',
  },
  {
    id: 3,
    email: 'priya@example.com',
    displayName: 'Priya',
    avatarUrl: null,
    bio: 'Design enthusiast',
    role: 'MEMBER',
    createdAt: '2024-02-01T09:15:00Z',
  },
  {
    id: 4,
    email: 'rahul@example.com',
    displayName: 'Rahul',
    avatarUrl: null,
    bio: 'Gaming is life',
    role: 'MEMBER',
    createdAt: '2024-02-10T16:45:00Z',
  },
  {
    id: 5,
    email: 'sneha@example.com',
    displayName: 'Sneha',
    avatarUrl: null,
    bio: 'Music and chill',
    role: 'MEMBER',
    createdAt: '2024-02-15T11:20:00Z',
  },
];

export const MOCK_MESSAGES = [
  {
    id: 1,
    content: 'Hey everyone! How is it going?',
    sender: MOCK_USERS[1],
    roomId: 1,
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 2,
    content: 'Pretty good! Just finished that new project',
    sender: MOCK_USERS[0],
    roomId: 1,
    createdAt: '2024-03-01T10:05:00Z',
  },
  {
    id: 3,
    content: 'Nice! What stack did you use?',
    sender: MOCK_USERS[2],
    roomId: 1,
    createdAt: '2024-03-01T10:08:00Z',
  },
  {
    id: 4,
    content: 'React and Spring Boot, obviously',
    sender: MOCK_USERS[0],
    roomId: 1,
    createdAt: '2024-03-01T10:10:00Z',
  },
  {
    id: 5,
    content: 'Anyone up for gaming tonight?',
    sender: MOCK_USERS[3],
    roomId: 1,
    createdAt: '2024-03-01T10:15:00Z',
  },
  {
    id: 6,
    content: 'Count me in!',
    sender: MOCK_USERS[4],
    roomId: 1,
    createdAt: '2024-03-01T10:18:00Z',
  },
  {
    id: 7,
    content: 'Same here, what are we playing?',
    sender: MOCK_USERS[1],
    roomId: 1,
    createdAt: '2024-03-01T10:20:00Z',
  },
  {
    id: 8,
    content: 'Valo ranked grind, lets gooo',
    sender: MOCK_USERS[3],
    roomId: 1,
    createdAt: '2024-03-01T10:22:00Z',
  },
  {
    id: 9,
    content: 'I will be the support as always lol',
    sender: MOCK_USERS[2],
    roomId: 1,
    createdAt: '2024-03-01T10:25:00Z',
  },
  {
    id: 10,
    content: 'Haha true, someone has to keep you alive',
    sender: MOCK_USERS[3],
    roomId: 1,
    createdAt: '2024-03-01T10:28:00Z',
  },
];

export const MOCK_ALLOWED_EMAILS = [
  { id: 1, email: 'vijith122005@gmail.com' },
  { id: 2, email: 'arjun@example.com' },
  { id: 3, email: 'priya@example.com' },
  { id: 4, email: 'rahul@example.com' },
  { id: 5, email: 'sneha@example.com' },
];

// Simulate network delay
export function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
