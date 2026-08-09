import React, { useState } from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Instagram } from 'lucide-react';
import { useGym } from '../../context/GymContext';

export const Footer: React.FC = () => {
  const { setActiveView, addToast } = useGym();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    addToast('success', 'Newsletter Subscribed', 'Thank you for subscribing to Vitality updates!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#111111] text-gray-300 pt-16 pb-8 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Vitality Logo & Intro */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveView('home')}>
              <div className="w-10 h-10 rounded-xl bg-[#FF5200] flex items-center justify-center text-white shadow-lg shadow-[#FF5200]/30">
                <Dumbbell className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white uppercase font-sans">
                Vitality
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Treadmills, stationary bikes, and elliptical machines are commonly used for cardiovascular workouts, to help improve endurance, burn calories, and enhance heart health.
            </p>
            
            {/* Opening Hours Badge */}
            <div className="bg-[#1C1C1E] border border-[#2A2A2D] p-3 rounded-xl flex items-center space-x-3 text-xs">
              <div className="w-8 h-8 rounded-full bg-[#FF5200]/20 text-[#FF5200] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white uppercase text-[11px] text-[#FF5200]">Opening hours</p>
                <p className="text-gray-400 text-xs mt-0.5">Monday - Friday: 10 AM - 11 PM</p>
              </div>
            </div>
          </div>

          {/* Col 2: OUR LINKS */}
          <div>
            <h4 className="font-extrabold text-sm tracking-wider text-white uppercase mb-4 border-b border-[#2A2A2D] pb-2">
              OUR LINKS
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-gray-400">
              <li>
                <button onClick={() => setActiveView('home')} className="hover:text-[#FF5200] transition-colors">
                  HOME
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('about')} className="hover:text-[#FF5200] transition-colors">
                  ABOUT US
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('classes')} className="hover:text-[#FF5200] transition-colors">
                  EVENT
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('pricing')} className="hover:text-[#FF5200] transition-colors">
                  PAGES
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('trainers')} className="hover:text-[#FF5200] transition-colors">
                  BLOG
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('contact')} className="hover:text-[#FF5200] transition-colors">
                  CONTACT US
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: CONTACT US */}
          <div>
            <h4 className="font-extrabold text-sm tracking-wider text-white uppercase mb-4 border-b border-[#2A2A2D] pb-2">
              CONTACT US
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-400">
              <li className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-[#1C1C1E] border border-[#2A2A2D] text-[#FF5200] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white text-[11px]">Address Location</p>
                  <p className="text-gray-400">12 Street Rd Suite United States of America</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-[#1C1C1E] border border-[#2A2A2D] text-[#FF5200] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white text-[11px]">Email Address</p>
                  <p className="text-gray-400">helpinfo@fitkitgymplet.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-7 h-7 rounded-full bg-[#1C1C1E] border border-[#2A2A2D] text-[#FF5200] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-bold text-white text-[11px]">Phone Number</p>
                  <p className="text-gray-400">+163-6589-0652</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Our Circular (Newsletter & Socials) */}
          <div>
            <h4 className="font-extrabold text-sm tracking-wider text-white uppercase mb-4 border-b border-[#2A2A2D] pb-2">
              Our Circular
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Subscribe to our monthly newsletter for workout guides, fitness tips & special class events.
            </p>
            {subscribed ? (
              <div className="bg-[#1C1C1E] border border-[#FF5200] text-white p-3 rounded-xl text-xs">
                Thanks for subscribing to Vitality!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email Address..."
                    required
                    className="w-full bg-[#1C1C1E] text-white text-xs px-3.5 py-3 rounded-xl border border-[#2A2A2D] focus:outline-none focus:border-[#FF5200] pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#FF5200] hover:bg-[#E04800] text-white rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* Social Icons */}
            <div className="flex space-x-3 pt-4">
              <a href="#facebook" className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-[#2A2A2D] text-gray-400 hover:text-[#FF5200] hover:border-[#FF5200] flex items-center justify-center transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-[#2A2A2D] text-gray-400 hover:text-[#FF5200] hover:border-[#FF5200] flex items-center justify-center transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#instagram" className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-[#2A2A2D] text-gray-400 hover:text-[#FF5200] hover:border-[#FF5200] flex items-center justify-center transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-[#222222] pt-6 text-center text-xs text-gray-500">
          <p>Copyright 2024 <span className="text-[#FF5200] font-bold">Vitality</span>. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
