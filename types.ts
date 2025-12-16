export interface AppEntry {
  id: string;
  name: string;
  description: string;
  category: string;
  link: string;
  images: string[];
  createdAt: number;
}

export enum AppCategory {
  ALL = 'All Apps',
  GAMES = 'Games',
  EDUCATION = 'Education',
  PRODUCTIVITY = 'Productivity',
  SOCIAL = 'Social Networking',
  UTILITIES = 'Utilities',
  HEALTH = 'Health & Fitness',
  ENTERTAINMENT = 'Entertainment',
  PHOTO_VIDEO = 'Photo & Video',
  FINANCE = 'Finance',
  LIFESTYLE = 'Lifestyle'
}
