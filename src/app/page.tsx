"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CoupleVsSoloSection } from '../components/CoupleVsSoloSection';
import { InteractiveSimulator } from '../components/InteractiveSimulator';
import { MultiCurrencySection } from '../components/MultiCurrencySection';
import { PwaInstallShowcase } from '../components/PwaInstallShowcase';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';
import { AuthModal } from '../components/AuthModal';

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('register');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Evita el desajuste de hidratación mostrando una pantalla limpia hasta que monte el cliente
  }

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleScrollToSimulator = () => {
    const simulatorElement = document.getElementById('simulator');
    if (simulatorElement) {
      simulatorElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a15] text-slate-100 flex flex-col">
      <Navbar 
        onOpenAuth={handleOpenAuth} 
        onOpenDashboard={() => { window.location.href = '/dashboard'; }} 
      />
      
      <main className="flex-1">
        <Hero 
          onOpenAuth={handleOpenAuth}
          onExploreSimulator={handleScrollToSimulator}
        />
        <CoupleVsSoloSection onStartFree={() => handleOpenAuth('register')} />
        <div id="simulator">
          <InteractiveSimulator />
        </div>
        <MultiCurrencySection />
        <PwaInstallShowcase />
        <TestimonialsSection />
        <FaqSection />
      </main>


      <Footer onOpenAuth={handleOpenAuth} />

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccessLogin={() => {
          window.location.href = '/dashboard';
        }}
      />
    </div>
  );
  
}