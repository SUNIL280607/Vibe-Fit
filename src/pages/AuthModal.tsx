import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { X, Lock, Mail, User as UserIcon, ShieldCheck, Dumbbell, LogIn } from 'lucide-react';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleAuthProvider, handleFirestoreError, OperationType } from '../lib/firebase';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode, loginAs, setCurrentUser, setCurrentRole, setActiveView, addToast } = useGym();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;

      // Sync user profile directly in Firestore
      const userRef = doc(db, 'users', user.uid);
      let userData: any = {
        uid: user.uid,
        name: user.displayName || 'Gym Member',
        email: user.email || '',
        phone: user.phoneNumber || '',
        role: 'member',
        avatar: user.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        membershipPlan: 'Standard',
        membershipStatus: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        lastActivity: 'Just now',
        streakDays: 1,
        weightKg: 70,
        targetWeightKg: 68,
        heightCm: 175,
      };

      try {
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          userData = { ...userData, ...snap.data() };
        } else {
          await setDoc(userRef, userData);
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
      }

      setCurrentRole('member');
      setCurrentUser({
        id: user.uid,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role || 'member',
        avatar: userData.avatar,
        joinDate: userData.joinDate,
        lastActivity: 'Just now',
        streakDays: userData.streakDays || 1,
        weightKg: userData.weightKg || 70,
        targetWeightKg: userData.targetWeightKg || 68,
        heightCm: userData.heightCm || 175,
      });

      setActiveView('dashboard');
      setIsAuthModalOpen(false);
      addToast('success', 'Authenticated with Firebase!', `Welcome ${userData.name}! Your profile is synchronized with Firestore.`);
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      addToast('error', 'Authentication Error', error.message || 'Failed to authenticate with Google.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'signin') {
      loginAs('member');
    } else if (authModalMode === 'signup') {
      addToast('success', 'Account Created!', 'Welcome to Vitality Fitness Club.');
      loginAs('member');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 relative text-gray-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#111111] border border-[#2A2A2D] text-gray-300 rounded-full flex items-center justify-center hover:border-[#FF5200] hover:text-[#FF5200] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Brand Imagery & Quick Demo Actions */}
        <div className="bg-[#111111] p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex border-r border-[#2A2A2D]">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80')` }}></div>
          <div className="relative z-10">
            <span className="text-[#FF5200] font-extrabold tracking-widest text-xs uppercase inline-flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-[#FF5200]" /> VITALITY FITNESS CLUB
            </span>
            <h2 className="text-2xl font-extrabold mt-2 leading-tight text-white uppercase">UNLEASH YOUR PEAK POTENTIAL</h2>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed">
              Join Vitality Fitness to access high-performance workout sessions, certified trainers, and personalized progress tracking.
            </p>
          </div>

          <div className="relative z-10 space-y-3 bg-[#1C1C1E]/90 backdrop-blur-md p-4 rounded-xl border border-[#2A2A2D]">
            <p className="text-[10px] font-extrabold text-[#FF5200] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#FF5200]" /> One-Touch Demo Portal Access:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => loginAs('member')}
                className="py-2.5 px-3 btn-orange text-[11px] font-extrabold uppercase flex items-center justify-center gap-1"
              >
                <UserIcon className="w-3.5 h-3.5" /> As Member
              </button>
              <button
                onClick={() => loginAs('admin')}
                className="py-2.5 px-3 bg-[#111111] text-gray-200 border border-[#2A2A2D] rounded-xl text-[11px] font-extrabold uppercase hover:border-[#FF5200] hover:text-[#FF5200] transition-all flex items-center justify-center gap-1 shadow-md"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF5200]" /> As Admin
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="p-8 flex flex-col justify-center bg-[#1C1C1E]">
          
          {/* Mode Tabs */}
          {authModalMode !== 'forgot' && (
            <div className="flex bg-[#111111] p-1 rounded-xl mb-6 border border-[#2A2A2D]">
              <button
                onClick={() => setAuthModalMode('signin')}
                className={`flex-1 py-2 text-xs font-extrabold uppercase rounded-lg transition-all ${
                  authModalMode === 'signin' ? 'bg-[#FF5200] text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthModalMode('signup')}
                className={`flex-1 py-2 text-xs font-extrabold uppercase rounded-lg transition-all ${
                  authModalMode === 'signup' ? 'bg-[#FF5200] text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="member@vitality.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                />
              </div>
            </div>

            {authModalMode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-gray-300 uppercase">Password</label>
                  {authModalMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setAuthModalMode('forgot')}
                      className="text-[11px] font-bold text-[#FF5200] hover:underline uppercase"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>
              </div>
            )}

            <button type="submit" className="w-full py-3.5 btn-orange text-xs font-extrabold uppercase mt-4">
              {authModalMode === 'signin' ? 'Sign In To Account' : authModalMode === 'signup' ? 'Create Vitality Account' : 'Reset Password'}
            </button>
          </form>

          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-[#2A2A2D] w-full"></div>
            <span className="bg-[#1C1C1E] px-3 text-[10px] uppercase font-bold text-gray-500 whitespace-nowrap">Or OAuth Login</span>
            <div className="border-t border-[#2A2A2D] w-full"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full py-3 px-4 bg-[#111111] hover:bg-[#222225] text-white border border-[#333336] rounded-xl text-xs font-extrabold uppercase flex items-center justify-center gap-2.5 transition-all shadow-md hover:border-[#FF5200]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            {isGoogleLoading ? 'Connecting...' : 'Sign In with Google'}
          </button>

          {/* Quick Demo Access Bar inside mobile */}
          <div className="mt-6 pt-4 border-t border-[#2A2A2D] text-center md:hidden">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Quick Demo Sign In:</p>
            <div className="flex gap-2">
              <button
                onClick={() => loginAs('member')}
                className="flex-1 py-2 btn-orange text-[10px] font-extrabold uppercase"
              >
                Member Demo
              </button>
              <button
                onClick={() => loginAs('admin')}
                className="flex-1 py-2 bg-[#111111] text-gray-200 border border-[#2A2A2D] text-[10px] font-extrabold uppercase hover:border-[#FF5200]"
              >
                Admin Demo
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
