export type UserRole = 'public' | 'member' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'member' | 'admin' | 'trainer' | 'receptionist';
  avatar: string;
  membershipPlan?: 'Basic' | 'Standard' | 'Premium';
  membershipStatus?: 'Active' | 'Expired' | 'Paused' | 'Pending';
  joinDate: string;
  lastActivity: string;
  streakDays: number;
  weightKg: number;
  targetWeightKg: number;
  heightCm: number;
  bio?: string;
  emergencyContact?: string;
}

export type ClassCategory = 'Yoga' | 'Cardio' | 'Strength' | 'CrossFit' | 'Zumba' | 'Pilates' | 'HIIT';
export type ClassLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface ClassSession {
  id: string;
  name: string;
  category: ClassCategory;
  level: ClassLevel;
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  dayOfWeek: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  time: string; // e.g., "07:00 AM"
  durationMinutes: number;
  room: string;
  capacity: number;
  bookedCount: number;
  image: string;
  description: string;
  amenities: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface ClassBooking {
  id: string;
  classId: string;
  className: string;
  trainerName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'Waitlisted';
  waitlistPosition?: number;
  room: string;
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specializations: ClassCategory[];
  bio: string;
  experienceYears: number;
  hourlyRate: number;
  availableDays: string[];
  certifications: string[];
  assignedClassCount: number;
}

export interface TrainerBooking {
  id: string;
  trainerId: string;
  trainerName: string;
  trainerAvatar: string;
  sessionType: '1-on-1 Personal Training' | 'Group Coaching' | 'Online Fitness Plan';
  date: string;
  time: string;
  focusArea: string;
  cost: number;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface FitnessGoal {
  id: string;
  title: string;
  category: 'Weight Loss' | 'Strength' | 'Endurance' | 'Habit';
  currentValue: number;
  targetValue: number;
  unit: string;
  deadline: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  exercise: string;
  category: string;
  durationMinutes: number;
  caloriesBurned: number;
  setsReps?: string;
  weightKg?: number;
  trainerName?: string;
}

export interface BodyMeasurement {
  date: string;
  chestCm: number;
  waistCm: number;
  hipsCm: number;
  thighsCm: number;
  armsCm: number;
  weightKg: number;
}

export interface PersonalRecord {
  id: string;
  exercise: string;
  value: string; // e.g. "120 kg Bench Press"
  achievedDate: string;
  badgeIcon: string;
}

export interface MembershipPlan {
  id: string;
  name: 'Basic' | 'Standard' | 'Premium';
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  memberName: string;
  memberEmail: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  planName: string;
}

export interface SavedPaymentMethod {
  id: string;
  cardBrand: 'Visa' | 'Mastercard' | 'Amex';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  category: 'Weights' | 'Cardio Machines' | 'Accessories' | 'Mats & Accessories';
  quantity: number;
  reorderLevel: number;
  status: 'In Stock' | 'Low Stock' | 'Maintenance Required';
  unitCost: number;
  lastMaintenance: string;
  nextMaintenance: string;
  condition: 'Good' | 'Fair' | 'Poor';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}
