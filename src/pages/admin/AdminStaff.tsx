import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Award, Star, Mail, Phone, Plus, Trash2, ArrowLeft, X } from 'lucide-react';

export const AdminStaff: React.FC = () => {
  const { trainers, setActiveView, addToast } = useGym();
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  const [name, setName] = useState('');
  const [title, setTitle] = useState('Senior Fitness Coach');
  const [rate, setRate] = useState(75);

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Staff Member Registered', `${name} added to Vitality Gym roster.`);
    setIsAddStaffOpen(false);
    setName('');
  };

  return (
    <div className="bg-[#111111] min-h-screen py-10 text-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation / Back Button Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2A2D] pb-4">
          <button
            onClick={() => setActiveView('admin-dashboard')}
            className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-300 hover:text-[#FF5200] transition-colors bg-[#1C1C1E] border border-[#2A2A2D] px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5200]" /> BACK TO COMMAND SUITE
          </button>

          <span className="text-[10px] text-[#FF5200] font-extrabold uppercase tracking-widest bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2A2A2D]">
            STAFF MANAGEMENT
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">COACHES & STAFF</span>
            <h1 className="text-3xl font-extrabold text-white uppercase mt-1">GYM TRAINERS & STAFF ROSTER</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage personal trainers, hourly rates, and client booking availability.</p>
          </div>

          <button
            onClick={() => setIsAddStaffOpen(true)}
            className="btn-orange px-5 py-2.5 text-xs font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add Trainer Staff
          </button>
        </div>

        {/* TRAINER STAFF GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((t) => (
            <div key={t.id} className="vitality-card p-6 flex items-start space-x-4">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-[#FF5200]" />
              <div className="space-y-1 flex-1">
                <span className="bg-[#FF5200] text-white text-[9px] font-extrabold px-2 py-0.5 rounded uppercase">
                  Active Trainer
                </span>
                <h3 className="font-extrabold text-base text-white uppercase">{t.name}</h3>
                <p className="text-xs text-[#FF5200] font-bold">{t.title}</p>
                <p className="text-xs text-gray-400 font-mono">${t.hourlyRate} / hour • Rating: {t.rating}★</p>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL: ADD STAFF */}
        {isAddStaffOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-6 max-w-md w-full space-y-4 text-gray-200">
              <div className="flex justify-between items-center border-b border-[#2A2A2D] pb-3">
                <h3 className="font-extrabold text-sm text-white uppercase">Register New Trainer Staff</h3>
                <button onClick={() => setIsAddStaffOpen(false)} className="text-gray-400 hover:text-[#FF5200]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddStaff} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Specialization Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <button type="submit" className="w-full py-3 btn-orange text-xs font-extrabold uppercase mt-2">
                  Register Staff Member
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
