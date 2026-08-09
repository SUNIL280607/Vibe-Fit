import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { User, Bell, Shield, Key, Save, ArrowLeft } from 'lucide-react';

export const MemberSettings: React.FC = () => {
  const { currentUser, setCurrentUser, addToast, setActiveView } = useGym();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name,
        email,
        phone
      });
      addToast('success', 'Profile Saved', 'Your account settings have been updated.');
    }
  };

  return (
    <div className="bg-[#111111] min-h-screen py-10 text-gray-200 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation / Back Button Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2A2D] pb-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-300 hover:text-[#FF5200] transition-colors bg-[#1C1C1E] border border-[#2A2A2D] px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5200]" /> BACK TO DASHBOARD
          </button>

          <span className="text-[10px] text-[#FF5200] font-extrabold uppercase tracking-widest bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2A2A2D]">
            ACCOUNT SETTINGS
          </span>
        </div>

        {/* Header */}
        <div>
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">MEMBER PROFILE</span>
          <h1 className="text-3xl font-extrabold text-white uppercase mt-1">ACCOUNT & PREFERENCES</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Update personal contact details and communication preferences.</p>
        </div>

        <form onSubmit={handleSave} className="vitality-card p-6 sm:p-8 space-y-6">
          <h3 className="font-extrabold text-sm text-white uppercase border-b border-[#2A2A2D] pb-3">Personal Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A2A2D] flex justify-end">
            <button type="submit" className="btn-orange px-6 py-3 text-xs font-extrabold uppercase flex items-center gap-2 shadow-lg">
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
