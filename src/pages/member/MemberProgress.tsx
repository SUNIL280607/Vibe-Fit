import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import {
  TrendingDown,
  TrendingUp,
  Plus,
  Flame,
  Award,
  Calendar,
  Dumbbell,
  CheckCircle2,
  BarChart2,
  ArrowLeft,
  X
} from 'lucide-react';

export const MemberProgress: React.FC = () => {
  const {
    currentUser,
    bodyMeasurements,
    addBodyMeasurement,
    personalRecords,
    addPersonalRecord,
    workoutLogs,
    addWorkoutLog,
    setActiveView
  } = useGym();

  const [isLogWorkoutOpen, setIsLogWorkoutOpen] = useState(false);
  const [exercise, setExercise] = useState('');
  const [category, setCategory] = useState('Strength');
  const [duration, setDuration] = useState(45);
  const [calories, setCalories] = useState(400);

  const [isLogMeasurementOpen, setIsLogMeasurementOpen] = useState(false);
  const [weightKg, setWeightKg] = useState(75.5);
  const [chestCm, setChestCm] = useState(102);
  const [waistCm, setWaistCm] = useState(83);
  const [hipsCm, setHipsCm] = useState(97);

  const handleLogWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    addWorkoutLog({
      date: new Date().toISOString().split('T')[0],
      exercise,
      category,
      durationMinutes: Number(duration),
      caloriesBurned: Number(calories)
    });
    setIsLogWorkoutOpen(false);
    setExercise('');
  };

  const handleLogMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    addBodyMeasurement({
      date: 'Aug 2026',
      chestCm: Number(chestCm),
      waistCm: Number(waistCm),
      hipsCm: Number(hipsCm),
      thighsCm: 57,
      armsCm: 38,
      weightKg: Number(weightKg)
    });
    setIsLogMeasurementOpen(false);
  };

  const weights = bodyMeasurements.map((m) => m.weightKg);

  return (
    <div className="bg-[#111111] min-h-screen py-10 text-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation / Back Button Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2A2D] pb-4">
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-300 hover:text-[#FF5200] transition-colors bg-[#1C1C1E] border border-[#2A2A2D] px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5200]" /> BACK TO DASHBOARD
          </button>

          <span className="text-[10px] text-[#FF5200] font-extrabold uppercase tracking-widest bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2A2A2D]">
            PROGRESS TRACKER
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">BODY METRICS & LOGS</span>
            <h1 className="text-3xl font-extrabold text-white uppercase mt-1">WORKOUT & BODY PROGRESS TRACKER</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Visualize weight trends, personal records, and physical composition over time.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsLogWorkoutOpen(true)}
              className="px-4 py-2.5 btn-orange text-xs font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Log Workout
            </button>
            <button
              onClick={() => setIsLogMeasurementOpen(true)}
              className="px-4 py-2.5 bg-[#1C1C1E] border border-[#2A2A2D] text-white hover:border-[#FF5200] hover:text-[#FF5200] rounded-xl text-xs font-extrabold uppercase flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Log Measurement
            </button>
          </div>
        </div>

        {/* SECTION 1: STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="vitality-card p-5">
            <p className="text-[11px] font-bold text-gray-400 uppercase">Current Weight</p>
            <p className="text-2xl font-black text-white mt-1">75.5 kg</p>
            <span className="text-[10px] text-[#FF5200] font-mono">↓ -3.2 kg lost</span>
          </div>

          <div className="vitality-card p-5">
            <p className="text-[11px] font-bold text-gray-400 uppercase">Body Fat Estimate</p>
            <p className="text-2xl font-black text-[#FF5200] mt-1">14.8%</p>
            <span className="text-[10px] text-gray-400 font-mono">Lean condition</span>
          </div>

          <div className="vitality-card p-5">
            <p className="text-[11px] font-bold text-gray-400 uppercase">Personal Best Bench</p>
            <p className="text-2xl font-black text-white mt-1">115 kg</p>
            <span className="text-[10px] text-[#FF5200] font-mono">Set 2 weeks ago</span>
          </div>

          <div className="vitality-card p-5">
            <p className="text-[11px] font-bold text-gray-400 uppercase">Calories Burned</p>
            <p className="text-2xl font-black text-[#FF5200] mt-1">14,200 kcal</p>
            <span className="text-[10px] text-gray-400 font-mono">This month</span>
          </div>
        </div>

        {/* SECTION 2: WORKOUT LOG TABLE & PERSONAL RECORDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 vitality-card p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2D]">
              <h3 className="font-extrabold text-sm text-white uppercase flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#FF5200]" /> Recent Workout History
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#111111] text-[#FF5200] font-extrabold uppercase border-b border-[#2A2A2D]">
                    <th className="p-3">Date</th>
                    <th className="p-3">Exercise Session</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3 text-right">Calories</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2D]">
                  {workoutLogs.map((wl) => (
                    <tr key={wl.id} className="hover:bg-[#242426]">
                      <td className="p-3 font-mono text-gray-400">{wl.date}</td>
                      <td className="p-3 font-bold text-white uppercase">{wl.exercise}</td>
                      <td className="p-3 text-gray-300">{wl.category}</td>
                      <td className="p-3 text-gray-300">{wl.durationMinutes} mins</td>
                      <td className="p-3 text-right font-bold text-[#FF5200]">{wl.caloriesBurned} kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PERSONAL RECORDS SIDEBAR */}
          <div className="vitality-card p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#2A2A2D]">
              <h3 className="font-extrabold text-sm text-white uppercase flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FF5200]" /> Personal Records (PRs)
              </h3>
            </div>

            <div className="space-y-3">
              {personalRecords.map((pr) => (
                <div key={pr.id} className="p-3 bg-[#111111] rounded-xl border border-[#2A2A2D] flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-xs text-white uppercase">{pr.lift}</h4>
                    <p className="text-[10px] text-gray-400 font-mono">{pr.date}</p>
                  </div>
                  <span className="text-xs font-black text-[#FF5200]">{pr.weightKg} {pr.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MODAL: LOG WORKOUT */}
        {isLogWorkoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-6 max-w-md w-full space-y-4 text-gray-200">
              <div className="flex justify-between items-center border-b border-[#2A2A2D] pb-3">
                <h3 className="font-extrabold text-sm text-white uppercase">Log Workout Session</h3>
                <button onClick={() => setIsLogWorkoutOpen(false)} className="text-gray-400 hover:text-[#FF5200]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleLogWorkout} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Exercise / Class Name</label>
                  <input
                    type="text"
                    required
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    placeholder="e.g. Heavy Barbell Squats"
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  >
                    <option value="Strength">Strength</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Cardio">Cardio</option>
                    <option value="CrossFit">CrossFit</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Duration (mins)</label>
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Calories Burned</label>
                    <input
                      type="number"
                      value={calories}
                      onChange={(e) => setCalories(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-3 btn-orange text-xs font-extrabold uppercase mt-2">
                  Save Workout Log
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: LOG MEASUREMENT */}
        {isLogMeasurementOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-6 max-w-md w-full space-y-4 text-gray-200">
              <div className="flex justify-between items-center border-b border-[#2A2A2D] pb-3">
                <h3 className="font-extrabold text-sm text-white uppercase">Log Body Measurement</h3>
                <button onClick={() => setIsLogMeasurementOpen(false)} className="text-gray-400 hover:text-[#FF5200]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleLogMeasurement} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Body Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Chest (cm)</label>
                    <input
                      type="number"
                      value={chestCm}
                      onChange={(e) => setChestCm(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Waist (cm)</label>
                    <input
                      type="number"
                      value={waistCm}
                      onChange={(e) => setWaistCm(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Hips (cm)</label>
                    <input
                      type="number"
                      value={hipsCm}
                      onChange={(e) => setHipsCm(Number(e.target.value))}
                      className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-3 btn-orange text-xs font-extrabold uppercase mt-2">
                  Save Measurement
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
