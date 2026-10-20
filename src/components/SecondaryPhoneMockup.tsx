import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, Check, ArrowRightLeft, DollarSign, Sparkles } from 'lucide-react';

export const SecondaryPhoneMockup: React.FC = () => {
  const [pulseSync, setPulseSync] = useState(false);
  const [lastNotification, setLastNotification] = useState('Sofía registró: Supermercado ($84.50)');

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseSync(true);
      setTimeout(() => setPulseSync(false), 2000);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[310px] select-none opacity-90 hover:opacity-100 transition-opacity">
      {/* Glow */}
      <div className="absolute -inset-3 bg-gradient-to-br from-indigo-600/25 to-purple-600/25 rounded-[50px] blur-xl -z-10" />

      {/* Frame */}
      <div className="relative rounded-[42px] p-[8px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl border border-slate-700/50">
        <div className="relative overflow-hidden rounded-[34px] bg-[#0d0b1c] text-white border border-purple-500/15 h-[580px] flex flex-col">
          
          {/* Top Bar */}
          <div className="pt-2.5 px-5 pb-1 flex items-center justify-between text-[10px] font-semibold text-slate-400">
            <span>9:41</span>
            <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            </div>
            <div className="flex items-center gap-1">
              <span>5G</span>
            </div>
          </div>

          {/* Sync Header */}
          <div className="p-3 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-[10px] border border-blue-400/30">
                M
              </div>
              <div>
                <p className="text-[11px] font-bold text-white">Mateo (Dispositivo Vinculado)</p>
                <div className="flex items-center gap-1 text-[9px] text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Sincronización en vivo</span>
                </div>
              </div>
            </div>

            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          </div>

          {/* Live Notification Popup Card on Partner's phone */}
          <div className="p-3">
            <motion.div
              animate={{ scale: pulseSync ? [1, 1.03, 1] : 1 }}
              transition={{ duration: 0.5 }}
              className="p-3 rounded-xl bg-purple-900/30 border border-purple-500/30 shadow-lg space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider font-bold text-purple-300 flex items-center gap-1">
                  <Bell className="w-2.5 h-2.5" /> Notificación Push
                </span>
                <span className="text-[9px] text-slate-400">Ahora</span>
              </div>

              <p className="text-xs font-semibold text-slate-100">
                {lastNotification}
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                <span className="text-slate-400">Tu parte (50%):</span>
                <span className="font-bold text-purple-200 tabular-nums">$42.25 USD</span>
              </div>
            </motion.div>
          </div>

          {/* Pair Balance Preview */}
          <div className="px-3 pb-3 space-y-2 flex-1">
            <div className="p-3 rounded-xl bg-[#141128] border border-white/5">
              <span className="text-[10px] text-slate-400 block mb-0.5">Tu estado de balance actual</span>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-bold text-white font-display">Debes $50.25</span>
                <span className="text-[10px] text-purple-400 font-medium">a Sofía</span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setLastNotification('¡Has transferido $50.25 a Sofía!');
                    setPulseSync(true);
                  }}
                  className="w-full py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-[10px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Transferir con un clic</span>
                </button>
              </div>
            </div>

            {/* Micro feed */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 px-1">ACTIVIDAD RECIENTE</span>

              <div className="p-2 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-200">Cena Trattoria</span>
                </div>
                <span className="font-medium text-slate-300 tabular-nums">Tú pagaste $62</span>
              </div>

              <div className="p-2 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-slate-200">Luz & Wi-Fi</span>
                </div>
                <span className="font-medium text-slate-300 tabular-nums">Sofía pagó $78</span>
              </div>

              <div className="p-2 rounded-lg bg-black/20 border border-white/5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-400" />
                  <span className="text-slate-200">Boletos de Cine</span>
                </div>
                <span className="font-medium text-slate-300 tabular-nums">Invitaste tú</span>
              </div>
            </div>

            {/* Offline PWA badge */}
            <div className="mt-2 p-2 rounded-lg bg-indigo-950/30 border border-indigo-500/20 flex items-center gap-2 text-[10px] text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Funciona sin conexión. Se sincroniza al reconectar.</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="p-2 bg-black/50 flex justify-center border-t border-white/5">
            <div className="w-20 h-1 bg-slate-600 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};
