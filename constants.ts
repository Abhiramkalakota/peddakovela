import type { Seva, Donation, User } from './types';
import { Role } from './types';

export const MOCK_USERS: Record<string, Omit<User, 'username'>> = {
    'admin': { id: 'user-admin-01', role: Role.ADMIN },
    'devotee': { id: 'user-devotee-01', role: Role.DEVOTEE },
};

export const MOCK_SEVAS: Seva[] = [
  {
    id: 'seva-01',
    name: 'Morning Aarti',
    description: 'Participate in the auspicious morning prayers to start your day with divine blessings.',
    timing: 'Daily at 6:00 AM',
    imageUrl: 'https://picsum.photos/seed/aarti/400/300',
    amount: 251,
  },
  {
    id: 'seva-02',
    name: 'Anna Daanam',
    description: 'Contribute to the sacred tradition of offering food to all devotees visiting the temple.',
    timing: 'Daily from 12:00 PM to 2:00 PM',
    imageUrl: 'https://picsum.photos/seed/food/400/300',
    amount: 501,
  },
  {
    id: 'seva-03',
    name: 'Vastra Daanam',
    description: 'Offer new clothes for the temple deities, a service of utmost devotion and purity.',
    timing: 'Special occasions and festivals',
    imageUrl: 'https://picsum.photos/seed/vastra/400/300',
    amount: 1001,
  },
   {
    id: 'seva-04',
    name: 'Evening Bhajan Sandhya',
    description: 'Immerse yourself in devotional songs and chants during the serene evening hours.',
    timing: 'Daily at 7:00 PM',
    imageUrl: 'https://picsum.photos/seed/bhajan/400/300',
    amount: 151,
  },
];

export const MOCK_DONATIONS: Donation[] = [
    { id: 'DON001', devoteeId: 'user-devotee-01', devoteeName: 'devotee', amount: 501, date: '2024-07-15', seva: 'Anna Daanam', gotram: 'Kashyapa', phoneNumber: '9876543210', familyNames: 'Spouse, Child1', paymentId: 'pay_N6zQc2g3fGhjKl' },
    { id: 'DON002', devoteeId: 'user-devotee-02', devoteeName: 'Rohan Sharma', amount: 1001, date: '2024-07-16', seva: 'Vastra Daanam', gotram: 'Bharadwaja', paymentId: 'pay_N6zR1tHjL9kOpW' },
    { id: 'DON003', devoteeId: 'user-devotee-01', devoteeName: 'devotee', amount: 251, date: '2024-07-18', seva: 'Morning Aarti', phoneNumber: '9876543210', paymentId: 'pay_N6zS5fGhK8jLmX' },
    { id: 'DON004', devoteeId: 'user-devotee-03', devoteeName: 'Priya Patel', amount: 1001, date: '2024-07-20', seva: 'General Donation', paymentId: 'pay_N6zT9vBnM7kYpZ' },
];