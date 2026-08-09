import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { DollarSign, Plus, ArrowLeft, Download, X } from 'lucide-react';

export const AdminBilling: React.FC = () => {
  const { invoices, addInvoice, setActiveView } = useGym();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [memberName, setMemberName] = useState('John Doe');
  const [description, setDescription] = useState('Monthly Membership Fee');
  const [amount, setAmount] = useState(89);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    addInvoice({
      memberId: 'mem_1',
      memberName,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      dueDate: 'Aug 30, 2026',
      status: 'Pending',
      description
    });
    setIsModalOpen(false);
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
            FINANCIAL AUDIT
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">BILLING OPERATIONS</span>
            <h1 className="text-3xl font-extrabold text-white uppercase mt-1">INVOICES & REVENUE LEDGER</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Audit outstanding dues, issue custom invoices, and monitor receipts.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-orange px-5 py-2.5 text-xs font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" /> Issue New Invoice
          </button>
        </div>

        {/* INVOICES TABLE */}
        <div className="vitality-card p-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#111111] text-[#FF5200] font-extrabold uppercase border-b border-[#2A2A2D]">
                <th className="p-3">Invoice ID</th>
                <th className="p-3">Member Name</th>
                <th className="p-3">Billing Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2D]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#242426]">
                  <td className="p-3 font-mono font-bold text-white">{inv.id}</td>
                  <td className="p-3 font-extrabold text-white uppercase">{inv.memberName}</td>
                  <td className="p-3 text-gray-400 font-mono">{inv.date}</td>
                  <td className="p-3 text-gray-300">{inv.description}</td>
                  <td className="p-3 font-black text-[#FF5200]">${inv.amount}</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                        inv.status === 'Paid'
                          ? 'bg-[#FF5200]/20 text-[#FF5200] border border-[#FF5200]/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL: ISSUE INVOICE */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-6 max-w-md w-full space-y-4 text-gray-200">
              <div className="flex justify-between items-center border-b border-[#2A2A2D] pb-3">
                <h3 className="font-extrabold text-sm text-white uppercase">Issue Custom Member Invoice</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-[#FF5200]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateInvoice} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Member Name</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Fee Description</label>
                  <input
                    type="text"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                  />
                </div>

                <button type="submit" className="w-full py-3 btn-orange text-xs font-extrabold uppercase mt-2">
                  Dispatch Member Invoice
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
