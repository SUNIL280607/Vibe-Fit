import React from 'react';
import { useGym } from '../../context/GymContext';
import { X, Clock, MapPin, Users, Star, Check, Dumbbell, Calendar, Sparkles } from 'lucide-react';

export const ClassDetailsModal: React.FC = () => {
  const { selectedClassForModal, setSelectedClassForModal, bookClass } = useGym();

  if (!selectedClassForModal) return null;

  const cls = selectedClassForModal;
  const isFull = cls.bookedCount >= cls.capacity;
  const capacityPercent = Math.min(100, Math.round((cls.bookedCount / cls.capacity) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-[#1C1C1E] rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative border border-[#2A2A2D] max-h-[90vh] flex flex-col text-gray-200">
        
        {/* Header Image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0">
          <img src={cls.image} alt={cls.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-[#1C1C1E]/40 to-transparent"></div>
          
          <button
            onClick={() => setSelectedClassForModal(null)}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-[#111111]/80 text-[#FF5200] border border-[#2A2A2D] rounded-full flex items-center justify-center hover:border-[#FF5200] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#FF5200] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                {cls.category}
              </span>
              <span className="bg-[#111111] text-[#FF5200] text-[10px] font-extrabold px-3 py-0.5 rounded-full border border-[#2A2A2D]">
                {cls.level}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white uppercase leading-tight">{cls.name}</h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-gray-200">
          
          {/* Key Quick Info Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#111111] p-3.5 rounded-xl border border-[#2A2A2D] text-xs">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#FF5200]" />
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Schedule</p>
                <p className="font-bold text-white">{cls.dayOfWeek} • {cls.time}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#FF5200]" />
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Duration</p>
                <p className="font-bold text-white">{cls.durationMinutes} Mins</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#FF5200]" />
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Studio</p>
                <p className="font-bold text-white truncate">{cls.room}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-[#FF5200] fill-[#FF5200]" />
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Rating</p>
                <p className="font-bold text-white">{cls.rating} ({cls.reviewCount})</p>
              </div>
            </div>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center justify-between bg-[#111111] p-4 rounded-xl border border-[#2A2A2D]">
            <div className="flex items-center space-x-3">
              <img src={cls.trainerAvatar} alt={cls.trainerName} className="w-12 h-12 rounded-lg object-cover border border-[#FF5200]" />
              <div>
                <p className="text-[10px] text-[#FF5200] font-extrabold uppercase tracking-wider">Gym Trainer</p>
                <h4 className="font-extrabold text-sm text-white uppercase">{cls.trainerName}</h4>
              </div>
            </div>
            <span className="text-xs bg-[#1C1C1E] text-[#FF5200] font-extrabold px-3 py-1.5 rounded-lg border border-[#2A2A2D] uppercase">
              Certified Coach
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-extrabold text-xs tracking-wider text-white uppercase mb-2">Class Description</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">{cls.description}</p>
          </div>

          {/* Capacity Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5 font-bold">
              <span className="text-gray-300 uppercase">Class Capacity</span>
              <span className={isFull ? 'text-amber-400 font-bold' : 'text-[#FF5200] font-bold'}>
                {cls.bookedCount} / {cls.capacity} Seats Filled ({capacityPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#111111] rounded-full overflow-hidden border border-[#2A2A2D]">
              <div
                className={`h-full transition-all duration-500 ${isFull ? 'bg-amber-500' : 'bg-[#FF5200]'}`}
                style={{ width: `${capacityPercent}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 bg-[#111111] border-t border-[#2A2A2D] flex items-center justify-between gap-4">
          <button
            onClick={() => setSelectedClassForModal(null)}
            className="px-5 py-2.5 bg-[#1C1C1E] border border-[#2A2A2D] text-gray-300 hover:text-white rounded-xl text-xs font-extrabold uppercase"
          >
            Close
          </button>
          <button
            onClick={() => {
              bookClass(cls);
              setSelectedClassForModal(null);
            }}
            className="flex-1 py-3 btn-orange text-xs font-extrabold uppercase shadow-lg"
          >
            {isFull ? 'Join Waitlist' : `Reserve Spot Now (${cls.time})`}
          </button>
        </div>

      </div>
    </div>
  );
};
