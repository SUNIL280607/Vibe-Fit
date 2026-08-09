import React from 'react';
import { useGym } from '../../context/GymContext';
import { Crown, CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useGym();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const borderColors = {
          success: 'border-[#C5A059] bg-[#0A1610]/95 text-slate-100',
          error: 'border-red-500/80 bg-[#1A0A0A]/95 text-slate-100',
          warning: 'border-amber-500/80 bg-[#1A140A]/95 text-slate-100',
          info: 'border-emerald-500/80 bg-[#0A1610]/95 text-slate-100'
        };

        const icons = {
          success: <Crown className="w-5 h-5 text-[#E5C378] shrink-0" />,
          error: <XCircle className="w-5 h-5 text-red-400 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-[#C5A059] shrink-0" />
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border backdrop-blur-md flex items-start space-x-3 transition-all duration-300 animate-in fade-in slide-in-from-right-5 ${borderColors[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 pr-2">
              <h5 className="font-cinzel font-bold text-xs tracking-wider text-[#E5C378] uppercase">{toast.title}</h5>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-[#E5C378] p-0.5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

