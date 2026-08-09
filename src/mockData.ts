import {
  ClassSession,
  Trainer,
  MembershipPlan,
  User,
  FitnessGoal,
  WorkoutLog,
  BodyMeasurement,
  PersonalRecord,
  Invoice,
  Equipment,
  ClassBooking,
  SavedPaymentMethod
} from './types';

export const INITIAL_CLASSES: ClassSession[] = [
  {
    id: 'cls-1',
    name: 'Sunrise Power Yoga Flow',
    category: 'Yoga',
    level: 'All Levels',
    trainerId: 'trn-1',
    trainerName: 'Elena Rostova',
    trainerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    dayOfWeek: 'Mon',
    time: '07:00 AM',
    durationMinutes: 60,
    room: 'Studio A (Zen Room)',
    capacity: 20,
    bookedCount: 16,
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
    description: 'Dynamic morning Vinyasa flow designed to awaken body strength, improve flexibility, and align mental focus for the day ahead.',
    amenities: ['Yoga Mats Provided', 'Filtered Water', 'Scented Towels'],
    rating: 4.9,
    reviewCount: 38,
    featured: true
  },
  {
    id: 'cls-2',
    name: 'Metabolic HIIT Conditioning',
    category: 'HIIT',
    level: 'Intermediate',
    trainerId: 'trn-2',
    trainerName: 'Marcus Vance',
    trainerAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=250&q=80',
    dayOfWeek: 'Mon',
    time: '08:30 AM',
    durationMinutes: 45,
    room: 'Main Turf Arena',
    capacity: 15,
    bookedCount: 15,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    description: 'High-intensity interval training combining kettlebells, plyometrics, and battle ropes to spike metabolic rate and burn peak calories.',
    amenities: ['Heart Rate Monitors', 'Heart Rate Screen', 'Chilled Towels'],
    rating: 4.8,
    reviewCount: 52,
    featured: true
  },
  {
    id: 'cls-3',
    name: 'Olympic Weightlifting Fundamentals',
    category: 'Strength',
    level: 'Advanced',
    trainerId: 'trn-3',
    trainerName: 'Coach Dave Miller',
    trainerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    dayOfWeek: 'Tue',
    time: '10:00 AM',
    durationMinutes: 75,
    room: 'Iron Pit Deck',
    capacity: 12,
    bookedCount: 8,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    description: 'Technical workshop focusing on the Snatch and Clean & Jerk mechanics, bar path velocity, and mobility drills.',
    amenities: ['Chalk Stations', 'Lifting Belts', 'Video Form Review'],
    rating: 5.0,
    reviewCount: 29
  },
  {
    id: 'cls-4',
    name: 'CrossFit Endurance Challenge',
    category: 'CrossFit',
    level: 'Advanced',
    trainerId: 'trn-2',
    trainerName: 'Marcus Vance',
    trainerAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=250&q=80',
    dayOfWeek: 'Wed',
    time: '05:30 PM',
    durationMinutes: 60,
    room: 'Box Arena B',
    capacity: 18,
    bookedCount: 14,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
    description: 'High-octane WOD incorporating rower intervals, box jumps, wall balls, and barbell thrusters under timed rounds.',
    amenities: ['Lockers Available', 'Electrolyte Station'],
    rating: 4.7,
    reviewCount: 44,
    featured: true
  },
  {
    id: 'cls-5',
    name: 'Rhythm Cardio Zumba',
    category: 'Zumba',
    level: 'Beginner',
    trainerId: 'trn-4',
    trainerName: 'Sofia Gomez',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    dayOfWeek: 'Thu',
    time: '06:00 PM',
    durationMinutes: 50,
    room: 'Dance Studio C',
    capacity: 25,
    bookedCount: 22,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    description: 'High-energy cardio dance party set to Latin and global beats. Fun, accessible, and an incredible aerobic burn!',
    amenities: ['Surround Sound', 'Party Lighting', 'Water Refill'],
    rating: 4.9,
    reviewCount: 61
  },
  {
    id: 'cls-6',
    name: 'Core & Reformer Pilates',
    category: 'Pilates',
    level: 'Intermediate',
    trainerId: 'trn-1',
    trainerName: 'Elena Rostova',
    trainerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    dayOfWeek: 'Fri',
    time: '09:00 AM',
    durationMinutes: 55,
    room: 'Pilates Reformer Loft',
    capacity: 10,
    bookedCount: 9,
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80',
    description: 'Precision core stabilizer strengthening using Allegro Reformers to enhance posture, spine mobility, and lean tone.',
    amenities: ['Reformer Machines', 'Grip Socks Required', 'Towel Service'],
    rating: 4.9,
    reviewCount: 27
  },
  {
    id: 'cls-7',
    name: 'Weekend Cardio Shred',
    category: 'Cardio',
    level: 'All Levels',
    trainerId: 'trn-4',
    trainerName: 'Sofia Gomez',
    trainerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    dayOfWeek: 'Sat',
    time: '10:30 AM',
    durationMinutes: 60,
    room: 'Main Turf Arena',
    capacity: 20,
    bookedCount: 11,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80',
    description: 'Weekend endurance challenge featuring assault bikes, ski ergs, agility ladders, and lightweight body conditioning.',
    amenities: ['Water Station', 'Heart Rate Tracker'],
    rating: 4.8,
    reviewCount: 19
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'trn-1',
    name: 'Thomas Millar',
    title: 'Exercise Trainer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    rating: 4.9,
    reviewCount: 124,
    specializations: ['Strength', 'Cardio'],
    bio: 'Certified master instructor with 15+ years experience in muscle building, exercise biomechanics, and personalized fitness coaching.',
    experienceYears: 15,
    hourlyRate: 65,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    certifications: ['NASM Master Trainer', 'Precision Nutrition L2', 'CSCS Certified'],
    assignedClassCount: 4
  },
  {
    id: 'trn-2',
    name: 'Evelyn',
    title: 'Gym Trainer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    rating: 4.9,
    reviewCount: 98,
    specializations: ['CrossFit', 'Pilates'],
    bio: 'Specialist in functional mobility, core stabilization, Pilates reformer, and high-energy group fitness sessions.',
    experienceYears: 8,
    hourlyRate: 70,
    availableDays: ['Mon', 'Tue', 'Thu', 'Fri'],
    certifications: ['ACE Certified Personal Trainer', 'RYT 500 Yoga Alliance', 'Pilates Reformer'],
    assignedClassCount: 5
  },
  {
    id: 'trn-3',
    name: 'Mark',
    title: 'Gym Trainer',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=250&q=80',
    rating: 5.0,
    reviewCount: 142,
    specializations: ['HIIT', 'Strength'],
    bio: 'Former professional boxer and strength coach focusing on explosive cardio, endurance, and elite body conditioning.',
    experienceYears: 12,
    hourlyRate: 80,
    availableDays: ['Tue', 'Wed', 'Fri', 'Sun'],
    certifications: ['USA Boxing Coach', 'NSCA CSCS', 'Functional Movement Specialist'],
    assignedClassCount: 6
  },
  {
    id: 'trn-4',
    name: 'Eliana',
    title: 'Exercise Trainer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    rating: 4.8,
    reviewCount: 86,
    specializations: ['Yoga', 'Zumba'],
    bio: 'Behavioral fitness coach combining physical training with mind-body wellness, nutrition habit building, and recovery.',
    experienceYears: 7,
    hourlyRate: 60,
    availableDays: ['Mon', 'Thu', 'Sat'],
    certifications: ['ISSA Certified Trainer', 'Behavioral Health Fitness Coach'],
    assignedClassCount: 3
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic',
    monthlyPrice: 49,
    annualPrice: 490,
    description: 'Perfect entry plan for consistent weekly workout routines and full access to gym facilities.',
    features: [
      { text: 'Full Gym Floor Access', included: true },
      { text: 'Locker & Shower Access', included: true },
      { text: 'Free Wi-Fi', included: true },
      { text: 'Group Fitness Classes', included: false },
      { text: 'Personal Trainer Sessions', included: false }
    ]
  },
  {
    id: 'plan-standard',
    name: 'Standard',
    monthlyPrice: 99,
    annualPrice: 990,
    popular: true,
    description: 'Our most popular plan with complete access to all group fitness classes and trainer guidance.',
    features: [
      { text: 'Full Gym Floor Access', included: true },
      { text: 'Locker & Shower Access', included: true },
      { text: 'Free Wi-Fi', included: true },
      { text: 'Unlimited Group Classes', included: true },
      { text: '1 Personal Trainer Session/mo', included: true }
    ]
  },
  {
    id: 'plan-premium',
    name: 'Premium',
    monthlyPrice: 149,
    annualPrice: 1490,
    description: 'All-inclusive VIP access including 1-on-1 personal trainer sessions and nutrition consultation.',
    features: [
      { text: 'Full Gym Floor Access', included: true },
      { text: 'Locker & Shower Access', included: true },
      { text: 'Free Wi-Fi', included: true },
      { text: 'Unlimited Group Classes', included: true },
      { text: '4 Personal Trainer Sessions/mo', included: true }
    ]
  }
];

export const INITIAL_CURRENT_USER: User = {
  id: 'usr-101',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 234-5678',
  role: 'member',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
  membershipPlan: 'Premium',
  membershipStatus: 'Active',
  joinDate: '2025-01-15',
  lastActivity: '2 hours ago',
  streakDays: 7,
  weightKg: 75.5,
  targetWeightKg: 71.0,
  heightCm: 178,
  bio: 'Fitness enthusiast working on functional strength, body decomposition, and preparing for my first half-marathon.',
  emergencyContact: 'Sarah Doe (+1 555-987-6543)'
};

export const INITIAL_MEMBERS: User[] = [
  INITIAL_CURRENT_USER,
  {
    id: 'usr-102',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 876-1234',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    membershipPlan: 'Standard',
    membershipStatus: 'Active',
    joinDate: '2025-02-01',
    lastActivity: 'Yesterday',
    streakDays: 12,
    weightKg: 62.0,
    targetWeightKg: 58.0,
    heightCm: 165
  },
  {
    id: 'usr-103',
    name: 'Alex Rivera',
    email: 'arivera@example.com',
    phone: '+1 (555) 432-8765',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    membershipPlan: 'Basic',
    membershipStatus: 'Active',
    joinDate: '2025-03-10',
    lastActivity: '3 days ago',
    streakDays: 4,
    weightKg: 84.0,
    targetWeightKg: 80.0,
    heightCm: 182
  },
  {
    id: 'usr-104',
    name: 'Emily Watson',
    email: 'emily.w@example.com',
    phone: '+1 (555) 654-3210',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=250&q=80',
    membershipPlan: 'Premium',
    membershipStatus: 'Paused',
    joinDate: '2024-11-20',
    lastActivity: '1 week ago',
    streakDays: 0,
    weightKg: 59.5,
    targetWeightKg: 57.0,
    heightCm: 168
  },
  {
    id: 'usr-105',
    name: 'David Kim',
    email: 'dkim@example.com',
    phone: '+1 (555) 998-1122',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    membershipPlan: 'Standard',
    membershipStatus: 'Expired',
    joinDate: '2024-08-12',
    lastActivity: '2 weeks ago',
    streakDays: 0,
    weightKg: 79.0,
    targetWeightKg: 75.0,
    heightCm: 175
  }
];

export const INITIAL_MEMBER_BOOKINGS: ClassBooking[] = [
  {
    id: 'bk-1',
    classId: 'cls-1',
    className: 'Sunrise Power Yoga Flow',
    trainerName: 'Elena Rostova',
    date: 'Tomorrow, Aug 9',
    time: '07:00 AM',
    status: 'Confirmed',
    room: 'Studio A (Zen Room)',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bk-2',
    classId: 'cls-2',
    className: 'Metabolic HIIT Conditioning',
    trainerName: 'Marcus Vance',
    date: 'Mon, Aug 11',
    time: '08:30 AM',
    status: 'Confirmed',
    room: 'Main Turf Arena',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bk-3',
    classId: 'cls-4',
    className: 'CrossFit Endurance Challenge',
    trainerName: 'Marcus Vance',
    date: 'Wed, Aug 13',
    time: '05:30 PM',
    status: 'Waitlisted',
    waitlistPosition: 2,
    room: 'Box Arena B',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bk-4',
    classId: 'cls-6',
    className: 'Core & Reformer Pilates',
    trainerName: 'Elena Rostova',
    date: 'Aug 2, 2026',
    time: '09:00 AM',
    status: 'Completed',
    room: 'Pilates Reformer Loft',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80'
  }
];

export const INITIAL_GOALS: FitnessGoal[] = [
  {
    id: 'gl-1',
    title: 'Lose Weight & Cut Fat',
    category: 'Weight Loss',
    currentValue: 75.5,
    targetValue: 71.0,
    unit: 'kg',
    deadline: 'Sep 30, 2026'
  },
  {
    id: 'gl-2',
    title: 'Weekly Workout Consistency',
    category: 'Habit',
    currentValue: 4,
    targetValue: 5,
    unit: 'sessions/wk',
    deadline: 'Ongoing'
  },
  {
    id: 'gl-3',
    title: 'Bench Press PR Goal',
    category: 'Strength',
    currentValue: 95,
    targetValue: 110,
    unit: 'kg',
    deadline: 'Oct 15, 2026'
  },
  {
    id: 'gl-4',
    title: '5K Run Time Sub-22m',
    category: 'Endurance',
    currentValue: 24.5,
    targetValue: 21.5,
    unit: 'mins',
    deadline: 'Aug 31, 2026'
  }
];

export const INITIAL_WORKOUT_LOGS: WorkoutLog[] = [
  {
    id: 'wl-1',
    date: '2026-08-07',
    exercise: 'Barbell Back Squat & Kettlebell Swings',
    category: 'Strength',
    durationMinutes: 55,
    caloriesBurned: 480,
    setsReps: '4 sets x 8 reps @ 100kg',
    weightKg: 100,
    trainerName: 'Dave Miller'
  },
  {
    id: 'wl-2',
    date: '2026-08-05',
    exercise: 'Metabolic HIIT Conditioning Class',
    category: 'HIIT',
    durationMinutes: 45,
    caloriesBurned: 520,
    trainerName: 'Marcus Vance'
  },
  {
    id: 'wl-3',
    date: '2026-08-03',
    exercise: '5km Treadmill Tempo Run + Core Drills',
    category: 'Cardio',
    durationMinutes: 35,
    caloriesBurned: 390
  },
  {
    id: 'wl-4',
    date: '2026-08-01',
    exercise: 'Sunrise Power Yoga Flow',
    category: 'Yoga',
    durationMinutes: 60,
    caloriesBurned: 260,
    trainerName: 'Elena Rostova'
  }
];

export const INITIAL_BODY_MEASUREMENTS: BodyMeasurement[] = [
  { date: 'May 2026', chestCm: 104, waistCm: 88, hipsCm: 100, thighsCm: 59, armsCm: 37, weightKg: 78.5 },
  { date: 'Jun 2026', chestCm: 103, waistCm: 86, hipsCm: 99, thighsCm: 58.5, armsCm: 37.5, weightKg: 77.0 },
  { date: 'Jul 2026', chestCm: 102.5, waistCm: 84.5, hipsCm: 98, thighsCm: 58, armsCm: 38, weightKg: 76.2 },
  { date: 'Aug 2026', chestCm: 102, waistCm: 83.0, hipsCm: 97, thighsCm: 57.5, armsCm: 38.5, weightKg: 75.5 }
];

export const INITIAL_PRS: PersonalRecord[] = [
  { id: 'pr-1', exercise: 'Deadlift 1-Rep Max', value: '165 kg', achievedDate: 'Jul 28, 2026', badgeIcon: '🏋️' },
  { id: 'pr-2', exercise: 'Barbell Squat', value: '135 kg', achievedDate: 'Jun 14, 2026', badgeIcon: '💪' },
  { id: 'pr-3', exercise: 'Bench Press', value: '95 kg', achievedDate: 'Aug 02, 2026', badgeIcon: '🏆' },
  { id: 'pr-4', exercise: '5K Run Time', value: '23m 40s', achievedDate: 'Jul 19, 2026', badgeIcon: '⚡' }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2026-0801',
    memberName: 'John Doe',
    memberEmail: 'john.doe@example.com',
    date: '2026-08-01',
    dueDate: '2026-08-15',
    amount: 99.00,
    status: 'Paid',
    planName: 'Premium Membership (Monthly)'
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2026-0701',
    memberName: 'John Doe',
    memberEmail: 'john.doe@example.com',
    date: '2026-07-01',
    dueDate: '2026-07-15',
    amount: 99.00,
    status: 'Paid',
    planName: 'Premium Membership (Monthly)'
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2026-0802',
    memberName: 'Sarah Jenkins',
    memberEmail: 'sarah.j@example.com',
    date: '2026-08-02',
    dueDate: '2026-08-16',
    amount: 59.00,
    status: 'Paid',
    planName: 'Standard Membership (Monthly)'
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2026-0803',
    memberName: 'Emily Watson',
    memberEmail: 'emily.w@example.com',
    date: '2026-08-05',
    dueDate: '2026-08-19',
    amount: 99.00,
    status: 'Pending',
    planName: 'Premium Renewal'
  }
];

export const INITIAL_PAYMENT_METHODS: SavedPaymentMethod[] = [
  { id: 'pm-1', cardBrand: 'Visa', last4: '4242', expiryMonth: 11, expiryYear: 2028, isDefault: true },
  { id: 'pm-2', cardBrand: 'Mastercard', last4: '8812', expiryMonth: 8, expiryYear: 2027, isDefault: false }
];

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Rogue Rubber Dumbbell Set (5kg - 40kg)',
    category: 'Weights',
    quantity: 14,
    reorderLevel: 10,
    status: 'In Stock',
    unitCost: 1200,
    lastMaintenance: '2026-06-15',
    nextMaintenance: '2026-12-15',
    condition: 'Good'
  },
  {
    id: 'eq-2',
    name: 'LifeFitness Elevation Treadmill T5',
    category: 'Cardio Machines',
    quantity: 3,
    reorderLevel: 4,
    status: 'Low Stock',
    unitCost: 3500,
    lastMaintenance: '2026-07-20',
    nextMaintenance: '2026-09-20',
    condition: 'Fair'
  },
  {
    id: 'eq-3',
    name: 'Concept2 Model D Ergometer Rower',
    category: 'Cardio Machines',
    quantity: 8,
    reorderLevel: 5,
    status: 'In Stock',
    unitCost: 1100,
    lastMaintenance: '2026-05-10',
    nextMaintenance: '2026-11-10',
    condition: 'Good'
  },
  {
    id: 'eq-4',
    name: 'Eco-Grip High Density Yoga Mats',
    category: 'Mats & Accessories',
    quantity: 12,
    reorderLevel: 15,
    status: 'Low Stock',
    unitCost: 35,
    lastMaintenance: '2026-08-01',
    nextMaintenance: '2026-10-01',
    condition: 'Good'
  },
  {
    id: 'eq-5',
    name: 'Olympic Competition Barbells 20kg',
    category: 'Weights',
    quantity: 10,
    reorderLevel: 6,
    status: 'In Stock',
    unitCost: 450,
    lastMaintenance: '2026-07-01',
    nextMaintenance: '2027-01-01',
    condition: 'Good'
  }
];
