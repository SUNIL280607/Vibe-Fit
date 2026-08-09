import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import {
  Dumbbell,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User as UserIcon,
  Bell,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Shield,
  CreditCard,
  Settings,
  Flame,
  LayoutDashboard,
  Users,
  Package,
  FileText
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    currentUser,
    activeView,
    setActiveView,
    loginAs,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    memberBookings
  } = useGym();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const activeBookingsCount = memberBookings.filter((b) => b.status === 'Confirmed').length;

  const publicNavLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'classes', label: 'EVENT' },
    { id: 'pricing', label: 'PAGES' },
    { id: 'trainers', label: 'BLOG' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const memberNavLinks = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'my-classes', label: 'MY CLASSES', icon: Calendar },
    { id: 'progress', label: 'PROGRESS', icon: Flame },
    { id: 'billing', label: 'BILLING', icon: CreditCard },
    { id: 'settings', label: 'SETTINGS', icon: Settings }
  ];

  const adminNavLinks = [
    { id: 'admin-dashboard', label: 'COMMAND SUITE', icon: LayoutDashboard },
    { id: 'admin-members', label: 'MEMBERS', icon: Users },
    { id: 'admin-classes', label: 'CLASSES', icon: Calendar },
    { id: 'admin-staff', label: 'STAFF', icon: UserIcon },
    { id: 'admin-billing', label: 'INVOICES', icon: FileText },
    { id: 'admin-inventory', label: 'EQUIPMENT', icon: Package }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#161616] text-white border-b border-[#2A2A2D] shadow-2xl">
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-[#111111] border-b border-[#222222] text-xs py-2 px-4 sm:px-8 text-gray-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 hover:text-[#FF5200] transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-[#FF5200]" /> +163-6589-0654
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#FF5200] transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5 text-[#FF5200]" /> info@fitkit.com
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF5200]" /> 67GP+XV2, Unnamed Road, Chhatnoihar
            </span>
          </div>

          {/* Role Switcher Pill Bar for Demo */}
          <div className="flex items-center space-x-2 bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2A2A2D]">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Access:</span>
            <button
              onClick={() => {
                if (currentRole !== 'public') logout();
                setActiveView('home');
              }}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentRole === 'public' ? 'bg-[#FF5200] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Visitor
            </button>
            <button
              onClick={() => loginAs('member')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentRole === 'member' ? 'bg-[#FF5200] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Member
            </button>
            <button
              onClick={() => loginAs('admin')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                currentRole === 'admin' ? 'bg-[#FF5200] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => setActiveView(currentRole === 'admin' ? 'admin-dashboard' : currentRole === 'member' ? 'dashboard' : 'home')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#FF5200] flex items-center justify-center text-white shadow-lg shadow-[#FF5200]/30 transform group-hover:scale-105 transition-all">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-2xl tracking-tight text-white uppercase font-sans flex items-center gap-1">
                Vitality
              </span>
              <p className="text-[9px] text-gray-400 tracking-[0.2em] uppercase font-semibold">FITNESS & GYM CLUB</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {currentRole === 'public' &&
              publicNavLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => setActiveView(link.id)}
                  className={`px-3 py-2 text-xs font-extrabold tracking-wider transition-all ${
                    activeView === link.id
                      ? 'text-[#FF5200] border-b-2 border-[#FF5200]'
                      : 'text-gray-300 hover:text-[#FF5200]'
                  }`}
                >
                  {link.label}
                </button>
              ))}

            {currentRole === 'member' &&
              memberNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveView(link.id)}
                    className={`px-3 py-2 text-xs font-extrabold tracking-wider transition-all flex items-center gap-1.5 ${
                      activeView === link.id
                        ? 'text-[#FF5200] border-b-2 border-[#FF5200]'
                        : 'text-gray-300 hover:text-[#FF5200]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#FF5200]" />
                    {link.label}
                  </button>
                );
              })}

            {currentRole === 'admin' &&
              adminNavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    onClick={() => setActiveView(link.id)}
                    className={`px-3 py-2 text-xs font-extrabold tracking-wider transition-all flex items-center gap-1.5 ${
                      activeView === link.id
                        ? 'text-[#FF5200] border-b-2 border-[#FF5200]'
                        : 'text-gray-300 hover:text-[#FF5200]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#FF5200]" />
                    {link.label}
                  </button>
                );
              })}
          </nav>

          {/* User Controls & Get a Quote CTA */}
          <div className="flex items-center space-x-3">
            {/* Notification Bell */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="p-2.5 rounded-xl border border-[#2A2A2D] bg-[#1C1C1E] text-gray-300 hover:text-[#FF5200] transition-all relative focus:outline-none"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-[#FF5200]" />
                  {activeBookingsCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FF5200] rounded-full ring-2 ring-[#161616] animate-pulse"></span>
                  )}
                </button>

                {isNotificationOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-[#1C1C1E] text-white rounded-xl shadow-2xl border border-[#2A2A2D] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-[#2A2A2D] flex items-center justify-between">
                      <h4 className="font-extrabold text-xs tracking-wider uppercase text-[#FF5200]">Vitality Notifications</h4>
                      <span className="text-[10px] bg-[#FF5200] text-white font-bold px-2 py-0.5 rounded-full">
                        {activeBookingsCount} Active
                      </span>
                    </div>

                    <div className="max-h-64 overflow-y-auto divide-y divide-[#2A2A2D]">
                      <div className="p-3.5 hover:bg-[#242426] flex items-start space-x-3 text-xs transition-colors">
                        <div className="w-8 h-8 rounded-full bg-[#FF5200]/20 text-[#FF5200] flex items-center justify-center shrink-0 font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-bold text-white">7-Day Workout Streak!</p>
                          <p className="text-gray-400 mt-0.5">Great job on completing your recent gym sessions.</p>
                          <span className="text-[10px] text-[#FF5200] mt-1 block">10 mins ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile or Get a Quote Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl border border-[#2A2A2D] bg-[#1C1C1E] hover:border-[#FF5200] focus:outline-none transition-all"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-lg object-cover border border-[#FF5200]"
                  />
                  <div className="hidden sm:block text-left text-xs">
                    <p className="font-bold text-white leading-tight">{currentUser.name}</p>
                    <span className="text-[10px] text-[#FF5200] capitalize font-semibold">{currentUser.role}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#FF5200] hidden sm:block" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#1C1C1E] text-white rounded-xl shadow-2xl border border-[#2A2A2D] py-2 z-50">
                    <div className="px-4 py-3 border-b border-[#2A2A2D] bg-[#242426]">
                      <p className="font-bold text-sm text-[#FF5200]">{currentUser.name}</p>
                      <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'member' ? (
                        <>
                          <button
                            onClick={() => {
                              setActiveView('dashboard');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-gray-300 hover:bg-[#2A2A2D] hover:text-[#FF5200] flex items-center space-x-2"
                          >
                            <LayoutDashboard className="w-4 h-4 text-[#FF5200]" />
                            <span>Dashboard</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveView('my-classes');
                              setIsProfileDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-xs font-bold text-gray-300 hover:bg-[#2A2A2D] hover:text-[#FF5200] flex items-center space-x-2"
                          >
                            <Calendar className="w-4 h-4 text-[#FF5200]" />
                            <span>My Classes</span>
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveView('admin-dashboard');
                            setIsProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-gray-300 hover:bg-[#2A2A2D] hover:text-[#FF5200] flex items-center space-x-2"
                        >
                          <Shield className="w-4 h-4 text-[#FF5200]" />
                          <span>Admin Console</span>
                        </button>
                      )}
                    </div>

                    <div className="border-t border-[#2A2A2D] pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-950/40 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="btn-orange px-5 py-2.5 text-xs font-extrabold shadow-lg shadow-[#FF5200]/20 hidden sm:block"
              >
                GET A QUOTE
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-[#2A2A2D] bg-[#1C1C1E] text-gray-300 hover:text-[#FF5200]"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-[#FF5200]" /> : <Menu className="w-6 h-6 text-[#FF5200]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111111] border-b border-[#2A2A2D] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="p-3 bg-[#1C1C1E] rounded-xl border border-[#2A2A2D] text-xs text-gray-300 flex flex-col gap-2">
            <span className="font-bold text-[#FF5200]">Demo Access Level:</span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className={`py-1.5 text-center rounded text-[11px] font-bold ${
                  currentRole === 'public' ? 'bg-[#FF5200] text-white' : 'bg-[#242426] text-gray-300'
                }`}
              >
                Visitor
              </button>
              <button
                onClick={() => {
                  loginAs('member');
                  setIsMobileMenuOpen(false);
                }}
                className={`py-1.5 text-center rounded text-[11px] font-bold ${
                  currentRole === 'member' ? 'bg-[#FF5200] text-white' : 'bg-[#242426] text-gray-300'
                }`}
              >
                Member
              </button>
              <button
                onClick={() => {
                  loginAs('admin');
                  setIsMobileMenuOpen(false);
                }}
                className={`py-1.5 text-center rounded text-[11px] font-bold ${
                  currentRole === 'admin' ? 'bg-[#FF5200] text-white' : 'bg-[#242426] text-gray-300'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {currentRole === 'public' &&
            publicNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveView(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider ${
                  activeView === link.id
                    ? 'bg-[#FF5200] text-white'
                    : 'text-gray-300 hover:bg-[#1C1C1E]'
                }`}
              >
                {link.label}
              </button>
            ))}
        </div>
      )}
    </header>
  );
};
