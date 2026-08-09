import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  ClassSession,
  Trainer,
  ClassBooking,
  TrainerBooking,
  FitnessGoal,
  WorkoutLog,
  BodyMeasurement,
  PersonalRecord,
  Invoice,
  Equipment,
  ToastMessage,
  SavedPaymentMethod
} from '../types';

import {
  INITIAL_CLASSES,
  INITIAL_TRAINERS,
  INITIAL_CURRENT_USER,
  INITIAL_MEMBERS,
  INITIAL_MEMBER_BOOKINGS,
  INITIAL_GOALS,
  INITIAL_WORKOUT_LOGS,
  INITIAL_BODY_MEASUREMENTS,
  INITIAL_PRS,
  INITIAL_INVOICES,
  INITIAL_PAYMENT_METHODS,
  INITIAL_EQUIPMENT
} from '../mockData';

import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocFromServer,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface GymContextType {
  // Navigation & Role
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  
  // Auth state
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'signin' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'signin' | 'signup' | 'forgot') => void;
  loginAs: (role: 'member' | 'admin') => void;
  logout: () => void;

  // Classes & Bookings
  classes: ClassSession[];
  memberBookings: ClassBooking[];
  bookClass: (classObj: ClassSession) => boolean;
  cancelBooking: (bookingId: string) => void;
  addClass: (newClass: Omit<ClassSession, 'id' | 'bookedCount' | 'rating' | 'reviewCount'>) => void;
  updateClass: (id: string, updated: Partial<ClassSession>) => void;
  deleteClass: (id: string) => void;

  // Trainers & Session Bookings
  trainers: Trainer[];
  trainerBookings: TrainerBooking[];
  bookTrainerSession: (booking: Omit<TrainerBooking, 'id' | 'status'>) => void;
  addStaff: (newTrainer: Omit<Trainer, 'id' | 'rating' | 'reviewCount' | 'assignedClassCount'>) => void;

  // Member Management (Admin)
  members: User[];
  updateMemberStatus: (memberId: string, status: 'Active' | 'Expired' | 'Paused') => void;

  // Goals & Logs
  goals: FitnessGoal[];
  addGoal: (goal: Omit<FitnessGoal, 'id'>) => void;
  workoutLogs: WorkoutLog[];
  addWorkoutLog: (log: Omit<WorkoutLog, 'id'>) => void;
  bodyMeasurements: BodyMeasurement[];
  addBodyMeasurement: (m: BodyMeasurement) => void;
  personalRecords: PersonalRecord[];
  addPersonalRecord: (pr: Omit<PersonalRecord, 'id'>) => void;

  // Invoices & Equipment
  invoices: Invoice[];
  createInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  paymentMethods: SavedPaymentMethod[];
  addPaymentMethod: (pm: Omit<SavedPaymentMethod, 'id'>) => void;
  equipmentList: Equipment[];
  updateEquipmentQuantity: (id: string, newQty: number) => void;

  // Notifications
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Selected Detail Modals
  selectedClassForModal: ClassSession | null;
  setSelectedClassForModal: (cls: ClassSession | null) => void;
  selectedTrainerForModal: Trainer | null;
  setSelectedTrainerForModal: (trn: Trainer | null) => void;
  isBookTrainerModalOpen: boolean;
  setIsBookTrainerModalOpen: (open: boolean) => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Role & View
  const [currentRole, setCurrentRole] = useState<UserRole>('public');
  const [activeView, setActiveView] = useState<string>('home');

  // Auth
  const [currentUser, setCurrentUser] = useState<User | null>(INITIAL_CURRENT_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'forgot'>('signin');

  // Data collections initialized with localStorage caching
  const [classes, setClasses] = useState<ClassSession[]>(() => {
    const saved = localStorage.getItem('vibefit_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [trainers, setTrainers] = useState<Trainer[]>(() => {
    const saved = localStorage.getItem('vibefit_trainers');
    return saved ? JSON.parse(saved) : INITIAL_TRAINERS;
  });

  const [memberBookings, setMemberBookings] = useState<ClassBooking[]>(() => {
    const saved = localStorage.getItem('vibefit_bookings');
    return saved ? JSON.parse(saved) : INITIAL_MEMBER_BOOKINGS;
  });

  const [trainerBookings, setTrainerBookings] = useState<TrainerBooking[]>([]);

  const [members, setMembers] = useState<User[]>(() => {
    const saved = localStorage.getItem('vibefit_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [goals, setGoals] = useState<FitnessGoal[]>(INITIAL_GOALS);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>(INITIAL_WORKOUT_LOGS);
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurement[]>(INITIAL_BODY_MEASUREMENTS);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(INITIAL_PRS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [paymentMethods, setPaymentMethods] = useState<SavedPaymentMethod[]>(INITIAL_PAYMENT_METHODS);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(INITIAL_EQUIPMENT);

  // Modals & Details
  const [selectedClassForModal, setSelectedClassForModal] = useState<ClassSession | null>(null);
  const [selectedTrainerForModal, setSelectedTrainerForModal] = useState<Trainer | null>(null);
  const [isBookTrainerModalOpen, setIsBookTrainerModalOpen] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Validate Connection to Firestore on boot
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, '_connection_test', 'test'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('offline')) {
          console.warn('Firebase Firestore is offline or disconnected.');
        }
      }
    }
    testConnection();
  }, []);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userDocRef = doc(db, 'users', fbUser.uid);
        try {
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setCurrentUser({
              id: fbUser.uid,
              name: data.name || fbUser.displayName || 'Gym Member',
              email: data.email || fbUser.email || '',
              phone: data.phone || '',
              role: data.role || 'member',
              avatar: data.avatar || fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
              joinDate: data.joinDate || new Date().toISOString().split('T')[0],
              lastActivity: 'Just now',
              streakDays: data.streakDays || 1,
              weightKg: data.weightKg || 70,
              targetWeightKg: data.targetWeightKg || 68,
              heightCm: data.heightCm || 175,
            });
            setCurrentRole(data.role || 'member');
          } else {
            const newUser: User = {
              id: fbUser.uid,
              name: fbUser.displayName || 'Gym Member',
              email: fbUser.email || '',
              phone: fbUser.phoneNumber || '',
              role: 'member',
              avatar: fbUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
              joinDate: new Date().toISOString().split('T')[0],
              lastActivity: 'Just now',
              streakDays: 1,
              weightKg: 70,
              targetWeightKg: 68,
              heightCm: 175,
            };
            await setDoc(userDocRef, newUser);
            setCurrentUser(newUser);
            setCurrentRole('member');
          }
        } catch (err) {
          console.error('Firestore user profile sync error:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('vibefit_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('vibefit_trainers', JSON.stringify(trainers));
  }, [trainers]);

  useEffect(() => {
    localStorage.setItem('vibefit_bookings', JSON.stringify(memberBookings));
  }, [memberBookings]);

  useEffect(() => {
    localStorage.setItem('vibefit_members', JSON.stringify(members));
  }, [members]);

  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginAs = (role: 'member' | 'admin') => {
    if (role === 'member') {
      setCurrentRole('member');
      setCurrentUser(INITIAL_CURRENT_USER);
      setActiveView('dashboard');
      addToast('success', 'Logged in as Member', 'Welcome back, John! Your fitness dashboard is ready.');
    } else {
      setCurrentRole('admin');
      setCurrentUser({
        id: 'adm-001',
        name: 'Sarah Director',
        email: 'sarah.director@vibefit.com',
        phone: '+1 (555) 000-1111',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
        joinDate: '2023-01-01',
        lastActivity: 'Just now',
        streakDays: 30,
        weightKg: 65,
        targetWeightKg: 65,
        heightCm: 170
      });
      setActiveView('admin-dashboard');
      addToast('info', 'Logged in as Gym Admin', 'Access granted to VibeFit Management Console.');
    }
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.warn('Firebase SignOut error:', e);
    }
    setCurrentRole('public');
    setCurrentUser(null);
    setActiveView('home');
    addToast('info', 'Logged Out', 'You have been safely logged out.');
  };

  const bookClass = (classObj: ClassSession): boolean => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      setAuthModalMode('signin');
      addToast('warning', 'Sign In Required', 'Please sign in or create an account to book classes.');
      return false;
    }

    const alreadyBooked = memberBookings.some((b) => b.classId === classObj.id && b.status !== 'Cancelled');
    if (alreadyBooked) {
      addToast('info', 'Already Booked', `You already have an active booking for ${classObj.name}.`);
      return false;
    }

    const isFull = classObj.bookedCount >= classObj.capacity;
    const newBooking: ClassBooking = {
      id: `bk-${Date.now()}`,
      classId: classObj.id,
      className: classObj.name,
      trainerName: classObj.trainerName,
      date: `Next ${classObj.dayOfWeek}`,
      time: classObj.time,
      status: isFull ? 'Waitlisted' : 'Confirmed',
      waitlistPosition: isFull ? 1 : undefined,
      room: classObj.room,
      image: classObj.image
    };

    setMemberBookings((prev) => [newBooking, ...prev]);

    // Save booking to Firestore if authenticated
    if (auth.currentUser) {
      const bookingPath = 'bookings';
      addDoc(collection(db, bookingPath), {
        userId: auth.currentUser.uid,
        classId: classObj.id,
        className: classObj.name,
        trainerName: classObj.trainerName,
        date: `Next ${classObj.dayOfWeek}`,
        time: classObj.time,
        status: newBooking.status,
        room: classObj.room,
        image: classObj.image,
        createdAt: new Date().toISOString()
      }).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, bookingPath);
      });
    }

    // increment bookedCount
    setClasses((prev) =>
      prev.map((c) => (c.id === classObj.id ? { ...c, bookedCount: c.bookedCount + (isFull ? 0 : 1) } : c))
    );

    if (isFull) {
      addToast('warning', 'Added to Waitlist', `Class is full. You are #1 on the waitlist for ${classObj.name}.`);
    } else {
      addToast('success', 'Class Booked!', `Reserved spot for ${classObj.name} on ${classObj.dayOfWeek} at ${classObj.time}.`);
    }
    return true;
  };

  const cancelBooking = (bookingId: string) => {
    const bk = memberBookings.find((b) => b.id === bookingId);
    if (!bk) return;

    setMemberBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b)));

    if (bk.status === 'Confirmed') {
      setClasses((prev) =>
        prev.map((c) => (c.id === bk.classId ? { ...c, bookedCount: Math.max(0, c.bookedCount - 1) } : c))
      );
    }

    addToast('info', 'Booking Cancelled', `Your reservation for ${bk.className} has been cancelled.`);
  };

  const addClass = (newClass: Omit<ClassSession, 'id' | 'bookedCount' | 'rating' | 'reviewCount'>) => {
    const cls: ClassSession = {
      ...newClass,
      id: `cls-${Date.now()}`,
      bookedCount: 0,
      rating: 5.0,
      reviewCount: 1
    };
    setClasses((prev) => [cls, ...prev]);

    if (auth.currentUser) {
      addDoc(collection(db, 'classes'), cls).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, 'classes');
      });
    }

    addToast('success', 'New Class Published', `"${cls.name}" is now live on the schedule.`);
  };

  const updateClass = (id: string, updated: Partial<ClassSession>) => {
    setClasses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    addToast('success', 'Class Updated', 'Class parameters saved successfully.');
  };

  const deleteClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    addToast('info', 'Class Removed', 'Class removed from public schedule.');
  };

  const bookTrainerSession = (booking: Omit<TrainerBooking, 'id' | 'status'>) => {
    const newBk: TrainerBooking = {
      ...booking,
      id: `tbk-${Date.now()}`,
      status: 'Scheduled'
    };
    setTrainerBookings((prev) => [newBk, ...prev]);
    addToast('success', 'Session Confirmed!', `1-on-1 session booked with ${booking.trainerName} for ${booking.date} at ${booking.time}.`);
  };

  const addStaff = (newTrainer: Omit<Trainer, 'id' | 'rating' | 'reviewCount' | 'assignedClassCount'>) => {
    const trn: Trainer = {
      ...newTrainer,
      id: `trn-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      assignedClassCount: 0
    };
    setTrainers((prev) => [...prev, trn]);

    if (auth.currentUser) {
      addDoc(collection(db, 'trainers'), trn).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, 'trainers');
      });
    }

    addToast('success', 'Staff Member Added', `Registered ${trn.name} into trainer database.`);
  };

  const updateMemberStatus = (memberId: string, status: 'Active' | 'Expired' | 'Paused') => {
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, membershipStatus: status } : m)));
    addToast('info', 'Member Status Changed', `Member account updated to ${status}.`);
  };

  const addGoal = (goal: Omit<FitnessGoal, 'id'>) => {
    const g: FitnessGoal = { ...goal, id: `gl-${Date.now()}` };
    setGoals((prev) => [...prev, g]);
    addToast('success', 'Goal Set!', `New fitness target "${g.title}" added to your tracker.`);
  };

  const addWorkoutLog = (log: Omit<WorkoutLog, 'id'>) => {
    const wl: WorkoutLog = { ...log, id: `wl-${Date.now()}` };
    setWorkoutLogs((prev) => [wl, ...prev]);

    if (auth.currentUser) {
      addDoc(collection(db, 'workoutLogs'), {
        userId: auth.currentUser.uid,
        date: wl.date,
        exercise: wl.exercise,
        category: wl.category,
        durationMinutes: wl.durationMinutes,
        caloriesBurned: wl.caloriesBurned,
        createdAt: new Date().toISOString()
      }).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, 'workoutLogs');
      });
    }

    addToast('success', 'Workout Recorded!', `Burned ${wl.caloriesBurned} kcal doing ${wl.exercise}. Keep it up! 🔥`);
  };

  const addBodyMeasurement = (m: BodyMeasurement) => {
    setBodyMeasurements((prev) => [...prev, m]);
    addToast('success', 'Measurement Saved', 'Updated body composition metrics.');
  };

  const addPersonalRecord = (pr: Omit<PersonalRecord, 'id'>) => {
    const rec: PersonalRecord = { ...pr, id: `pr-${Date.now()}` };
    setPersonalRecords((prev) => [rec, ...prev]);
    addToast('success', '🏆 New Personal Record!', `Congratulations on hitting ${rec.value} in ${rec.exercise}!`);
  };

  const createInvoice = (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const inv: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setInvoices((prev) => [inv, ...prev]);

    if (auth.currentUser) {
      addDoc(collection(db, 'invoices'), inv).catch((err) => {
        handleFirestoreError(err, OperationType.WRITE, 'invoices');
      });
    }

    addToast('success', 'Invoice Generated', `Invoice ${inv.invoiceNumber} created for ${inv.memberName}.`);
  };

  const addPaymentMethod = (pm: Omit<SavedPaymentMethod, 'id'>) => {
    const newPm: SavedPaymentMethod = { ...pm, id: `pm-${Date.now()}` };
    setPaymentMethods((prev) => [...prev, newPm]);
    addToast('success', 'Card Saved', `Card ending in **** ${pm.last4} saved successfully.`);
  };

  const updateEquipmentQuantity = (id: string, newQty: number) => {
    setEquipmentList((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const status = newQty <= e.reorderLevel ? 'Low Stock' : 'In Stock';
          return { ...e, quantity: newQty, status };
        }
        return e;
      })
    );
    addToast('info', 'Inventory Updated', 'Stock count updated.');
  };

  return (
    <GymContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeView,
        setActiveView,
        currentUser,
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        loginAs,
        logout,
        classes,
        memberBookings,
        bookClass,
        cancelBooking,
        addClass,
        updateClass,
        deleteClass,
        trainers,
        trainerBookings,
        bookTrainerSession,
        addStaff,
        members,
        updateMemberStatus,
        goals,
        addGoal,
        workoutLogs,
        addWorkoutLog,
        bodyMeasurements,
        addBodyMeasurement,
        personalRecords,
        addPersonalRecord,
        invoices,
        createInvoice,
        paymentMethods,
        addPaymentMethod,
        equipmentList,
        updateEquipmentQuantity,
        toasts,
        addToast,
        removeToast,
        selectedClassForModal,
        setSelectedClassForModal,
        selectedTrainerForModal,
        setSelectedTrainerForModal,
        isBookTrainerModalOpen,
        setIsBookTrainerModalOpen
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
