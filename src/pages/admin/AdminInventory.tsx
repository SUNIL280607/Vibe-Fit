import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Package, Plus, AlertTriangle, ArrowLeft, X } from 'lucide-react';

export const AdminInventory: React.FC = () => {
  const { equipmentList, addEquipmentItem, updateEquipmentQuantity, setActiveView } = useGym();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Free Weights');
  const [quantity, setQuantity] = useState(10);
  const [location, setLocation] = useState('Free Weight Zone');

  const handleAddEquipment = (e: React.FormEvent) => {
    e.preventDefault();
    addEquipmentItem({
      name,
      category,
      quantity: Number(quantity),
      location,
      status: Number(quantity) < 5 ? 'Low Stock' : 'Operational',
      lastServicedDate: new Date().toISOString().split('T')[0]
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
            ASSET AUDIT
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">FACILITY ASSETS</span>
            <h1 className="text-3xl font-extrabold text-white uppercase mt-1">EQUIPMENT & INVENTORY LOGS</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Track dumbbells, barbells, cardio machines, and maintenance schedules.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-orange px-5 py-2.5 text-xs font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Add Equipment Unit
          </button>
        </div>

        {/* EQUIPMENT TABLE */}
        <div className="vitality-card p-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#111111] text-[#FF5200] font-extrabold uppercase border-b border-[#2A2A2D]">
                <th className="p-3">Equipment Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Zone Location</th>
                <th className="p-3">Quantity Units</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Adjust Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2D]">
              {equipmentList.map((eq) => (
                <tr key={eq.id} className="hover:bg-[#242426]">
                  <td className="p-3 font-extrabold text-white uppercase">{eq.name}</td>
                  <td className="p-3 text-gray-300">{eq.category}</td>
                  <td className="p-3 text-gray-400">{eq.location}</td>
                  <td className="p-3 font-mono font-bold text-white">{eq.quantity} units</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        eq.status === 'Operational'
                          ? 'bg-[#FF5200]/20 text-[#FF5200] border border-[#FF5200]/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {eq.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => updateEquipmentQuantity(eq.id, eq.quantity - 1)}
                      className="px-2 py-1 bg-[#111111] border border-[#2A2A2D] text-gray-300 hover:border-[#FF5200] rounded font-mono font-bold"
                    >
                      -
                    </button>
                    <button
                      onClick={() => updateEquipmentQuantity(eq.id, eq.quantity + 1)}
                      className="px-2 py-1 bg-[#111111] border border-[#2A2A2D] text-gray-300 hover:border-[#FF5200] rounded font-mono font-bold"
                    >
                      +
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL: ADD EQUIPMENT */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-6 max-w-md w-full space-y-4 text-gray-200">
              <div className="flex justify-between items-center border-b border-[#2A2A2D] pb-3">
                <h3 className="font-extrabold text-sm text-white uppercase">Register Equipment Asset</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#FF5200]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddEquipment} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Equipment Item Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rogue Olympic Barbells 20kg"
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
                    <option value="Free Weights">Free Weights</option>
                    <option value="Cardio Machines">Cardio Machines</option>
                    <option value="Strength Machines">Strength Machines</option>
                    <option value="Recovery Spa Equipment">Recovery Spa Equipment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Initial Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <button type="submit" className="w-full py-3 btn-orange text-xs font-extrabold uppercase mt-2">
                  Add Asset To Inventory
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
