// lib/dummy-data.js
// Yeh file backend banane ke baad delete kar dena

export const dummyUser = {
  fullName: 'Priya Sharma',
  email: 'priya@email.com',
  phone: '+91 98765 43210',
  city: 'Delhi',
  emergencyContact: '+91 98765 00000',
  emergencyName: 'Mom',
}

export const dummyCommunityPosts = [
  {
    id: 1,
    location: 'Metro Line 2',
    time: '4 min ago',
    text: 'Auto driver behaving strangely near Lajpat Nagar.',
    helped: false,
  },
  {
    id: 2,
    location: 'South Delhi',
    time: '12 min ago',
    text: 'Being followed near the market. Need someone on call.',
    helped: false,
  },
  {
    id: 3,
    location: 'Connaught Place',
    time: '20 min ago',
    text: 'Street lights off near CP metro exit. Very dark.',
    helped: false,
  },
]

export const dummySafetyZones = [
  { id: 1, name: 'Lajpat Nagar',   status: 'safe'    },
  { id: 2, name: 'Paharganj',      status: 'unsafe'  },
  { id: 3, name: 'Connaught Place',status: 'caution' },
  { id: 4, name: 'Saket',          status: 'safe'    },
]

export const dummyPeriodData = {
  cycleLength: 28,
  lastPeriod: '2026-04-20',
  currentDay: 14,
  phase: 'fertile',
  nextPeriod: '2026-05-18',
}

export const dummyMoodHistory = [
  { date: '2026-05-01', mood: 'happy'   },
  { date: '2026-05-02', mood: 'calm'    },
  { date: '2026-05-03', mood: 'anxious' },
  { date: '2026-05-04', mood: 'tired'   },
  { date: '2026-05-05', mood: 'happy'   },
]

export const dummyPrivateIssues = [
  {
    id: 1,
    category: 'Mental Health',
    concern: 'I have been feeling very anxious and cannot sleep properly...',
    status: 'replied',
    date: '3 days ago',
    reply: 'This sounds like anxiety-related insomnia. Try 10 minutes of deep breathing before sleep.',
  },
  {
    id: 2,
    category: 'Physical Health',
    concern: 'Experiencing severe cramps and irregular periods for 3 months...',
    status: 'review',
    date: '1 day ago',
    reply: '',
  },
]

export const dummyRemedies = [
  {
    id: 1,
    icon: '🌿',
    name: 'Turmeric Milk',
    hindi: 'हल्दी दूध',
    tag: 'Cramps',
    desc: 'Anti-inflammatory, calms period pain',
    how: 'Add 1 tsp turmeric + pinch of black pepper to warm milk.',
  },
  {
    id: 2,
    icon: '🫚',
    name: 'Ginger Tea',
    hindi: 'अदरक की चाय',
    tag: 'Bloating',
    desc: 'Reduces bloating and nausea',
    how: 'Boil 1 inch fresh ginger in 2 cups water for 10 mins.',
  },
  {
    id: 3,
    icon: '🌱',
    name: 'Ashwagandha',
    hindi: 'अश्वगंधा',
    tag: 'Stress',
    desc: 'Balances hormones and reduces stress',
    how: 'Take 1/2 tsp ashwagandha powder in warm milk at night.',
  },
  {
    id: 4,
    icon: '🍯',
    name: 'Honey + Cinnamon',
    hindi: 'शहद और दालचीनी',
    tag: 'Mood',
    desc: 'Boosts energy and lifts mood',
    how: 'Mix 1 tsp honey + 1/4 tsp cinnamon in warm water each morning.',
  },
  {
    id: 5,
    icon: '🌸',
    name: 'Shatavari',
    hindi: 'शतावरी',
    tag: 'Hormones',
    desc: 'Supports female reproductive health',
    how: 'Take 1 tsp shatavari powder in warm milk twice daily.',
  },
]