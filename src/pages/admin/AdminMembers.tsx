import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Search, Filter, Plus, Edit, Trash2, Mail, Phone, Crown, ArrowLeft, X } from 'lucide-react';

export const AdminMembers: React.FC = () => {
  const { members, addMember, deleteMember, updateMemberStatus, setActiveView, addToast } = useGym();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTier, setNewTier] = useState<'Basic' | 'Standard' | 'Premium'>('Standard');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === 'All' || m.membershipTier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({
      name: newName,
      email: newEmail,
      membershipTier: newTier
    });
    setIsAddMemberModalOpen(false);
    setNewName('');
    setNewEmail('');
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
            MEMBER MANAGEMENT
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">MEMBERSHIP DIRECTORY</span>
            <h1 className="text-3xl font-extrabold text-white uppercase mt-1">MEMBER ROSTER MANAGEMENT</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Audit active accounts, tier access levels, and billing statuses.</p>
          </div>

          <button
            onClick={() => setIsAddMemberModalOpen(true)}
            className="btn-orange px-5 py-2.5 text-xs font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add New Member
          </button>
        </div>

        {/* Filter Bar */}
        <div className="vitality-card p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search member by name or email..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase">Tier:</span>
            {['All', 'Basic', 'Standard', 'Premium'].map((t) => (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                  tierFilter === t ? 'bg-[#FF5200] text-white' : 'bg-[#111111] text-gray-400 border border-[#2A2A2D] hover:border-[#FF5200]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* MEMBER TABLE */}
        <div className="vitality-card p-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#111111] text-[#FF5200] font-extrabold uppercase border-b border-[#2A2A2D]">
                <th className="p-3">Member Name</th>
                <th className="p-3">Email Contact</th>
                <th className="p-3">Membership Tier</th>
                <th className="p-3">Joined Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2D]">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-[#242426]">
                  <td className="p-3 font-extrabold text-white uppercase">{m.name}</td>
                  <td className="p-3 text-gray-300 font-mono">{m.email}</td>
                  <td className="p-3">
                    <span className="bg-[#111111] text-[#FF5200] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-[#2A2A2D] uppercase">
                      {m.membershipTier}
                    </span>
                  </td>
                  <td className="p-3 text-gray-400 font-mono">{m.joinDate}</td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        updateMemberStatus(m.id, m.membershipStatus === 'Active' ? 'Suspended' : 'Active')
                      }
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        m.membershipStatus === 'Active'
                          ? 'bg-[#FF5200]/20 text-[#FF5200] border border-[#FF5200]/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {m.membershipStatus}
                    </button>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => deleteMember(m.id)}
                      className="p-1.5 bg-[#111111] border border-[#2A2A2D] text-red-400 hover:border-red-500 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL: ADD MEMBER */}
        {isAddMemberModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-6 max-w-md w-full space-y-4 text-gray-200">
              <div className="flex justify-between items-center border-b border-[#2A2A2D] pb-3">
                <h3 className="font-extrabold text-sm text-white uppercase">Register New Gym Member</h3>
                <button onClick={() => setIsAddMemberModalOpen(false)} className="text-gray-400 hover:text-[#FF5200]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Sarah Connor"
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Membership Plan</label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as any)}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  >
                    <option value="Basic">Basic Plan ($49/mo)</option>
                    <option value="Standard">Standard Plan ($89/mo)</option>
                    <option value="Premium">Premium VIP Plan ($149/mo)</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-3 btn-orange text-xs font-extrabold uppercase mt-2">
                  Create Member Account
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
