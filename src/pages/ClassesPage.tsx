import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { ClassCategory, ClassLevel, ClassSession } from '../types';
import {
  Search,
  Filter,
  Calendar,
  Grid,
  List,
  Clock,
  MapPin,
  Star,
  Users,
  ChevronRight,
  SlidersHorizontal,
  X,
  Check,
  Dumbbell,
  ArrowLeft
} from 'lucide-react';

export const ClassesPage: React.FC = () => {
  const { classes, setSelectedClassForModal, bookClass, trainers, setActiveView } = useGym();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedTrainer, setSelectedTrainer] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = ['All', 'Yoga', 'HIIT', 'Strength', 'CrossFit', 'Zumba', 'Pilates', 'Cardio'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  const days = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch =
      cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || cls.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || cls.level === selectedLevel;
    const matchesDay = selectedDay === 'All' || cls.dayOfWeek === selectedDay;
    const matchesTrainer = selectedTrainer === 'All' || cls.trainerName === selectedTrainer;

    return matchesSearch && matchesCategory && matchesLevel && matchesDay && matchesTrainer;
  });

  return (
    <div className="bg-[#111111] min-h-screen py-10 text-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Navigation / Back Button Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2A2D] pb-4">
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-300 hover:text-[#FF5200] transition-colors bg-[#1C1C1E] border border-[#2A2A2D] px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5200]" /> BACK TO HOME
          </button>

          <span className="text-[10px] text-[#FF5200] font-extrabold uppercase tracking-widest bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2A2A2D]">
            VITALITY SCHEDULE
          </span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">FITNESS CLASSES</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-1">
              GYM <span className="text-[#FF5200]">EVENT</span> & CLASS SCHEDULE
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Reserve your spot in high-energy fitness classes led by professional trainers.
            </p>
          </div>

          {/* View Toggle Bar */}
          <div className="flex items-center space-x-2 bg-[#1C1C1E] p-1.5 rounded-xl border border-[#2A2A2D] self-start md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid' ? 'bg-[#FF5200] text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" /> Grid
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                viewMode === 'calendar' ? 'bg-[#FF5200] text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" /> Weekly Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                viewMode === 'list' ? 'bg-[#FF5200] text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" /> List
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDEBAR FILTERS (Desktop) */}
          <div className="hidden lg:block vitality-card p-6 space-y-6 h-fit sticky top-24">
            <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2D]">
              <h3 className="font-extrabold text-xs tracking-wider text-white uppercase flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#FF5200]" /> Filter Sessions
              </h3>
              {(selectedCategory !== 'All' || selectedLevel !== 'All' || selectedDay !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                    setSelectedDay('All');
                    setSelectedTrainer('All');
                    setSearchQuery('');
                  }}
                  className="text-[11px] font-bold text-[#FF5200] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Search Input */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Search Class</label>
              <div className="relative">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Yoga, Cross-Fit..."
                  className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                />
              </div>
            </div>

            {/* Discipline Category */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Category</label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex justify-between items-center ${
                      selectedCategory === cat ? 'bg-[#FF5200] text-white' : 'hover:bg-[#111111] text-gray-400'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Skill Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Day of Week */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Day of Week</label>
              <div className="grid grid-cols-4 gap-1">
                {days.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDay(d)}
                    className={`py-1.5 text-[11px] font-extrabold rounded-lg transition-all ${
                      selectedDay === d ? 'bg-[#FF5200] text-white' : 'bg-[#111111] text-gray-400 border border-[#2A2A2D] hover:border-[#FF5200]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructor Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase mb-1.5">Gym Trainer</label>
              <select
                value={selectedTrainer}
                onChange={(e) => setSelectedTrainer(e.target.value)}
                className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
              >
                <option value="All">All Trainers</option>
                {trainers.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* MAIN CLASS LISTINGS AREA */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between vitality-card p-3">
              <span className="text-xs font-extrabold text-[#FF5200]">
                Showing {filteredClasses.length} Fitness Classes
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="btn-orange px-3 py-1.5 text-xs flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
            </div>

            {/* GRID VIEW MODE */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClasses.length === 0 ? (
                  <div className="col-span-full vitality-card p-12 text-center">
                    <p className="font-extrabold text-[#FF5200] text-base">No classes match your search</p>
                    <p className="text-xs text-gray-400 mt-1">Try resetting search parameters or select 'All' days.</p>
                  </div>
                ) : (
                  filteredClasses.map((cls) => {
                    const isFull = cls.bookedCount >= cls.capacity;
                    return (
                      <div
                        key={cls.id}
                        className="vitality-card vitality-card-hover overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative h-44 overflow-hidden">
                            <img src={cls.image} alt={cls.name} className="w-full h-full object-cover" />
                            <span className="absolute top-3 left-3 bg-[#FF5200] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shadow-md">
                              {cls.category}
                            </span>
                            <span className="absolute top-3 right-3 bg-[#111111]/80 backdrop-blur-md text-[#FF5200] border border-[#FF5200]/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {cls.level}
                            </span>
                          </div>

                          <div className="p-5 space-y-3">
                            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                              <span className="flex items-center gap-1 font-bold text-white">
                                <Calendar className="w-3.5 h-3.5 text-[#FF5200]" /> {cls.dayOfWeek} • {cls.time}
                              </span>
                              <span className="font-mono text-[#FF5200]">{cls.durationMinutes}m</span>
                            </div>

                            <h3
                              onClick={() => setSelectedClassForModal(cls)}
                              className="font-extrabold text-base text-white hover:text-[#FF5200] cursor-pointer transition-colors uppercase leading-snug line-clamp-2"
                            >
                              {cls.name}
                            </h3>

                            <div className="flex items-center space-x-2 text-xs pt-1">
                              <img src={cls.trainerAvatar} alt={cls.trainerName} className="w-6 h-6 rounded-md object-cover border border-[#FF5200]" />
                              <span className="text-gray-300 font-semibold">{cls.trainerName}</span>
                            </div>

                            <div className="flex justify-between items-center text-[11px] text-gray-400 pt-2 border-t border-[#2A2A2D]">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-[#FF5200]" /> {cls.room}
                              </span>
                              <span className={isFull ? 'text-amber-400 font-bold' : 'text-[#FF5200] font-bold'}>
                                {cls.bookedCount}/{cls.capacity} Reserved
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-[#111111] border-t border-[#2A2A2D] flex gap-2">
                          <button
                            onClick={() => setSelectedClassForModal(cls)}
                            className="flex-1 py-2 bg-[#1C1C1E] border border-[#2A2A2D] text-gray-300 hover:text-[#FF5200] rounded-xl text-xs font-extrabold transition-colors"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => bookClass(cls)}
                            className="flex-1 py-2 btn-orange text-xs font-extrabold"
                          >
                            {isFull ? 'Waitlist' : 'Reserve'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* CALENDAR WEEKLY GRID MODE */}
            {viewMode === 'calendar' && (
              <div className="vitality-card p-6 overflow-x-auto">
                <h3 className="font-extrabold text-base text-white uppercase mb-4">Weekly Calendar Grid</h3>
                <div className="grid grid-cols-7 gap-2 min-w-[700px]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                    const dayClasses = filteredClasses.filter((c) => c.dayOfWeek === day);
                    return (
                      <div key={day} className="bg-[#111111] rounded-xl p-2 min-h-[300px] border border-[#2A2A2D]">
                        <div className="text-center font-extrabold text-xs text-[#FF5200] uppercase pb-2 border-b border-[#2A2A2D] mb-2">
                          {day}
                        </div>
                        <div className="space-y-2">
                          {dayClasses.map((cls) => (
                            <div
                              key={cls.id}
                              onClick={() => setSelectedClassForModal(cls)}
                              className="bg-[#1C1C1E] p-2.5 rounded-lg border border-[#2A2A2D] cursor-pointer hover:border-[#FF5200] transition-all"
                            >
                              <span className="text-[9px] bg-[#FF5200] text-white px-1.5 py-0.5 rounded font-bold uppercase block w-fit mb-1">
                                {cls.time}
                              </span>
                              <p className="font-extrabold text-[11px] text-white line-clamp-2 uppercase">{cls.name}</p>
                              <p className="text-[10px] text-gray-400 mt-1">{cls.trainerName}</p>
                            </div>
                          ))}
                          {dayClasses.length === 0 && (
                            <span className="text-[10px] text-gray-600 block text-center py-4 font-mono">No sessions</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* LIST VIEW MODE */}
            {viewMode === 'list' && (
              <div className="vitality-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#111111] text-[#FF5200] font-extrabold uppercase border-b border-[#2A2A2D]">
                        <th className="p-4">Fitness Class</th>
                        <th className="p-4">Schedule Slot</th>
                        <th className="p-4">Trainer</th>
                        <th className="p-4">Level</th>
                        <th className="p-4">Capacity</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2A2A2D]">
                      {filteredClasses.map((cls) => {
                        const isFull = cls.bookedCount >= cls.capacity;
                        return (
                          <tr key={cls.id} className="hover:bg-[#242426] transition-colors">
                            <td className="p-4 font-bold text-white flex items-center space-x-3">
                              <img src={cls.image} alt={cls.name} className="w-10 h-10 rounded-lg object-cover border border-[#FF5200]" />
                              <div>
                                <p className="font-extrabold text-sm text-white uppercase">{cls.name}</p>
                                <span className="text-[10px] text-[#FF5200] uppercase font-bold">{cls.category}</span>
                              </div>
                            </td>
                            <td className="p-4 font-medium text-gray-300">
                              {cls.dayOfWeek} at {cls.time}
                            </td>
                            <td className="p-4 text-gray-300 font-semibold">{cls.trainerName}</td>
                            <td className="p-4">
                              <span className="bg-[#111111] border border-[#FF5200]/40 text-[#FF5200] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                {cls.level}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-[#FF5200]">
                              {cls.bookedCount} / {cls.capacity}
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => setSelectedClassForModal(cls)}
                                className="px-3 py-1.5 bg-[#111111] border border-[#2A2A2D] text-gray-300 rounded-lg font-bold hover:text-[#FF5200]"
                              >
                                View
                              </button>
                              <button
                                onClick={() => bookClass(cls)}
                                className="btn-orange px-4 py-1.5 text-xs font-extrabold"
                              >
                                {isFull ? 'Waitlist' : 'Reserve'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
