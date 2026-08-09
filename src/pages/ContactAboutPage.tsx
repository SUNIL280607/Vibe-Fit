import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Dumbbell, ArrowLeft } from 'lucide-react';

export const ContactAboutPage: React.FC = () => {
  const { addToast, setActiveView } = useGym();

  const [activeTab, setActiveTab] = useState<'about' | 'contact' | 'terms'>('about');

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [subject, setSubject] = useState('Membership Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('success', 'Message Transmitted', 'Our Vitality team will respond to your email within 24 hours.');
  };

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
            VITALITY CLUB INFO
          </span>
        </div>

        {/* Sub-header Tabs */}
        <div className="flex justify-center border-b border-[#2A2A2D]">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'about' ? 'border-[#FF5200] text-[#FF5200]' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              ABOUT VITALITY
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-3 font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'contact' ? 'border-[#FF5200] text-[#FF5200]' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              CONTACT US
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`pb-3 font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'terms' ? 'border-[#FF5200] text-[#FF5200]' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              TERMS & POLICIES
            </button>
          </div>
        </div>

        {/* TAB 1: ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-12 animate-in fade-in duration-200">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-[#1C1C1E] text-white p-8 sm:p-14 border border-[#2A2A2D] shadow-2xl">
              <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80')` }}></div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
                  <Dumbbell className="w-4 h-4 text-[#FF5200]" /> VITALITY FITNESS
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight uppercase">
                  Empowering <span className="text-[#FF5200]">Every Body</span> To Reach Peak Fitness
                </h1>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Vitality Fitness & Gym Club combines high-performance equipment, master-certified trainers, and energizing group exercise classes to help members burn fat, build muscle, and optimize total health.
                </p>
              </div>
            </div>

            {/* Stats Counter Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="vitality-card p-6 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#FF5200]">2,000+</p>
                <p className="text-xs font-bold text-gray-400 uppercase mt-1">Satisfied Members</p>
              </div>
              <div className="vitality-card p-6 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white">15+</p>
                <p className="text-xs font-bold text-gray-400 uppercase mt-1">Years Experience</p>
              </div>
              <div className="vitality-card p-6 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#FF5200]">12</p>
                <p className="text-xs font-bold text-gray-400 uppercase mt-1">Certified Trainers</p>
              </div>
              <div className="vitality-card p-6 text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-white">24/7</p>
                <p className="text-xs font-bold text-gray-400 uppercase mt-1">Facility Access</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONTACT */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-200">
            {/* Contact Form */}
            <div className="vitality-card p-8">
              <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">GET IN TOUCH</span>
              <h2 className="text-2xl font-extrabold text-white uppercase mt-1">SEND US A MESSAGE</h2>
              <p className="text-xs text-gray-400 mt-1 mb-6">Have questions about memberships, personal training, or group classes?</p>

              {submitted ? (
                <div className="bg-[#FF5200]/10 border border-[#FF5200] p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#FF5200] mx-auto" />
                  <h3 className="font-extrabold text-lg text-white uppercase">Message Received</h3>
                  <p className="text-xs text-gray-300">Thank you! Our front desk staff will respond within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-orange text-xs px-6 py-2 mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    >
                      <option value="Membership Inquiry">Membership Inquiry</option>
                      <option value="Personal Training">Personal Training</option>
                      <option value="Class Schedule">Class Schedule</option>
                      <option value="Feedback / Support">Feedback / Support</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we assist you with your fitness journey?"
                      className="w-full p-3 bg-[#111111] border border-[#2A2A2D] rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5200]"
                    />
                  </div>

                  <button type="submit" className="w-full py-3.5 btn-orange text-xs font-extrabold uppercase flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Transmit Message
                  </button>
                </form>
              )}
            </div>

            {/* Club Info Sidebar */}
            <div className="space-y-6">
              <div className="vitality-card p-8 space-y-6">
                <h3 className="font-extrabold text-lg text-white uppercase">VITALITY CLUB LOCATIONS</h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FF5200] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Main Headquarters & Facility</p>
                      <p className="text-gray-400">742 Fitness Boulevard, Downtown Metric City</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#FF5200] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Phone Support</p>
                      <p className="text-gray-400">+1 (800) 555-VITALITY</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#FF5200] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Email Desk</p>
                      <p className="text-gray-400">support@vitalityfitness.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#FF5200] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Front Desk Hours</p>
                      <p className="text-gray-400">Mon - Fri: 5:00 AM - 11:00 PM</p>
                      <p className="text-gray-400">Sat - Sun: 6:00 AM - 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TERMS & POLICIES */}
        {activeTab === 'terms' && (
          <div className="vitality-card p-8 space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">RULES & POLICIES</span>
              <h2 className="text-2xl font-extrabold text-white uppercase mt-1">CLUB POLICIES & TERMS OF SERVICE</h2>
            </div>

            <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
              <p>
                <strong className="text-white">1. Membership Conduct:</strong> All members must respect trainers, equipment, and fellow athletes. Proper athletic attire and clean footwear are required at all times.
              </p>
              <p>
                <strong className="text-white">2. Class Cancellations:</strong> Group fitness bookings must be cancelled at least 2 hours prior to start time to avoid waitlist penalty points.
              </p>
              <p>
                <strong className="text-white">3. Safety & Liability:</strong> Members must complete an initial health orientation before using heavy free weights or specialized sauna equipment.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
