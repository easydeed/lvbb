import { Target, Dumbbell, Flame, Brain, type LucideIcon } from 'lucide-react'

export const CLINIC = {
  club: 'La Verne Athletic Club',
  title: '6 Workout Clinic',
  tagline: 'Get Your Reps In. Get Better. Get Ready.',
  price: 'FREE',
  time: '5:30 PM – 7:30 PM',
  location: 'Mt. SAC & Bonita High School',
  openTo: '12U Players',
  whatToBring: 'Glove, cleats, bat, water bottle & a positive attitude',
  phone: '(909) 596-2096',
  phoneHref: 'tel:+19095962096',
  website: 'laverneathleticclub.com',
  websiteHref: 'https://laverneathleticclub.com',
  instagram: '@laverneathleticclub',
  instagramHref: 'https://instagram.com/laverneathleticclub',
} as const

export const LOCATIONS: { name: string; address: string }[] = [
  {
    name: 'Mt. SAC',
    address: '1100 N. Grand Ave., Walnut, CA 91789',
  },
  {
    name: 'Bonita High School',
    address: '3102 D Street, La Verne, CA 91750',
  },
]

export const DATES: { month: string; day: string; suffix: string }[] = [
  { month: 'AUG', day: '10', suffix: 'TH' },
  { month: 'AUG', day: '12', suffix: 'TH' },
  { month: 'AUG', day: '17', suffix: 'TH' },
  { month: 'AUG', day: '19', suffix: 'TH' },
  { month: 'AUG', day: '24', suffix: 'TH' },
  { month: 'AUG', day: '26', suffix: 'TH' },
]

export const FEATURES: {
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    icon: Target,
    title: 'Elite Instruction',
    description:
      'Learn directly from a National Coach of the Year and a veteran head coach.',
  },
  {
    icon: Dumbbell,
    title: 'Complete Development',
    description: 'Strength, speed, mechanics, and baseball IQ in every session.',
  },
  {
    icon: Flame,
    title: 'Live Reps & Competition',
    description:
      "Game-like situations so you're ready for fall ball and travel ball tryouts.",
  },
  {
    icon: Brain,
    title: 'Mental Toughness',
    description: 'Build the confidence and competitive mindset that gets you noticed.',
  },
]

export const COACHES: {
  name: string
  title: string
  bullets: string[]
}[] = [
  {
    name: 'Coach John Knott',
    title: 'Head Coach, Mt. SAC Baseball',
    bullets: [
      '2025 ABCA National Coach of the Year',
      'Led Mt. SAC to its first state championship in 60 years (45–6 in 2025) and five conference titles',
      'Former head coach who led Bonita High School to a 2012 CIF Championship',
      'Has sent 110+ players on to four-year programs',
    ],
  },
  {
    name: 'Coach Ryan Marcos',
    title: 'Head Coach, Bonita High School Baseball',
    bullets: [
      '23 years of coaching experience developing players in the La Verne area',
    ],
  },
]
