import React, { useState } from 'react';
import { Wallet, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
  onOpenDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenDashboard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0b0a15]/80 border-b border-purple-500/10 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element + signature wallet emblem) */}
        <a href="#" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/40 via-indigo-600/30 to-violet-900/50 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-900/20 group-hover:border-purple-400/50 group-hover:scale-105 transition-all duration-300">
            <Wallet className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-display group-hover:text-purple-200 transition-colors">
            Mis Gastos
          </span>
        </a>

        {/* Zone 2: Navigation Links (Text with subtle hover state) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#modo-pareja" className="hover:text-white transition-colors">
            Modo Pareja
          </a>
          <a href="#mascotas" className="hover:text-pink-300 transition-colors flex items-center gap-1">
            <span>Mascotas</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-bold">🐾</span>
          </a>
          <a href="#multi-moneda" className="hover:text-white transition-colors">
            Multi-Moneda
          </a>
          <a href="#simulador" className="hover:text-white transition-colors">
            Simulador
          </a>
          <a href="#pwa" className="hover:text-white transition-colors">
            Instalar App
          </a>
          <a href="#testimonios" className="hover:text-white transition-colors">
            Opiniones
          </a>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenDashboard}
            className="px-3.5 py-1.5 text-xs font-bold text-purple-200 bg-purple-950/60 hover:bg-purple-900/60 border border-purple-500/30 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-sm"
          >
            <span>📱 Abrir App</span>
          </button>
          <button
            onClick={() => onOpenAuth('login')}
            className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5 whitespace-nowrap"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => onOpenAuth('register')}
            className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
          >
            <span>Registrarse</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenAuth('register')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-purple-600 rounded-lg shadow-md shadow-purple-600/30 whitespace-nowrap"
          >
            Empezar
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-500/20 bg-[#0f0d23]/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-base font-medium text-slate-200">
            <a
              href="#modo-pareja"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-300 transition-colors"
            >
              Modo Pareja
            </a>
            <a
              href="#mascotas"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-pink-300 transition-colors flex items-center justify-between"
            >
              <span>Mascotas</span>
              <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full">🐾 Nuevo</span>
            </a>
            <a
              href="#multi-moneda"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-300 transition-colors"
            >
              Multi-Moneda
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-300 transition-colors"
            >
              Simulador en Vivo
            </a>
            <a
              href="#pwa"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-300 transition-colors"
            >
              Instalar App
            </a>
            <a
              href="#testimonios"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-purple-300 transition-colors"
            >
              Opiniones
            </a>
          </div>

          <div className="pt-4 border-t border-purple-500/20 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full py-2.5 text-sm font-bold text-center text-purple-200 bg-purple-950/80 rounded-xl border border-purple-500/30 flex items-center justify-center gap-2"
            >
              <span>📱 Abrir Dashboard (App)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 text-sm font-medium text-center text-slate-200 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('register');
              }}
              className="w-full py-2.5 text-sm font-semibold text-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-600/30"
            >
              Registrarse gratis
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
