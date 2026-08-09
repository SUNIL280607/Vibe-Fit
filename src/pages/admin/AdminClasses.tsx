import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Plus, Trash2, Edit, Calendar, Clock, MapPin, Users, ArrowLeft, X } from 'lucide-react';
import { ClassCategory, ClassLevel } from '../../types';

export const AdminClasses: React.FC = () => {
  const { classes, addClassSession, deleteClassSession, trainers, setActiveView } = useGym();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ClassCategory>('HIIT');
  const [level, setLevel] = useState<ClassLevel>('Intermediate');
  const [dayOfWeek, setDayOfWeek] = useState('Mon');
  const [time, setTime] = useState('09:00 AM');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [room, setRoom] = useState('Studio A');
  const [capacity, setCapacity] = useState(20);
  const [trainerName, setTrainerName] = useState(trainers[0]?.name || 'Marcus Vance');

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const trainerObj = trainers.find((t) => t.name === trainerName) || trainers[0];

    addClassSession({
      name,
      category,
      level,
      dayOfWeek,
      time,
      durationMinutes: Number(durationMinutes),
      trainerId: trainerObj.id,
      trainerName: trainerObj.name,
      trainerAvatar: trainerObj.avatar,
      room,
      capacity: Number(capacity),
      description: 'High performance fitness training session.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80'
    });

    setIsModalOpen(false);
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
            CLASS SCHEDULE CONTROL
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">SCHEDULE OPERATIONS</span>
            <h1 className="text-3xl font-extrabold text-white uppercase mt-1">CLASS & EVENT MANAGEMENT</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Schedule group exercise sessions, assign trainers, and track studio capacity.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-orange px-5 py-2.5 text-xs font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Schedule New Class
          </button>
        </div>

        {/* CLASS TABLE */}
        <div className="vitality-card p-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#111111] text-[#FF5200] font-extrabold uppercase border-b border-[#2A2A2D]">
                <th className="p-3">Class Name</th>
                <th className="p-3">Schedule Slot</th>
                <th className="p-3">Category</th>
                <th className="p-3">Trainer</th>
                <th className="p-3">Studio Room</th>
                <th className="p-3">Reserved</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2D]">
              {classes.map((c) => (
                <tr key={c.id} className="hover:bg-[#242426]">
                  <td className="p-3 font-extrabold text-white uppercase">{c.name}</td>
                  <td className="p-3 text-gray-300 font-mono">{c.dayOfWeek} at {c.time}</td>
                  <td className="p-3">
                    <span className="bg-[#111111] text-[#FF5200] text-[10px] font-extrabold px-2 py-0.5 rounded border border-[#2A2A2D] uppercase">
                      {c.category}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300 font-semibold">{c.trainerName}</td>
                  <td className="p-3 text-gray-400">{c.room}</td>
                  <td className="p-3 font-bold text-[#FF5200]">{c.bookedCount} / {c.capacity}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteClassSession(c.id)}
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

        {/* MODAL: CREATE CLASS */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-6 max-w-lg w-full space-y-4 text-gray-200">
              <div className="flex justify-between items-center border-b border-[#2A2A2D] pb-3">
                <h3 className="font-extrabold text-sm text-white uppercase">Schedule New Class Session</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#FF5200]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddClass} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Class Title</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Explosive Cross-Fit 101"
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    >
                      <option value="HIIT">HIIT</option>
                      <option value="Yoga">Yoga</option>
                      <option value="Strength">Strength</option>
                      <option value="CrossFit">CrossFit</option>
                      <option value="Cardio">Cardio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Day of Week</label>
                    <select
                      value={dayOfWeek}
                      onChange={(e) => setDayOfWeek(e.target.value)}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    >
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Time Slot</label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Capacity Seats</label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Assign Trainer</label>
                  <select
                    value={trainerName}
                    onChange={(e) => setTrainerName(e.target.value)}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  >
                    {trainers.map((t) => (
                      <option key={t.id} value={t.name}>{t.name} — {t.title}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="w-full py-3 btn-orange text-xs font-extrabold uppercase mt-2">
                  Publish Class Schedule
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
