import React from 'react';
import { useGym } from '../../context/GymContext';
import {
  DollarSign,
  Users,
  Calendar,
  Package,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  TrendingUp,
  Activity,
  FileText,
  ArrowLeft
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { members, classes, equipmentList, invoices, setActiveView, addToast } = useGym();

  const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.status === 'Paid' ? inv.amount : 0), 0) + 42000;
  const activeMembersCount = members.filter((m) => m.membershipStatus === 'Active').length;
  const lowStockEquipment = equipmentList.filter((e) => e.status === 'Low Stock');

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
            ADMIN CONSOLE
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#FF5200] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                ADMIN CONSOLE
              </span>
              <span className="text-xs text-gray-400 font-semibold">Live Operations Active</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white uppercase mt-1">GYM OPERATIONS DASHBOARD</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveView('admin-classes')}
              className="px-4 py-2.5 btn-orange text-xs font-extrabold uppercase rounded-xl shadow-lg flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Create Class
            </button>
            <button
              onClick={() => setActiveView('admin-staff')}
              className="px-4 py-2.5 bg-[#1C1C1E] border border-[#2A2A2D] text-white hover:border-[#FF5200] hover:text-[#FF5200] rounded-xl text-xs font-extrabold uppercase flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Staff
            </button>
          </div>
        </div>

        {/* ROW 1: KPI CARDS (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="vitality-card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Gross Monthly Revenue</p>
                <h3 className="text-2xl font-black text-white mt-1">${totalRevenue.toLocaleString()}</h3>
                <span className="text-[11px] font-bold text-[#FF5200] flex items-center gap-0.5 mt-1 font-mono">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% vs last month
                </span>
              </div>
              <div className="w-12 h-12 bg-[#111111] text-[#FF5200] rounded-2xl flex items-center justify-center font-bold border border-[#2A2A2D]">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="vitality-card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Active Gym Members</p>
                <h3 className="text-2xl font-black text-[#FF5200] mt-1">{activeMembersCount} Members</h3>
                <span className="text-[11px] font-bold text-gray-400 flex items-center gap-0.5 mt-1 font-mono">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5200]" /> +8 new this week
                </span>
              </div>
              <div className="w-12 h-12 bg-[#111111] text-[#FF5200] rounded-2xl flex items-center justify-center font-bold border border-[#2A2A2D]">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="vitality-card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Weekly Classes</p>
                <h3 className="text-2xl font-black text-white mt-1">{classes.length} Active</h3>
                <span className="text-[11px] font-bold text-gray-400 mt-1 block font-mono">92% avg capacity</span>
              </div>
              <div className="w-12 h-12 bg-[#111111] text-[#FF5200] rounded-2xl flex items-center justify-center font-bold border border-[#2A2A2D]">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>

          <div className="vitality-card p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Equipment Assets</p>
                <h3 className="text-2xl font-black text-white mt-1">{equipmentList.length} Units</h3>
                <span className="text-[11px] font-bold text-amber-400 mt-1 block font-mono">{lowStockEquipment.length} low stock alert</span>
              </div>
              <div className="w-12 h-12 bg-[#111111] text-[#FF5200] rounded-2xl flex items-center justify-center font-bold border border-[#2A2A2D]">
                <Package className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: MANAGEMENT QUICK NAVIGATION GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button
            onClick={() => setActiveView('admin-members')}
            className="vitality-card vitality-card-hover p-4 text-center space-y-2 cursor-pointer"
          >
            <Users className="w-6 h-6 text-[#FF5200] mx-auto" />
            <p className="font-extrabold text-xs text-white uppercase">Members</p>
            <p className="text-[10px] text-gray-400 font-mono">{members.length} Total</p>
          </button>

          <button
            onClick={() => setActiveView('admin-classes')}
            className="vitality-card vitality-card-hover p-4 text-center space-y-2 cursor-pointer"
          >
            <Calendar className="w-6 h-6 text-[#FF5200] mx-auto" />
            <p className="font-extrabold text-xs text-white uppercase">Schedule</p>
            <p className="text-[10px] text-gray-400 font-mono">{classes.length} Sessions</p>
          </button>

          <button
            onClick={() => setActiveView('admin-staff')}
            className="vitality-card vitality-card-hover p-4 text-center space-y-2 cursor-pointer"
          >
            <Activity className="w-6 h-6 text-[#FF5200] mx-auto" />
            <p className="font-extrabold text-xs text-white uppercase">Staff Roster</p>
            <p className="text-[10px] text-gray-400 font-mono">12 Trainers</p>
          </button>

          <button
            onClick={() => setActiveView('admin-billing')}
            className="vitality-card vitality-card-hover p-4 text-center space-y-2 cursor-pointer"
          >
            <DollarSign className="w-6 h-6 text-[#FF5200] mx-auto" />
            <p className="font-extrabold text-xs text-white uppercase">Financials</p>
            <p className="text-[10px] text-gray-400 font-mono">Invoices & Dues</p>
          </button>

          <button
            onClick={() => setActiveView('admin-inventory')}
            className="vitality-card vitality-card-hover p-4 text-center space-y-2 cursor-pointer"
          >
            <Package className="w-6 h-6 text-[#FF5200] mx-auto" />
            <p className="font-extrabold text-xs text-white uppercase">Inventory</p>
            <p className="text-[10px] text-gray-400 font-mono">Equipment Logs</p>
          </button>
        </div>

      </div>
    </div>
  );
};
