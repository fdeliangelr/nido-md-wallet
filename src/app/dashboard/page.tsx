"use client";

import React from 'react';
import { Dashboard } from '../../components/Dashboard';

export default function DashboardPageRoute() {
  const handleLogout = () => {
    // Redirige de regreso a la landing page al cerrar sesión
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen bg-[#0b0a15] text-slate-100">
      <Dashboard onLogout={handleLogout} />
    </main>
  );
}