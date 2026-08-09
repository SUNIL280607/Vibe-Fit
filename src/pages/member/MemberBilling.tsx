import React from 'react';
import { useGym } from '../../context/GymContext';
import { CreditCard, Download, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';

export const MemberBilling: React.FC = () => {
  const { currentUser, invoices, payInvoice, setActiveView } = useGym();

  if (!currentUser) return null;

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
            BILLING & INVOICES
          </span>
        </div>

        {/* Header */}
        <div>
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">MEMBERSHIP FINANCIALS</span>
          <h1 className="text-3xl font-extrabold text-white uppercase mt-1">BILLING & INVOICES</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage payment methods, active membership tier, and historic receipts.</p>
        </div>

        {/* ACTIVE MEMBERSHIP CARD & PAYMENT METHOD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="vitality-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-gray-400 uppercase">Current Membership Plan</span>
              <span className="text-[10px] bg-[#FF5200] text-white font-extrabold px-3 py-1 rounded-full uppercase">
                Active Tier
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white uppercase">{currentUser.membershipTier} Tier</h2>
              <p className="text-xs text-gray-400 mt-1">Next auto-renewal: Sept 01, 2026 ($129/mo)</p>
            </div>

            <button
              onClick={() => setActiveView('pricing')}
              className="px-4 py-2.5 bg-[#111111] border border-[#2A2A2D] text-white hover:border-[#FF5200] hover:text-[#FF5200] rounded-xl text-xs font-extrabold uppercase transition-colors"
            >
              Upgrade Membership Plan
            </button>
          </div>

          <div className="vitality-card p-6 space-y-4">
            <span className="text-xs font-extrabold text-gray-400 uppercase">Saved Payment Method</span>
            <div className="flex items-center space-x-3 p-4 bg-[#111111] rounded-xl border border-[#2A2A2D]">
              <CreditCard className="w-8 h-8 text-[#FF5200]" />
              <div>
                <p className="font-extrabold text-sm text-white uppercase">Visa Ending in •••• 4242</p>
                <p className="text-xs text-gray-400">Expires 08/28 • Primary Card</p>
              </div>
            </div>
            <button className="text-xs font-extrabold text-[#FF5200] uppercase hover:underline">
              Update Credit Card
            </button>
          </div>
        </div>

        {/* INVOICE HISTORY TABLE */}
        <div className="vitality-card p-6 space-y-4">
          <h3 className="font-extrabold text-sm text-white uppercase">Invoice & Payment History</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#111111] text-[#FF5200] font-extrabold uppercase border-b border-[#2A2A2D]">
                  <th className="p-3">Invoice ID</th>
                  <th className="p-3">Billing Date</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2D]">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#242426]">
                    <td className="p-3 font-mono font-bold text-white">{inv.id}</td>
                    <td className="p-3 text-gray-400 font-mono">{inv.date}</td>
                    <td className="p-3 font-bold text-white uppercase">{inv.description}</td>
                    <td className="p-3 font-black text-white">${inv.amount}</td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                          inv.status === 'Paid' ? 'bg-[#FF5200]/20 text-[#FF5200] border border-[#FF5200]/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {inv.status === 'Pending' ? (
                        <button
                          onClick={() => payInvoice(inv.id)}
                          className="btn-orange px-3 py-1 text-xs font-extrabold uppercase"
                        >
                          Pay Now
                        </button>
                      ) : (
                        <button className="text-gray-400 hover:text-[#FF5200] font-bold text-xs uppercase flex items-center gap-1 justify-end ml-auto">
                          <Download className="w-3.5 h-3.5" /> PDF
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
