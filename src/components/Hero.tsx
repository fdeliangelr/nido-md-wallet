import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Smartphone, ShieldCheck, HeartHandshake, Zap, ArrowDown } from 'lucide-react';
import { PhoneMockup } from '../components/PhoneMockup';
import { SecondaryPhoneMockup } from '../components/SecondaryPhoneMockup';

interface HeroProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onExploreSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onExploreSimulator }) => {
  return (
    <section className="relative pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Dynamic ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-purple-700/20 via-indigo-600/25 to-fuchsia-700/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Grid texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Kicker Tagline (Faithful to user's screenshot) */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-200 text-xs sm:text-sm font-medium shadow-lg shadow-purple-900/20 backdrop-blur-md hover:border-purple-400/50 transition-all cursor-default group">
            <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
            <span>Tu gestor financiero inteligente y rápido</span>
          </div>
        </motion.div>

        {/* Headline matching user's design */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-6"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white leading-[1.08]">
            Toma el control de tus finanzas{' '}
            <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-fuchsia-400 drop-shadow-[0_0_40px_rgba(168,85,247,0.35)]">
              solas o en pareja
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Registra tus gastos en segundos, cambia de moneda automáticamente según tu región y lleva cuentas claras sin complicaciones. Instálala en tu celular como una app nativa.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={() => onOpenAuth('register')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-purple-600/35 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 group"
          >
            <span>Comenzar ahora</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreSimulator}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 border border-purple-500/25 text-slate-200 hover:text-white font-semibold text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 backdrop-blur-md"
          >
            <span>Probar simulador en vivo</span>
            <ArrowDown className="w-4 h-4 text-purple-400 animate-bounce" />
          </button>
        </motion.div>

        {/* Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400 mb-14 border-y border-purple-500/10 py-3.5 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-purple-400" />
            <span>División equitativa 50/50</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>PWA: Sin descarga de App Store</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Datos 100% privados</span>
          </div>
        </motion.div>

        {/* DYNAMIC PHONES SHOWCASE (Central Interactive Stage) */}
        <div className="relative max-w-5xl mx-auto mt-4">
          
          {/* Floating Orbiting Widget 1: Live Settle Toast (Top Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-12 left-4 xl:-left-8 z-20 items-center gap-3 p-3.5 rounded-2xl bg-[#171333]/90 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-950/40 animate-float-slow max-w-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 shrink-0">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">¡Cuentas al día!</p>
              <p className="text-[11px] text-slate-300">Mateo transfirió su parte a Sofía con 1 toque.</p>
            </div>
          </motion.div>

          {/* Floating Orbiting Widget 2: Multi-Currency Live (Top Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute top-24 right-4 xl:-right-6 z-20 items-center gap-3 p-3.5 rounded-2xl bg-[#171333]/90 backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-950/40 animate-float-opposite max-w-xs"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30 shrink-0">
              <span className="text-base font-black">💱</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Conversión en vivo</p>
              <p className="text-[11px] text-slate-300">USD ⇄ MXN ⇄ EUR sincronizados al instante.</p>
            </div>
          </motion.div>

          {/* Floating Orbiting Widget 3: PWA Native Badge (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="hidden md:flex absolute -bottom-6 right-8 xl:right-12 z-20 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#14102c]/90 backdrop-blur-xl border border-purple-500/30 shadow-xl shadow-purple-900/30"
          >
            <Smartphone className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-slate-200">
              Instalada en iPhone & Android
            </span>
          </motion.div>

          {/* The Phones Arrangement */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 relative">
            
            {/* Secondary Phone (Partner's Phone, angled slightly) */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:translate-y-8 hover:translate-y-4 hover:rotate-0 transition-transform duration-500"
            >
              <div className="text-center mb-2">
                <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Teléfono de Mateo (Pareja)
                </span>
              </div>
              <SecondaryPhoneMockup />
            </motion.div>

            {/* Primary Centerpiece Phone (Interactive, Full Power) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="z-10"
            >
              <div className="text-center mb-2">
                <span className="text-[11px] font-bold tracking-wider text-purple-300 uppercase bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
                  Prueba la app en vivo en el celular 👇
                </span>
              </div>
              <PhoneMockup />
            </motion.div>

          </div>

          <div className="text-center mt-6 text-xs text-slate-400">
            <span>💡 Haz clic en las pestañas y botones del celular para explorar el Modo Pareja, Personal y Divisas en tiempo real.</span>
          </div>

        </div>

      </div>
    </section>
  );
};
