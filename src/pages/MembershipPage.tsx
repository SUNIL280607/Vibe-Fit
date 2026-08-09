import React, { useState } from 'react';
import { useGym } from '../context/GymContext';
import { MEMBERSHIP_PLANS } from '../mockData';
import { Check, X, Sparkles, ShieldCheck, Zap, ArrowRight, HelpCircle, ArrowLeft, Dumbbell } from 'lucide-react';

export const MembershipPage: React.FC = () => {
  const { setIsAuthModalOpen, setAuthModalMode, addToast, setActiveView } = useGym();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const matrixFeatures = [
    { name: 'Full Gym Floor & Equipment Access', basic: true, standard: true, premium: true },
    { name: 'Locker Rooms & Shower Facilities', basic: true, standard: true, premium: true },
    { name: 'Vitality Mobile Fitness App', basic: true, standard: true, premium: true },
    { name: 'Group Fitness Class Sessions', basic: '2 / month', standard: 'Unlimited', premium: 'Unlimited' },
    { name: '1-on-1 Personal Trainer Orientation', basic: false, standard: '1x Monthly', premium: '2x Monthly' },
    { name: 'Custom Nutrition & Meal Plan Guide', basic: false, standard: true, premium: true },
    { name: 'Sauna, Steam Room & Recovery Zone', basic: false, standard: false, premium: true },
    { name: 'Priority Class Booking Window', basic: false, standard: false, premium: true },
    { name: 'Free Guest Passes', basic: false, standard: '1 Guest / mo', premium: '4 Guests / mo' }
  ];

  const faqs = [
    {
      q: 'Can I switch or cancel my membership anytime?',
      a: 'Yes! You can upgrade, downgrade, or cancel your membership with 30 days notice from your member portal account.'
    },
    {
      q: 'Are group fitness classes included in all plans?',
      a: 'Standard and Premium memberships include unlimited access to all group classes. Basic memberships include 2 sessions per month.'
    },
    {
      q: 'Do you offer a free trial before joining?',
      a: 'Yes, we offer a complimentary 1-Day VIP Pass for new visitors. Simply click "Get VIP Pass" or contact our front desk.'
    },
    {
      q: 'What are the operating hours of Vitality Gym?',
      a: 'We are open 24/7 for Premium and Standard members. Basic members have access from 5:00 AM to 11:00 PM daily.'
    }
  ];

  return (
    <div className="bg-[#111111] min-h-screen py-10 text-gray-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation / Back Button Bar */}
        <div className="flex items-center justify-between border-b border-[#2A2A2D] pb-4">
          <button
            onClick={() => setActiveView('home')}
            className="flex items-center gap-2 text-xs font-extrabold uppercase text-gray-300 hover:text-[#FF5200] transition-colors bg-[#1C1C1E] border border-[#2A2A2D] px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 text-[#FF5200]" /> BACK TO HOME
          </button>

          <span className="text-[10px] text-[#FF5200] font-extrabold uppercase tracking-widest bg-[#1C1C1E] px-3 py-1 rounded-full border border-[#2A2A2D]">
            MEMBERSHIP PLANS
          </span>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest inline-flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#FF5200]" /> FLEXIBLE PLANS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase mt-2">
            CHOOSE YOUR <span className="text-[#FF5200]">MEMBERSHIP</span> PLAN
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Tailored for fitness enthusiasts who demand peak performance, expert guidance, and world-class equipment.
          </p>

          {/* Billing Toggle Switch */}
          <div className="inline-flex items-center bg-[#1C1C1E] p-1.5 rounded-2xl border border-[#2A2A2D] mt-8 shadow-md">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 text-xs font-extrabold uppercase rounded-xl transition-all ${
                billingCycle === 'monthly' ? 'bg-[#FF5200] text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 text-xs font-extrabold uppercase rounded-xl transition-all flex items-center gap-2 ${
                billingCycle === 'annual' ? 'bg-[#FF5200] text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-[#111111] text-[#FF5200] text-[10px] px-2 py-0.5 rounded-full font-black border border-[#FF5200]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {MEMBERSHIP_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`vitality-card p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-[#FF5200] shadow-2xl shadow-[#FF5200]/20 scale-105 z-10 bg-[#1C1C1E]'
                    : 'hover:border-[#FF5200]/50 bg-[#18181A]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#FF5200] text-white text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    MOST POPULAR TIER 🔥
                  </span>
                )}

                <div>
                  <h3 className="font-extrabold text-2xl text-white uppercase mb-1">{plan.name}</h3>
                  <p className="text-xs text-gray-400 min-h-[32px]">{plan.description}</p>

                  {/* Price Banner */}
                  <div className="my-6 pb-6 border-b border-[#2A2A2D]">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-4xl font-black text-white">${price}</span>
                      <span className="text-xs text-gray-400 font-bold uppercase">/ month</span>
                    </div>
                    {billingCycle === 'annual' && (
                      <span className="text-[11px] text-[#FF5200] font-bold block mt-1 uppercase">
                        Billed annually (${plan.annualPrice}/yr)
                      </span>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 text-xs mb-8">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        {feat.included ? (
                          <div className="w-4 h-4 rounded-full bg-[#FF5200] text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-[#2A2A2D] text-gray-500 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-3 h-3 stroke-[2]" />
                          </div>
                        )}
                        <span className={feat.included ? 'text-gray-200 font-medium' : 'text-gray-500 line-through'}>
                          {feat.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setAuthModalMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className={`w-full py-3.5 rounded-xl text-xs font-extrabold uppercase transition-all shadow-md ${
                    plan.popular
                      ? 'btn-orange'
                      : 'bg-[#111111] border border-[#2A2A2D] text-white hover:border-[#FF5200] hover:text-[#FF5200]'
                  }`}
                >
                  Join {plan.name} Now
                </button>
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="vitality-card p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">DETAILED BREAKDOWN</span>
            <h2 className="text-2xl font-extrabold text-white uppercase mt-1">FEATURE COMPARISON MATRIX</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#111111] text-white font-extrabold uppercase border-b border-[#2A2A2D]">
                  <th className="p-4">Membership Features</th>
                  <th className="p-4 text-center">Basic Tier</th>
                  <th className="p-4 text-center text-[#FF5200]">Standard (Popular)</th>
                  <th className="p-4 text-center">Premium Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A2D]">
                {matrixFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#242426] transition-colors">
                    <td className="p-4 font-bold text-gray-200">{row.name}</td>
                    <td className="p-4 text-center">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? <Check className="w-4 h-4 text-[#FF5200] mx-auto" /> : <X className="w-4 h-4 text-gray-600 mx-auto" />
                      ) : (
                        <span className="font-bold text-gray-300">{row.basic}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-[#FF5200]/5 font-bold text-white">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? <Check className="w-4 h-4 text-[#FF5200] mx-auto" /> : <X className="w-4 h-4 text-gray-600 mx-auto" />
                      ) : (
                        <span className="font-extrabold text-[#FF5200]">{row.standard}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? <Check className="w-4 h-4 text-[#FF5200] mx-auto" /> : <X className="w-4 h-4 text-gray-600 mx-auto" />
                      ) : (
                        <span className="font-bold text-gray-300">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="vitality-card p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[#FF5200] font-extrabold text-xs uppercase tracking-widest">GOT QUESTIONS?</span>
            <h2 className="text-2xl font-extrabold text-white uppercase mt-1">FREQUENTLY ASKED QUESTIONS</h2>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-[#111111] border border-[#2A2A2D] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-4 text-left font-extrabold text-sm text-white flex justify-between items-center"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#FF5200] font-bold text-lg">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0 text-xs text-gray-400 border-t border-[#2A2A2D] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
