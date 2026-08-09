import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { Trainer, ClassCategory } from '../types';
import {
  Search,
  Star,
  Award,
  Calendar,
  CheckCircle2,
  DollarSign,
  User,
  Clock,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  ArrowLeft,
  Dumbbell
} from 'lucide-react';

export const TrainersPage: React.FC = () => {
  const { trainers, setSelectedTrainerForModal, setIsBookTrainerModalOpen, setActiveView } = useGym();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpec, setSelectedSpec] = useState<string>('All');

  const specs = ['All', 'Yoga', 'HIIT', 'Strength', 'CrossFit', 'Zumba', 'Pilates'];

  const filteredTrainers = trainers.filter((trn) => {
    const matchesSearch =
      trn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trn.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpec = selectedSpec === 'All' || trn.specializations.includes(selectedSpec as ClassCategory);

    return matchesSearch && matchesSpec;
  });

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
            GYM TRAINERS & BLOG
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#FF5200]" /> EXPERT COACHES
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase mt-1">
            EXPERT <span className="text-[#FF5200]">TRAINERS</span> & FITNESS BLOG
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Work 1-on-1 with certified fitness specialists, strength mentors, and elite endurance coaches.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="vitality-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trainer by name..."
              className="w-full pl-9 pr-3 py-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-gray-300 uppercase mr-2 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF5200]" /> Specialty:
            </span>
            {specs.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSpec(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                  selectedSpec === s
                    ? 'bg-[#FF5200] text-white shadow-md'
                    : 'bg-[#111111] text-gray-400 border border-[#2A2A2D] hover:border-[#FF5200]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Trainers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTrainers.map((trn) => (
            <div
              key={trn.id}
              className="vitality-card vitality-card-hover overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={trn.avatar}
                    alt={trn.name}
                    className="w-28 h-28 rounded-xl object-cover mx-auto border-2 border-[#FF5200] shadow-md"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-[#FF5200] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                    AVAILABLE
                  </span>
                </div>

                <h3 className="font-extrabold text-lg text-white uppercase">{trn.name}</h3>
                <p className="text-xs text-[#FF5200] font-bold mt-0.5 uppercase">{trn.title}</p>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{trn.bio}</p>

                {/* Rating & Rate */}
                <div className="flex justify-center items-center gap-4 my-4 py-2 border-y border-[#2A2A2D] text-xs">
                  <div className="flex items-center gap-1 text-white font-bold">
                    <Star className="w-3.5 h-3.5 text-[#FF5200] fill-[#FF5200]" /> {trn.rating}
                  </div>
                  <div className="text-gray-400 font-bold">
                    <span className="text-[#FF5200]">${trn.hourlyRate}</span>/hr
                  </div>
                </div>

                {/* Specializations Badges */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {trn.specializations.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-[#111111] text-gray-300 px-2 py-0.5 rounded border border-[#2A2A2D]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#111111] border-t border-[#2A2A2D] flex gap-2">
                <button
                  onClick={() => {
                    setSelectedTrainerForModal(trn);
                    setIsBookTrainerModalOpen(true);
                  }}
                  className="w-full py-2.5 btn-orange text-xs font-extrabold"
                >
                  Book 1-on-1 Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FITNESS BLOG & ARTICLES SECTION */}
        <div className="vitality-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">FITNESS INSIGHTS</span>
              <h2 className="text-2xl font-extrabold text-white uppercase mt-1">LATEST GYM ARTICLES & BLOG</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111111] border border-[#2A2A2D] rounded-xl overflow-hidden hover:border-[#FF5200] transition-colors">
              <img
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80"
                alt="Blog 1"
                className="w-full h-40 object-cover"
              />
              <div className="p-5 space-y-2">
                <span className="text-[10px] text-[#FF5200] font-extrabold uppercase">WORKOUT PROTOCOLS</span>
                <h3 className="font-extrabold text-sm text-white uppercase leading-snug">5 Essential Strength Drills for Explosive Power</h3>
                <p className="text-xs text-gray-400">Learn how elite strength coaches condition muscles for longevity and speed.</p>
                <div className="pt-2 text-[11px] text-[#FF5200] font-bold flex items-center gap-1 cursor-pointer hover:underline">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#2A2A2D] rounded-xl overflow-hidden hover:border-[#FF5200] transition-colors">
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80"
                alt="Blog 2"
                className="w-full h-40 object-cover"
              />
              <div className="p-5 space-y-2">
                <span className="text-[10px] text-[#FF5200] font-extrabold uppercase">NUTRITION & RECOVERY</span>
                <h3 className="font-extrabold text-sm text-white uppercase leading-snug">Optimal Protein Timing and Post-Workout Hydration</h3>
                <p className="text-xs text-gray-400">Maximize muscle recovery and reduce fatigue with proven dietary guidelines.</p>
                <div className="pt-2 text-[11px] text-[#FF5200] font-bold flex items-center gap-1 cursor-pointer hover:underline">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-[#2A2A2D] rounded-xl overflow-hidden hover:border-[#FF5200] transition-colors">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                alt="Blog 3"
                className="w-full h-40 object-cover"
              />
              <div className="p-5 space-y-2">
                <span className="text-[10px] text-[#FF5200] font-extrabold uppercase">HIIT & CARDIO</span>
                <h3 className="font-extrabold text-sm text-white uppercase leading-snug">High Intensity Cardio: Fat Loss Without Muscle Drain</h3>
                <p className="text-xs text-gray-400">Balance endurance training with weight routines for a sculpted physique.</p>
                <div className="pt-2 text-[11px] text-[#FF5200] font-bold flex items-center gap-1 cursor-pointer hover:underline">
                  Read Article <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
