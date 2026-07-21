import { Target, Dumbbell, Flame, Brain, type LucideIcon } from 'lucide-react'

export const CLINIC = {
  club: 'La Verne Athletic Club',
  title: '6 Workout Clinic',
  tagline: 'Train. Compete. Get Better.',
  price: 'FREE',
  time: '5:00 PM – 7:00 PM',
  location: 'La Verne Athletic Club',
  openTo: 'Middle School & High School Players',
  whatToBring: 'Glove, cleats, bat, water bottle & a great attitude',
  phone: '(909) 596-2096',
  phoneHref: 'tel:+19095962096',
  website: 'laverneathleticclub.com',
  websiteHref: 'https://laverneathleticclub.com',
  instagram: '@laverneathleticclub',
  instagramHref: 'https://instagram.com/laverneathleticclub',
} as const

export const DATES: { month: string; day: string; suffix: string }[] = [
  { month: 'AUG', day: '10', suffix: 'TH' },
  { month: 'AUG', day: '13', suffix: 'TH' },
  { month: 'AUG', day: '17', suffix: 'TH' },
  { month: 'AUG', day: '20', suffix: 'TH' },
  { month: 'AUG', day: '24', suffix: 'TH' },
  { month: 'AUG', day: '27', suffix: 'TH' },
]

export const FEATURES: {
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    icon: Target,
    title: 'Elite Instruction',
    description: 'Learn from two accomplished coaches with proven track records.',
  },
  {
    icon: Dumbbell,
    title: 'Complete Development',
    description: 'Improve strength, speed, mechanics, and baseball IQ.',
  },
  {
    icon: Flame,
    title: 'High Intensity Training',
    description: 'Game-like reps in a competitive environment.',
  },
  {
    icon: Brain,
    title: 'Mental Toughness',
    description: 'Build confidence, focus and a winning mindset.',
  },
]
