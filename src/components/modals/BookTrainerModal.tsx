import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { X, Calendar, Clock, DollarSign, Award, CheckCircle2, User, ChevronRight, Dumbbell } from 'lucide-react';

export const BookTrainerModal: React.FC = () => {
  const {
    isBookTrainerModalOpen,
    setIsBookTrainerModalOpen,
    selectedTrainerForModal,
    bookTrainerSession
  } = useGym();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [sessionType, setSessionType] = useState<'1-on-1 Personal Training' | 'Group Coaching' | 'Online Fitness Plan'>('1-on-1 Personal Training');
  const [date, setDate] = useState('Aug 12, 2026');
  const [time, setTime] = useState('10:00 AM');
  const [focusArea, setFocusArea] = useState('Muscle Building & Strength Mechanics');
  const [notes, setNotes] = useState('');

  if (!isBookTrainerModalOpen || !selectedTrainerForModal) return null;

  const trn = selectedTrainerForModal;

  const costs = {
    '1-on-1 Personal Training': trn.hourlyRate,
    'Group Coaching': 45,
    'Online Fitness Plan': 60
  };

  const handleConfirm = () => {
    bookTrainerSession({
      trainerId: trn.id,
      trainerName: trn.name,
      trainerAvatar: trn.avatar,
      sessionType,
      date,
      time,
      focusArea,
      cost: costs[sessionType],
      notes
    });
    setIsBookTrainerModalOpen(false);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-[#1C1C1E] rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden relative border border-[#2A2A2D] flex flex-col max-h-[90vh] text-gray-200">
        
        {/* Header */}
        <div className="bg-[#111111] border-b border-[#2A2A2D] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <img src={trn.avatar} alt={trn.name} className="w-11 h-11 rounded-lg object-cover border border-[#FF5200]" />
            <div>
              <h3 className="font-extrabold text-base text-white uppercase">Book Trainer Session</h3>
              <p className="text-xs text-[#FF5200] font-bold uppercase">{trn.name} — {trn.title}</p>
            </div>
          </div>
          <button
            onClick={() => setIsBookTrainerModalOpen(false)}
            className="w-8 h-8 bg-[#1C1C1E] rounded-full border border-[#2A2A2D] flex items-center justify-center text-gray-300 hover:text-[#FF5200]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="bg-[#111111] px-6 py-2.5 border-b border-[#2A2A2D] flex justify-between text-[11px] font-extrabold text-gray-400 uppercase">
          <span className={step === 1 ? 'text-[#FF5200]' : ''}>1. Format</span>
          <span>•</span>
          <span className={step === 2 ? 'text-[#FF5200]' : ''}>2. Time</span>
          <span>•</span>
          <span className={step === 3 ? 'text-[#FF5200]' : ''}>3. Focus</span>
          <span>•</span>
          <span className={step === 4 ? 'text-[#FF5200]' : ''}>4. Confirm</span>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-gray-200">
          
          {/* Step 1: Session Type */}
          {step === 1 && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-xs tracking-wider text-[#FF5200] uppercase">Select Training Format:</h4>
              <div
                onClick={() => setSessionType('1-on-1 Personal Training')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  sessionType === '1-on-1 Personal Training'
                    ? 'border-[#FF5200] bg-[#FF5200]/10 shadow-md'
                    : 'border-[#2A2A2D] bg-[#111111] hover:border-[#FF5200]/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-sm text-white uppercase flex items-center gap-1.5">
                    <Dumbbell className="w-4 h-4 text-[#FF5200]" /> 1-on-1 Personal Training
                  </span>
                  <span className="font-bold text-[#FF5200] text-sm">${trn.hourlyRate} / 60m</span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Dedicated 1-on-1 workout instruction, form refinement, and custom pacing.</p>
              </div>

              <div
                onClick={() => setSessionType('Group Coaching')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  sessionType === 'Group Coaching'
                    ? 'border-[#FF5200] bg-[#FF5200]/10 shadow-md'
                    : 'border-[#2A2A2D] bg-[#111111] hover:border-[#FF5200]/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-sm text-white uppercase flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#FF5200]" /> Small Group Coaching
                  </span>
                  <span className="font-bold text-[#FF5200] text-sm">$45 / 60m</span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Semi-private workout group (max 4 athletes) with high energy motivation.</p>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-xs tracking-wider text-[#FF5200] uppercase">Choose Date & Time Slot:</h4>
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Session Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {['08:00 AM', '10:00 AM', '02:00 PM', '04:00 PM', '06:00 PM', '07:30 PM'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTime(t)}
                      className={`py-2 text-xs font-bold uppercase rounded-xl transition-all ${
                        time === t ? 'bg-[#FF5200] text-white' : 'bg-[#111111] border border-[#2A2A2D] text-gray-300 hover:border-[#FF5200]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Focus & Notes */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-xs tracking-wider text-[#FF5200] uppercase">Specify Goals & Notes:</h4>
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Primary Workout Goal</label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                >
                  <option value="Muscle Building & Strength Mechanics">Muscle Building & Strength Mechanics</option>
                  <option value="Fat Loss & HIIT Conditioning">Fat Loss & HIIT Conditioning</option>
                  <option value="Mobility & Posture Realignment">Mobility & Posture Realignment</option>
                  <option value="Athletic Endurance & Stamina">Athletic Endurance & Stamina</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Notes for Trainer (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention any past injuries or specific equipment preference..."
                  className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                />
              </div>
            </div>
          )}

          {/* Step 4: Summary Confirmation */}
          {step === 4 && (
            <div className="space-y-4 bg-[#111111] p-4 rounded-xl border border-[#2A2A2D] text-xs">
              <h4 className="font-extrabold text-xs text-[#FF5200] uppercase">Booking Overview</h4>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-[#2A2A2D] pb-1.5">
                  <span className="text-gray-400">Trainer:</span>
                  <span className="font-bold text-white">{trn.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2A2D] pb-1.5">
                  <span className="text-gray-400">Format:</span>
                  <span className="font-bold text-white">{sessionType}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2A2D] pb-1.5">
                  <span className="text-gray-400">Schedule:</span>
                  <span className="font-bold text-white">{date} at {time}</span>
                </div>
                <div className="flex justify-between border-b border-[#2A2A2D] pb-1.5">
                  <span className="text-gray-400">Focus:</span>
                  <span className="font-bold text-white">{focusArea}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-400 font-bold">Total Session Cost:</span>
                  <span className="font-extrabold text-[#FF5200] text-sm">${costs[sessionType]}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#111111] border-t border-[#2A2A2D] flex justify-between gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep((step - 1) as any)}
              className="px-4 py-2.5 bg-[#1C1C1E] border border-[#2A2A2D] text-gray-300 rounded-xl text-xs font-bold uppercase"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={() => setStep((step + 1) as any)}
              className="flex-1 py-2.5 btn-orange text-xs font-extrabold uppercase"
            >
              Next Step
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 btn-orange text-xs font-extrabold uppercase shadow-lg"
            >
              Confirm Session Booking (${costs[sessionType]})
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
