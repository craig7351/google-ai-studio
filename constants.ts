import { AppCategory, AppEntry } from './types';

export const CATEGORIES = [
  { id: AppCategory.ALL, icon: 'LayoutGrid' },
  { id: AppCategory.GAMES, icon: 'Gamepad2' },
  { id: AppCategory.EDUCATION, icon: 'GraduationCap' },
  { id: AppCategory.PRODUCTIVITY, icon: 'CheckSquare' },
  { id: AppCategory.SOCIAL, icon: 'Users' },
  { id: AppCategory.UTILITIES, icon: 'Wrench' },
  { id: AppCategory.ENTERTAINMENT, icon: 'Film' },
  { id: AppCategory.PHOTO_VIDEO, icon: 'Camera' },
  { id: AppCategory.HEALTH, icon: 'HeartPulse' },
  { id: AppCategory.FINANCE, icon: 'DollarSign' },
];

export const MOCK_APPS: AppEntry[] = [
  {
    id: '1',
    name: 'Nebula Runner',
    description: 'An endless runner set in a vibrant cyberpunk universe. Dodge neon obstacles and collect energy cores to survive.',
    category: AppCategory.GAMES,
    link: 'https://example.com/nebula-runner',
    images: [
      'https://picsum.photos/400/800?random=1',
      'https://picsum.photos/400/800?random=2',
      'https://picsum.photos/400/800?random=3'
    ],
    createdAt: Date.now()
  },
  {
    id: '2',
    name: 'FocusFlow',
    description: 'A minimalist productivity timer based on the Pomodoro technique, designed to help you stay in the zone.',
    category: AppCategory.PRODUCTIVITY,
    link: 'https://example.com/focus-flow',
    images: [
      'https://picsum.photos/400/800?random=4',
      'https://picsum.photos/400/800?random=5'
    ],
    createdAt: Date.now() - 100000
  },
  {
    id: '3',
    name: 'LingoLeap',
    description: 'Master new languages with bite-sized lessons and real-time pronunciation feedback powered by AI.',
    category: AppCategory.EDUCATION,
    link: 'https://example.com/lingoleap',
    images: [
      'https://picsum.photos/400/800?random=6',
      'https://picsum.photos/400/800?random=7',
      'https://picsum.photos/400/800?random=8'
    ],
    createdAt: Date.now() - 200000
  }
];