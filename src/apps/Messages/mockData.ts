export interface Message {
  id: string;
  sender: string;
  preview: string;
  content: string;
  timestamp: string;
}

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Mom',
    preview: 'Where are you?',
    content: 'Where are you? Call me when you get this.',
    timestamp: '10:23',
  },
  {
    id: '2',
    sender: 'Alice',
    preview: 'Meeting at 3pm',
    content: 'Meeting at 3pm today. Don\'t forget to bring the documents.',
    timestamp: '09:15',
  },
  {
    id: '3',
    sender: 'Bob',
    preview: 'Thanks for yesterday',
    content: 'Thanks for yesterday! Had a great time. Let\'s do it again soon.',
    timestamp: 'Yesterday',
  },
  {
    id: '4',
    sender: 'Charlie',
    preview: 'Can you call me?',
    content: 'Can you call me? Need to discuss the project details.',
    timestamp: 'Yesterday',
  },
  {
    id: '5',
    sender: 'Work',
    preview: 'Reminder: Team meeting',
    content: 'Reminder: Team meeting tomorrow at 10am in conference room B.',
    timestamp: 'Mon',
  },
];
