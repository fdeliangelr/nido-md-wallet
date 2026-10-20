import React from 'react';
import { Wallet, ArrowRight, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
  return (
    <footer className="relative border-t border-purple-500/15 bg-[#0a0815] text-slate-400 text-sm overflow-hidden">
      {/* Conversion Banner Section before bottom links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#161230] to-indigo-950/60 border border-purple-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

          <h3 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight mb-4 max-w-2xl mx-auto">
            Toma el control de tus finanzas hoy mismo
          </h3>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Únete a miles de personas y parejas que ya no discuten por dinero ni pierden tiempo con hojas de cálculo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenAuth('register')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-purple-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Comenzar gratis ahora</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-semibold text-base transition-all cursor-pointer"
            >
              Iniciar sesión existente
            </button>
          </div>
        </div>

        {/* Footer Navigation & Wordmark (Adheres strictly to Top Bar / Footer rules) */}
        <div className="mt-16 pt-8 border-t border-purple-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Wordmark */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white font-display">Mis Gastos</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#modo-pareja" className="hover:text-white transition-colors">Modo Pareja</a>
            <a href="#multi-moneda" className="hover:text-white transition-colors">Multi-Moneda</a>
            <a href="#simulador" className="hover:text-white transition-colors">Simulador</a>
            <a href="#pwa" className="hover:text-white transition-colors">Instalar PWA</a>
            <a href="#testimonios" className="hover:text-white transition-colors">Opiniones</a>
          </div>

          {/* Legal / Copyright */}
          <div className="text-xs text-slate-500 text-center md:text-right">
            <span>© 2026 Mis Gastos. Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
