import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, RotateCcw, Star, Plus, ArrowLeft } from 'lucide-react';

export const MemberClasses: React.FC = () => {
  const { memberBookings, cancelBooking, setActiveView, addToast } = useGym();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'waitlist'>('upcoming');

  const upcomingBookings = memberBookings.filter((b) => b.status === 'Confirmed');
  const pastBookings = memberBookings.filter((b) => b.status === 'Completed');
  const waitlistBookings = memberBookings.filter((b) => b.status === 'Waitlisted');

  return (
    <div className="bg-[#111111] min-h-screen py-10 text-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation / Back Button Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2A2D] pb-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-300 hover:text-[#FF5200] transition-colors bg-[#1C1C1E] border border-[#2A2A2D] px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5200]" /> BACK TO DASHBOARD
          </button>

          <span className="text-[10px] text-[#FF5200] font-extrabold uppercase tracking-widest bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2A2A2D]">
            MY RESERVATIONS
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">SCHEDULE MANAGEMENT</span>
            <h1 className="text-3xl font-extrabold text-white uppercase mt-1">MY CLASS RESERVATIONS</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage your upcoming workouts, past session history, and waitlists.</p>
          </div>
          <button
            onClick={() => setActiveView('classes')}
            className="btn-orange px-5 py-2.5 text-xs font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Book New Class
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#2A2A2D] bg-[#1C1C1E] px-4 rounded-2xl">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-3.5 px-4 text-xs font-extrabold uppercase border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'upcoming' ? 'border-[#FF5200] text-[#FF5200]' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-3.5 px-4 text-xs font-extrabold uppercase border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'past' ? 'border-[#FF5200] text-[#FF5200]' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Past History ({pastBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`py-3.5 px-4 text-xs font-extrabold uppercase border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'waitlist' ? 'border-[#FF5200] text-[#FF5200]' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Waitlist ({waitlistBookings.length})
          </button>
        </div>

        {/* TAB 1: UPCOMING */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingBookings.length === 0 ? (
              <div className="col-span-full vitality-card p-12 text-center border border-[#2A2A2D]">
                <p className="font-extrabold text-[#FF5200] text-base uppercase">No upcoming class reservations</p>
                <button
                  onClick={() => setActiveView('classes')}
                  className="mt-3 px-5 py-2.5 btn-orange text-xs font-extrabold uppercase"
                >
                  Browse Class Schedule
                </button>
              </div>
            ) : (
              upcomingBookings.map((bk) => (
                <div key={bk.id} className="vitality-card p-6 flex flex-col justify-between space-y-4">
                  <div className="flex items-start space-x-4">
                    <img src={bk.image} alt={bk.className} className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-[#FF5200]" />
                    <div className="space-y-1">
                      <span className="bg-[#FF5200] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                        Confirmed Spot
                      </span>
                      <h3 className="font-extrabold text-base text-white uppercase">{bk.className}</h3>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FF5200]" /> {bk.date} • {bk.time}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#FF5200]" /> {bk.room}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#2A2A2D] flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-300">Trainer: {bk.trainerName}</span>
                    <button
                      onClick={() => cancelBooking(bk.id)}
                      className="px-3 py-1.5 bg-[#111111] border border-[#2A2A2D] text-red-400 hover:border-red-500 rounded-lg font-bold uppercase"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: PAST */}
        {activeTab === 'past' && (
          <div className="vitality-card p-6">
            {pastBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs">No past workout logs yet.</div>
            ) : (
              <div className="space-y-3">
                {pastBookings.map((pb) => (
                  <div key={pb.id} className="p-4 bg-[#111111] rounded-xl border border-[#2A2A2D] flex justify-between items-center">
                    <div>
                      <h4 className="font-extrabold text-sm text-white uppercase">{pb.className}</h4>
                      <p className="text-xs text-gray-400">{pb.date} • {pb.trainerName}</p>
                    </div>
                    <span className="text-[10px] bg-[#1C1C1E] text-gray-300 font-bold px-3 py-1 rounded-full uppercase border border-[#2A2A2D]">
                      Completed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: WAITLIST */}
        {activeTab === 'waitlist' && (
          <div className="vitality-card p-6">
            {waitlistBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-xs">No active waitlisted classes.</div>
            ) : (
              <div className="space-y-3">
                {waitlistBookings.map((wb) => (
                  <div key={wb.id} className="p-4 bg-[#111111] rounded-xl border border-[#2A2A2D] flex justify-between items-center">
                    <div>
                      <h4 className="font-extrabold text-sm text-white uppercase">{wb.className}</h4>
                      <p className="text-xs text-gray-400">{wb.date} • Position #2 on Waitlist</p>
                    </div>
                    <button
                      onClick={() => cancelBooking(wb.id)}
                      className="text-xs text-red-400 font-bold uppercase hover:underline"
                    >
                      Leave Waitlist
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
