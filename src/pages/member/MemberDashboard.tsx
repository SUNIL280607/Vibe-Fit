import React from 'react';
import { useGym } from '../../context/GymContext';
import {
  Flame,
  Calendar,
  Clock,
  Dumbbell,
  CheckCircle2,
  Plus,
  ArrowRight,
  TrendingUp,
  Award,
  Star,
  Users,
  Target,
  ArrowLeft
} from 'lucide-react';

export const MemberDashboard: React.FC = () => {
  const {
    currentUser,
    memberBookings,
    cancelBooking,
    goals,
    workoutLogs,
    trainers,
    setActiveView,
    setSelectedTrainerForModal,
    setIsBookTrainerModalOpen
  } = useGym();

  if (!currentUser) return null;

  const confirmedBookings = memberBookings.filter((b) => b.status === 'Confirmed');
  const recentWorkouts = workoutLogs.slice(0, 4);

  return (
    <div className="bg-[#111111] min-h-screen py-10 text-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation / Back Button Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2A2D] pb-4">
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-300 hover:text-[#FF5200] transition-colors bg-[#1C1C1E] border border-[#2A2A2D] px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5200]" /> BACK TO HOME
          </button>

          <span className="text-[10px] text-[#FF5200] font-extrabold uppercase tracking-widest bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2A2A2D]">
            MEMBER PORTAL
          </span>
        </div>

        {/* ROW 1: WELCOME CARD & STREAK BADGE */}
        <div className="vitality-card p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-[#FF5200] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
              <Flame className="w-3.5 h-3.5 fill-white" /> 🔥 {currentUser.streakDays} Day Workout Streak
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase">
              Welcome Back, <span className="text-[#FF5200]">{currentUser.name}</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              "Consistency builds strength." You have {confirmedBookings.length} class sessions reserved this week.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="relative z-10 flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => setActiveView('classes')}
              className="btn-orange px-5 py-3 text-xs font-extrabold uppercase rounded-xl flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" /> Book Fitness Class
            </button>
            <button
              onClick={() => setActiveView('progress')}
              className="px-5 py-3 bg-[#111111] hover:bg-[#242426] text-white rounded-xl text-xs font-extrabold border border-[#2A2A2D] hover:border-[#FF5200] transition-all flex items-center gap-2 uppercase"
            >
              <TrendingUp className="w-4 h-4 text-[#FF5200]" /> Workout Log
            </button>
          </div>
        </div>

        {/* QUICK STATS CARDS (4 Columns) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="vitality-card p-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase">Classes Attended</p>
              <p className="text-2xl font-black text-[#FF5200] mt-1">24</p>
              <span className="text-[10px] text-gray-400 font-mono">↑ 3 this week</span>
            </div>
            <div className="w-12 h-12 bg-[#111111] border border-[#2A2A2D] text-[#FF5200] rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="vitality-card p-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase">Active Workouts</p>
              <p className="text-2xl font-black text-white mt-1">12</p>
              <span className="text-[10px] text-gray-400 font-mono">This month</span>
            </div>
            <div className="w-12 h-12 bg-[#111111] border border-[#2A2A2D] text-[#FF5200] rounded-xl flex items-center justify-center">
              <Dumbbell className="w-5 h-5" />
            </div>
          </div>

          <div className="vitality-card p-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase">Hours Trained</p>
              <p className="text-2xl font-black text-[#FF5200] mt-1">38.5 hrs</p>
              <span className="text-[10px] text-gray-400 font-mono">Total time</span>
            </div>
            <div className="w-12 h-12 bg-[#111111] border border-[#2A2A2D] text-[#FF5200] rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="vitality-card p-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase">Current Tier</p>
              <p className="text-xl font-black text-white mt-1 uppercase">{currentUser.membershipTier}</p>
              <span className="text-[10px] text-[#FF5200] font-bold uppercase">Active Plan</span>
            </div>
            <div className="w-12 h-12 bg-[#111111] border border-[#2A2A2D] text-[#FF5200] rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* ROW 2: UPCOMING RESERVED CLASSES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 vitality-card p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2D]">
              <h3 className="font-extrabold text-sm text-white uppercase flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FF5200]" /> Reserved Upcoming Classes ({confirmedBookings.length})
              </h3>
              <button
                onClick={() => setActiveView('my-classes')}
                className="text-xs text-[#FF5200] font-bold hover:underline uppercase"
              >
                Manage All
              </button>
            </div>

            {confirmedBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs">
                No classes booked yet. Click "Book Fitness Class" to get started!
              </div>
            ) : (
              <div className="space-y-3">
                {confirmedBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 bg-[#111111] border border-[#2A2A2D] rounded-xl flex items-center justify-between gap-4 hover:border-[#FF5200] transition-colors"
                  >
                    <div>
                      <h4 className="font-extrabold text-sm text-white uppercase">{b.className}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {b.dayOfWeek} at {b.time} • Instructor: {b.trainerName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-[#FF5200]/20 text-[#FF5200] font-extrabold px-2.5 py-1 rounded-md uppercase border border-[#FF5200]/30">
                        Reserved
                      </span>
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="text-xs text-gray-400 hover:text-red-400 font-bold uppercase"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIDEBAR: FITNESS GOALS */}
          <div className="vitality-card p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2D]">
              <h3 className="font-extrabold text-sm text-white uppercase flex items-center gap-2">
                <Target className="w-4 h-4 text-[#FF5200]" /> Active Goals
              </h3>
              <button
                onClick={() => setActiveView('progress')}
                className="text-xs text-[#FF5200] font-bold hover:underline uppercase"
              >
                View Log
              </button>
            </div>

            <div className="space-y-3">
              {goals.map((g) => (
                <div key={g.id} className="p-3 bg-[#111111] rounded-xl border border-[#2A2A2D] space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-white uppercase">{g.title}</span>
                    <span className="text-[#FF5200]">{Math.round((g.currentValue / g.targetValue) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1C1C1E] rounded-full overflow-hidden border border-[#2A2A2D]">
                    <div
                      className="h-full bg-[#FF5200]"
                      style={{ width: `${Math.min(100, Math.round((g.currentValue / g.targetValue) * 100))}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>Target: {g.targetValue} {g.unit}</span>
                    <span>Deadline: {g.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
