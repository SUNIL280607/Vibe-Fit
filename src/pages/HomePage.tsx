import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import {
  Dumbbell,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Star,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveView, setIsAuthModalOpen, setAuthModalMode, setSelectedClassForModal } = useGym();

  // Accordion state for About Us section
  const [openAboutAccordion, setOpenAboutAccordion] = useState<number>(1);

  // Tab state for Fitness Classes section
  const [activeClassTab, setActiveClassTab] = useState<string>('Exercise and Gym Class');

  // Active Trainer for Trainer section hover/click
  const [activeTrainerId, setActiveTrainerId] = useState<string>('trn-3');

  // Testimonial selector state
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  const testimonials = [
    {
      name: 'Alexander',
      role: 'Our Client',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      text: "Hiking has become my meditation. The fresh air and feeling of connectedness to nature is so calming and peaceful. Hiking has been one of the best decisions I've made when it comes to fitness since it's also provided me with weight loss and has helped me build strength. I'm a better version of myself than I was before I started taking regular hikes."
    },
    {
      name: 'Eliza',
      role: 'Our Client',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      text: "The customized fitness plans and dedicated trainers at Vitality helped me lose 15 kg and gain incredible confidence! The community atmosphere is unlike any other gym I've ever experienced."
    },
    {
      name: 'Christopher',
      role: 'Our Client',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      text: "Vitality's CrossFit classes push me beyond my limits every week. The coaches correct every detail of form to prevent injury while ensuring maximum physical growth!"
    },
    {
      name: 'Amara',
      role: 'Our Client',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      text: "As someone who was hesitant about joining a gym, Vitality welcomed me with open arms. Their yoga and Pilates sessions restored my posture and eliminated my chronic back pain."
    }
  ];

  const trainers = [
    {
      id: 'trn-1',
      name: 'Thomas Millar',
      role: 'Exercise Trainer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
    },
    {
      id: 'trn-2',
      name: 'Evelyn',
      role: 'Gym Trainer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'
    },
    {
      id: 'trn-3',
      name: 'Mark',
      role: 'Gym Trainer',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=250&q=80'
    },
    {
      id: 'trn-4',
      name: 'Eliana',
      role: 'Exercise Trainer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80'
    }
  ];

  const classTabs = [
    'Exercise and Gym Class',
    'Individual Instruction',
    'Boxing Course',
    'Cross-Fit Exercise',
    'Pilates & Yoga',
    'Psychoeducation'
  ];

  return (
    <div className="bg-[#111111] text-gray-200 min-h-screen font-sans">
      
      {/* -------------------------------------------------------------
          SECTION 1: HERO (Fit To Keep Your Skin)
      ------------------------------------------------------------- */}
      <section className="relative bg-[#161616] overflow-hidden py-20 lg:py-28 border-b border-[#222222]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 filter brightness-75" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/85 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest inline-block bg-[#FF5200]/10 border border-[#FF5200]/30 px-3.5 py-1.5 rounded-full">
                GREETINGS FROM FITKIT GYM
              </span>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-white uppercase font-sans">
                FIT TO <span className="text-[#FF5200]">KEEP</span> <br />
                YOUR SKIN
              </h1>

              <p className="text-sm text-gray-300 leading-relaxed max-w-lg">
                Workouts at a gym are planned physical activities carried out in a fitness center furnished with a range of exercise equipment, free weights, and other amenities.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setActiveView('classes')}
                  className="btn-orange px-8 py-4 text-xs font-extrabold flex items-center gap-2 shadow-xl"
                >
                  VIEW CLASS SCHEDULE
                </button>

                <div className="flex items-center gap-3 bg-[#1C1C1E] border border-[#2A2A2D] px-5 py-3 rounded-xl">
                  <div className="text-xl font-black text-[#FF5200]">2K+</div>
                  <div className="text-xs font-bold text-gray-300 leading-tight">Satisfied<br />Customer</div>
                </div>
              </div>
            </div>

            {/* Carousel Arrow Controls Mock */}
            <div className="hidden lg:flex justify-end items-center space-x-3">
              <button className="w-12 h-12 rounded-full bg-[#1C1C1E] border border-[#2A2A2D] text-gray-400 hover:text-[#FF5200] hover:border-[#FF5200] flex items-center justify-center transition-all">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="w-12 h-12 rounded-full bg-[#FF5200] text-white flex items-center justify-center shadow-lg shadow-[#FF5200]/30 hover:bg-[#E04800] transition-all">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 2: ABOUT US (We Have a Great Deal of Experience...)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Overlapping Fitness Images + Orange Badge */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" 
                alt="Gym Workout" 
                className="rounded-2xl object-cover h-64 sm:h-80 w-full border border-[#2A2A2D]"
              />
              <img 
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80" 
                alt="Muscle Training" 
                className="rounded-2xl object-cover h-64 sm:h-80 w-full border border-[#2A2A2D] mt-8"
              />
            </div>
            
            {/* Floating Orange Badge with Dumbbell */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#FF5200] rounded-full border-4 border-[#111111] flex items-center justify-center text-white shadow-2xl">
              <Dumbbell className="w-9 h-9" />
            </div>
          </div>

          {/* Right: Text + Accordion */}
          <div className="space-y-6">
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">ABOUT US</span>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white uppercase leading-tight">
              We Have a <span className="text-[#FF5200]">Great Deal</span> of Experience With <span className="text-[#FF5200]">Fitness</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              A lot of people gain from customized exercise regimens created by personal trainers or fitness experts to target particular fitness objectives, such as weight loss, muscle building, or enhanced sports performance.
            </p>

            {/* Accordions */}
            <div className="space-y-3 pt-2">
              <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenAboutAccordion(openAboutAccordion === 1 ? 0 : 1)}
                  className="w-full p-4 text-left font-extrabold text-xs sm:text-sm text-white flex justify-between items-center"
                >
                  <span>01. more than fifteen years of experience</span>
                  {openAboutAccordion === 1 ? <ChevronUp className="w-4 h-4 text-[#FF5200]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {openAboutAccordion === 1 && (
                  <div className="px-4 pb-4 text-xs text-gray-400 border-t border-[#2A2A2D] pt-2">
                    Over 15 years of industry leadership equipping athletes, beginners, and fitness enthusiasts with elite training tools and certified coaching.
                  </div>
                )}
              </div>

              <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenAboutAccordion(openAboutAccordion === 2 ? 0 : 2)}
                  className="w-full p-4 text-left font-extrabold text-xs sm:text-sm text-white flex justify-between items-center"
                >
                  <span>02 Authorized Instructors</span>
                  {openAboutAccordion === 2 ? <ChevronUp className="w-4 h-4 text-[#FF5200]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {openAboutAccordion === 2 && (
                  <div className="px-4 pb-4 text-xs text-gray-400 border-t border-[#2A2A2D] pt-2">
                    All trainers hold national certifications (CSCS, ACE, NASM, RYT) and undergo rigorous safety protocols.
                  </div>
                )}
              </div>

              <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenAboutAccordion(openAboutAccordion === 3 ? 0 : 3)}
                  className="w-full p-4 text-left font-extrabold text-xs sm:text-sm text-white flex justify-between items-center"
                >
                  <span>03 Outstanding caliber of work</span>
                  {openAboutAccordion === 3 ? <ChevronUp className="w-4 h-4 text-[#FF5200]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {openAboutAccordion === 3 && (
                  <div className="px-4 pb-4 text-xs text-gray-400 border-t border-[#2A2A2D] pt-2">
                    State-of-the-art machinery, ultra-clean facilities, and data-driven tracking for peak performance.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 3: WORK PROCEDURE (3 Steps Cards)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">WORK PROCEDURE</span>
          <h2 className="text-3xl font-extrabold text-white uppercase">
            Simple Steps To <span className="text-[#FF5200]">Reach</span> Your <span className="text-[#FF5200]">Objectives</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="vitality-card vitality-card-hover p-6 flex flex-col justify-between">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80" 
                alt="Exercise Movement" 
                className="w-full h-48 object-cover rounded-xl mb-6 border border-[#2A2A2D]"
              />
              <h3 className="text-xl font-extrabold text-white uppercase mb-2">Exercise Movement</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                A lot of gyms include resources and tools for tracking success, like integrated gym software, workout records, and fitness applications.
              </p>
            </div>
            <button 
              onClick={() => setActiveView('classes')}
              className="btn-orange py-2.5 px-5 text-xs self-start"
            >
              Learn More
            </button>
          </div>

          {/* Card 2 */}
          <div className="vitality-card vitality-card-hover p-6 flex flex-col justify-between">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80" 
                alt="Fitmes Methods" 
                className="w-full h-48 object-cover rounded-xl mb-6 border border-[#2A2A2D]"
              />
              <h3 className="text-xl font-extrabold text-white uppercase mb-2">Fitmes Methods</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Gyms are flexible enough to accommodate people of all fitness levels and tastes, from novices to experts.
              </p>
            </div>
            <button 
              onClick={() => setActiveView('classes')}
              className="btn-orange py-2.5 px-5 text-xs self-start"
            >
              Learn More
            </button>
          </div>

          {/* Card 3 */}
          <div className="vitality-card vitality-card-hover p-6 flex flex-col justify-between">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80" 
                alt="Success" 
                className="w-full h-48 object-cover rounded-xl mb-6 border border-[#2A2A2D]"
              />
              <h3 className="text-xl font-extrabold text-white uppercase mb-2">Success</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Instructor-led group fitness programs provide structured exercises in an inspiring environment that fosters personal growth.
              </p>
            </div>
            <button 
              onClick={() => setActiveView('classes')}
              className="btn-orange py-2.5 px-5 text-xs self-start"
            >
              Learn More
            </button>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 4: FITNESS AND GYM TRAINING (Tabbed Showcase)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">Fitness and Gym Training</span>
          <h2 className="text-3xl font-extrabold text-white uppercase">
            Our <span className="text-[#FF5200]">Fitness</span> Classes in the Gym
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Angled Image Card */}
          <div className="lg:col-span-7 bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center">
            <img 
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" 
              alt={activeClassTab}
              className="w-full sm:w-1/2 h-56 object-cover rounded-xl border border-[#2A2A2D]"
            />
            <div className="space-y-4 sm:w-1/2">
              <h3 className="text-xl font-extrabold text-white uppercase">{activeClassTab}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Common cardiovascular exercise equipment includes treadmills, stationary bikes, and elliptical machines. These machines help increase stamina, burn calories and improve cardiac health.
              </p>
              <button 
                onClick={() => setActiveView('classes')}
                className="btn-orange px-6 py-2.5 text-xs"
              >
                VIEW DETAILS
              </button>
            </div>
          </div>

          {/* Right Vertical Tab Menu */}
          <div className="lg:col-span-5 space-y-2">
            {classTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveClassTab(tab)}
                className={`w-full p-4 text-left font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-between ${
                  activeClassTab === tab
                    ? 'bg-[#FF5200] text-white shadow-lg shadow-[#FF5200]/20'
                    : 'bg-[#1C1C1E] text-gray-300 hover:bg-[#242426] border border-[#2A2A2D]'
                }`}
              >
                <span>{tab}</span>
                {activeClassTab === tab && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}

            <div className="pt-2 text-right">
              <button 
                onClick={() => setActiveView('classes')}
                className="text-xs font-bold text-[#FF5200] hover:underline flex items-center gap-1 justify-end ml-auto"
              >
                View Every Class →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 5: TRAINING CLASSES SCHEDULE MATRIX (Weekly Table)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">OUR GYM CLASS</span>
          <h2 className="text-3xl font-extrabold text-white uppercase">
            Training <span className="text-[#FF5200]">Classes</span> Schedule
          </h2>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto bg-[#1C1C1E] rounded-2xl border border-[#2A2A2D]">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="bg-[#FF5200] text-white font-extrabold uppercase">
                <th className="p-3 border border-[#2A2A2D]">Time</th>
                <th className="p-3 border border-[#2A2A2D]">Monday</th>
                <th className="p-3 border border-[#2A2A2D]">Tuesday</th>
                <th className="p-3 border border-[#2A2A2D]">Wednesday</th>
                <th className="p-3 border border-[#2A2A2D]">Thursday</th>
                <th className="p-3 border border-[#2A2A2D]">Friday</th>
                <th className="p-3 border border-[#2A2A2D]">Saturday</th>
                <th className="p-3 border border-[#2A2A2D]">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A2D] text-gray-300 font-bold">
              
              <tr>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">06:00-07:00</td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">FITNESS CLASS</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Yoga</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Kickboxing</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Body Pump</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CrossFit</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CROSSFIT PRO</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">06:00-07:00</td>
              </tr>

              <tr>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">07:00-08:00</td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Yoga</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Kickboxing</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Yoga</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">FITNESS CLASS</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Boot Camp</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Kickboxing</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">07:00-08:00</td>
              </tr>

              <tr>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">08:00-09:00</td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Kickboxing</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                {/* Active Highlight Cell */}
                <td className="p-3 border border-[#FF5200] bg-[#FF5200] text-white">
                  <p className="font-extrabold">FITNESS CLASS</p>
                  <p className="text-[10px] text-white/90 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Kickboxing</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">FITNESS CLASS</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CROSSFIT PRO</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Yoga</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">08:00-09:00</td>
              </tr>

              <tr>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">09:00-10:00</td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Yoga</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CROSSFIT PRO</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Kickboxing</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">FITNESS CLASS</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Yoga</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CrossFit</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">09:00-10:00</td>
              </tr>

              <tr>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">10:00-11:00</td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">FITNESS CLASS</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CrossFit</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CROSSFIT PRO</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Body Pump</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CrossFit</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Boot Camp</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">10:00-11:00</td>
              </tr>

              <tr>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">11:00-12:00</td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Yoga</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Boot Camp</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CrossFit</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">Kickboxing</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">FITNESS CLASS</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 border border-[#2A2A2D]">
                  <p className="text-white">CROSSFIT PRO</p>
                  <p className="text-[10px] text-gray-400 font-normal">Robert Prison</p>
                </td>
                <td className="p-3 bg-[#161616] font-bold text-gray-400">11:00-12:00</td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 6: PRICING MODEL (Find Your Perfect Plan)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">Pricing Model</span>
          <h2 className="text-3xl font-extrabold text-white uppercase">
            Find Your <span className="text-[#FF5200]">Perfect</span> Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1 */}
          <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-8 flex flex-col justify-between hover:border-[#FF5200] transition-all">
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-white uppercase">Essential Plan</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#FF5200]">$150</span>
                <span className="text-xs text-gray-400 font-normal">/ Month</span>
              </div>
              
              <ul className="space-y-3 text-xs text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> 20 Workouts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> Free shows and lockers
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> Reliable & erfahrenes Team
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> Kostenlose Parkplätze
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> 5 Tage pro Woche
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> Programm für Ernährung
                </li>
              </ul>
            </div>

            <button 
              onClick={() => {
                setAuthModalMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="mt-8 btn-orange py-3 w-full text-xs font-bold"
            >
              Add To Cart
            </button>
          </div>

          {/* Card 2 (Featured Orange Card in Image) */}
          <div className="bg-[#FF5200] rounded-2xl p-8 text-white flex flex-col justify-between shadow-2xl transform lg:-translate-y-2 relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <h3 className="text-xl font-extrabold text-white uppercase">Essential Plan</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$150</span>
                <span className="text-xs text-white/90 font-normal">/ Month</span>
              </div>

              <ul className="space-y-3 text-xs text-white font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" /> 20 Workouts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" /> Free shows and lockers
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" /> Reliable & erfahrenes Team
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" /> Kostenlose Parkplätze
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" /> 5 Tage pro Woche
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-white" /> Programm für Ernährung
                </li>
              </ul>
            </div>

            <button 
              onClick={() => {
                setAuthModalMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="mt-8 bg-white text-[#FF5200] hover:bg-gray-100 py-3 w-full text-xs font-extrabold uppercase rounded-lg shadow-lg transition-all"
            >
              Add To Cart
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-8 flex flex-col justify-between hover:border-[#FF5200] transition-all">
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-white uppercase">Essential Plan</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[#FF5200]">$150</span>
                <span className="text-xs text-gray-400 font-normal">/ Month</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> 20 Workouts
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> Free shows and lockers
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> Reliable & erfahrenes Team
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> Kostenlose Parkplätze
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> 5 Tage pro Woche
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF5200]" /> Programm für Ernährung
                </li>
              </ul>
            </div>

            <button 
              onClick={() => {
                setAuthModalMode('signup');
                setIsAuthModalOpen(true);
              }}
              className="mt-8 btn-orange py-3 w-full text-xs font-bold"
            >
              Add To Cart
            </button>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 7: WHY CHOOSE US (Energizing Exercise Program)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Images on Left */}
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80" 
              alt="Gym Treadmill" 
              className="w-full h-72 object-cover rounded-2xl border border-[#2A2A2D]"
            />
            <img 
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80" 
              alt="Personal Trainer" 
              className="w-full h-72 object-cover rounded-2xl border border-[#2A2A2D] mt-6"
            />
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">WHY CHOOSE US</span>

            <h2 className="text-3xl font-extrabold text-white uppercase leading-tight">
              Energizing <span className="text-[#FF5200]">Exercise</span> Program for Both <span className="text-[#FF5200]">Body</span> and Mind
            </h2>

            <p className="text-xs text-gray-400 leading-relaxed">
              Many people gain from customized exercise regimens created by personal trainers or fitness experts to target particular fitness objectives, such as weight loss, muscle gain, or enhanced athletic performance. The flexibility to choose is offered by gyms.
            </p>

            {/* 2-Column Checklist */}
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-gray-300 font-bold">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5200]" /> Community & Group Exercise
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5200]" /> Group Fitness and Community
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5200]" /> Impact on Mental Health
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5200]" /> Group Fitness and Community
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5200]" /> Variety in Exercise
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#FF5200]" /> Group Fitness and Community
              </div>
            </div>

            <div>
              <button 
                onClick={() => setActiveView('about')}
                className="btn-orange px-8 py-3.5 text-xs font-extrabold"
              >
                LEARN MORE
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 8: OUR TRAINER (Meet Our Proficient Trainer)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">OUR TRAINER</span>
          <h2 className="text-3xl font-extrabold text-white uppercase">
            Meet Our <span className="text-[#FF5200]">Proficient</span> Trainer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trn) => {
            const isActive = activeTrainerId === trn.id;
            return (
              <div
                key={trn.id}
                onClick={() => setActiveTrainerId(trn.id)}
                className={`bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  isActive ? 'border-[#FF5200] shadow-2xl shadow-[#FF5200]/20' : 'hover:border-[#FF5200]/50'
                }`}
              >
                {/* Circular Avatar with Orange Dashed Ring & Plus Icon */}
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <img
                    src={trn.avatar}
                    alt={trn.name}
                    className="w-full h-full object-cover rounded-full border-2 border-[#2A2A2D]"
                  />
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-[#FF5200]/40 border-2 border-[#FF5200] flex items-center justify-center text-white">
                      <Plus className="w-8 h-8 font-bold" />
                    </div>
                  )}
                </div>

                <h4 className="font-extrabold text-base text-white uppercase">{trn.name}</h4>
                <p className="text-xs text-gray-400 mt-0.5">{trn.role}</p>

                {/* Social Icons */}
                <div className="flex justify-center space-x-3 pt-4 text-gray-400">
                  <a href="#facebook" className="hover:text-[#FF5200] transition-colors">
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a href="#twitter" className="hover:text-[#FF5200] transition-colors">
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                  <a href="#instagram" className="hover:text-[#FF5200] transition-colors">
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 9: TESTIMONIALS (What Our Clients Say?)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#222222]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">TESTIMONIALS</span>
          <h2 className="text-3xl font-extrabold text-white uppercase">
            What Our <span className="text-[#FF5200]">Clients</span> Say?
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Active Testimonial Card */}
          <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl p-8 sm:p-10 space-y-6 relative">
            <div className="flex items-center space-x-4">
              <img
                src={testimonials[activeTestimonial].avatar}
                alt={testimonials[activeTestimonial].name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#FF5200]"
              />
              <div>
                <h4 className="font-extrabold text-base text-white">{testimonials[activeTestimonial].name}</h4>
                <p className="text-xs text-gray-400">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
              "{testimonials[activeTestimonial].text}"
            </p>

            <div className="flex space-x-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
          </div>

          {/* Testimonial Selectors Row Below */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {testimonials.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`bg-[#1C1C1E] border p-3 rounded-xl flex items-center space-x-3 transition-all ${
                  activeTestimonial === idx
                    ? 'border-[#FF5200] text-white shadow-lg shadow-[#FF5200]/10'
                    : 'border-[#2A2A2D] text-gray-400 hover:border-[#FF5200]/50'
                }`}
              >
                <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="text-left text-xs truncate">
                  <p className="font-bold text-white truncate">{t.name}</p>
                  <p className="text-[10px] text-gray-400">{t.role}</p>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 10: BLOG (Our Latest News & Articles)
      ------------------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">BLOG</span>
          <h2 className="text-3xl font-extrabold text-white uppercase">
            Our Latest <span className="text-[#FF5200]">News</span> & Articles
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Blog Card 1 */}
          <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl overflow-hidden hover:border-[#FF5200] transition-all flex flex-col justify-between">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80" 
                alt="Gym Blog 1" 
                className="w-full h-48 object-cover border-b border-[#2A2A2D]"
              />
              <div className="p-6 space-y-3">
                <div className="text-[10px] text-gray-400 font-bold flex items-center space-x-4">
                  <span>📅 12 Jan, 2024</span>
                  <span>💬 Comments: 0</span>
                </div>
                <h3 className="text-base font-extrabold text-white uppercase leading-snug">
                  The Top 50 Effective Exercise Advice Tips for your health.
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  we share the top 50 exercise advice tips to help you achieve your fitness goals. Whether you're a beginner...
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button 
                onClick={() => setActiveView('trainers')}
                className="btn-orange py-2 px-5 text-xs font-bold"
              >
                READ MORE
              </button>
            </div>
          </div>

          {/* Blog Card 2 */}
          <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl overflow-hidden hover:border-[#FF5200] transition-all flex flex-col justify-between">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80" 
                alt="Gym Blog 2" 
                className="w-full h-48 object-cover border-b border-[#2A2A2D]"
              />
              <div className="p-6 space-y-3">
                <div className="text-[10px] text-gray-400 font-bold flex items-center space-x-4">
                  <span>📅 12 Jan, 2024</span>
                  <span>💬 Comments: 0</span>
                </div>
                <h3 className="text-base font-extrabold text-white uppercase leading-snug">
                  The Top 50 Effective Exercise Advice Tips for your health.
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  we share the top 50 exercise advice tips to help you achieve your fitness goals. Whether you're a beginner...
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button 
                onClick={() => setActiveView('trainers')}
                className="btn-orange py-2 px-5 text-xs font-bold"
              >
                READ MORE
              </button>
            </div>
          </div>

          {/* Blog Card 3 */}
          <div className="bg-[#1C1C1E] border border-[#2A2A2D] rounded-2xl overflow-hidden hover:border-[#FF5200] transition-all flex flex-col justify-between">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80" 
                alt="Gym Blog 3" 
                className="w-full h-48 object-cover border-b border-[#2A2A2D]"
              />
              <div className="p-6 space-y-3">
                <div className="text-[10px] text-gray-400 font-bold flex items-center space-x-4">
                  <span>📅 12 Jan, 2024</span>
                  <span>💬 Comments: 0</span>
                </div>
                <h3 className="text-base font-extrabold text-white uppercase leading-snug">
                  The Top 50 Effective Exercise Advice Tips for your health.
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  we share the top 50 exercise advice tips to help you achieve your fitness goals. Whether you're a beginner...
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button 
                onClick={() => setActiveView('trainers')}
                className="btn-orange py-2 px-5 text-xs font-bold"
              >
                READ MORE
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
