import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Apple, Globe, Share2, PlusSquare, Download, Check, Sparkles, WifiOff, Bell, HardDrive } from 'lucide-react';

export const PwaInstallShowcase: React.FC = () => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');

  return (
    <section id="pwa" className="py-20 md:py-28 relative bg-[#090812]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Smartphone className="w-3.5 h-3.5 text-purple-400" />
            <span>Tecnología PWA Avanzada</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-5">
            Instálala en tu celular{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              como una app nativa
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Sin ocupar memoria, sin descargas lentas de App Store o Google Play. Un toque y vive en la pantalla de inicio de tu iPhone o Android.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-[#141129] border border-purple-500/20">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
              <HardDrive className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">0 MB de descargas pesadas</h3>
            <p className="text-sm text-slate-300">
              No desperdicia los gigabytes de tu teléfono con archivos de 200MB. Carga al instante en cualquier conexión móvil.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#141129] border border-purple-500/20">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
              <WifiOff className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">Funciona 100% Offline</h3>
            <p className="text-sm text-slate-300">
              ¿Estás en el sótano del supermercado o en un vuelo sin señal? Registra tus tickets y se sincronizan apenas recuperas red.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#141129] border border-purple-500/20">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-display mb-2">Notificaciones en tiempo real</h3>
            <p className="text-sm text-slate-300">
              Recibe avisos cuando tu pareja salde una cuenta o añada un gasto sin necesidad de abrir la aplicación.
            </p>
          </div>
        </div>

        {/* Interactive Step-by-Step Guide */}
        <div className="bg-[#141129] border border-purple-500/25 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <h4 className="text-lg font-bold text-white font-display">
              ¿Cómo instalarla en menos de 10 segundos?
            </h4>

            {/* Toggle iOS / Android */}
            <div className="inline-flex p-1 bg-black/40 rounded-xl border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setPlatform('ios')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  platform === 'ios'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Apple className="w-4 h-4" />
                <span>En iPhone (iOS)</span>
              </button>
              <button
                onClick={() => setPlatform('android')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  platform === 'android'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>En Android</span>
              </button>
            </div>
          </div>

          {platform === 'ios' ? (
            <motion.div
              key="guide-ios"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs mb-3">
                  1
                </div>
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Share2 className="w-4 h-4 text-purple-400" />
                  <span>Toca "Compartir"</span>
                </div>
                <p className="text-xs text-slate-400">
                  Abre Mis Gastos en Safari y toca el botón del cuadro con flecha hacia arriba.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs mb-3">
                  2
                </div>
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <PlusSquare className="w-4 h-4 text-purple-400" />
                  <span>"Agregar a Inicio"</span>
                </div>
                <p className="text-xs text-slate-400">
                  Desplázate hacia abajo y selecciona la opción Agregar a pantalla de inicio.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs mb-3">
                  3
                </div>
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <Check className="w-4 h-4" />
                  <span>¡Listo para usar!</span>
                </div>
                <p className="text-xs text-slate-400">
                  El icono de Mis Gastos aparecerá junto a tus demás aplicaciones favoritas.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="guide-android"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs mb-3">
                  1
                </div>
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <span>Abre en Chrome</span>
                </div>
                <p className="text-xs text-slate-400">
                  Ingresa a la página desde Google Chrome en cualquier teléfono Android.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs mb-3">
                  2
                </div>
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <Download className="w-4 h-4 text-purple-400" />
                  <span>Toca "Instalar"</span>
                </div>
                <p className="text-xs text-slate-400">
                  Acepta el banner inferior o toca los 3 puntos y selecciona "Instalar aplicación".
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs mb-3">
                  3
                </div>
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <Check className="w-4 h-4" />
                  <span>Experiencia Completa</span>
                </div>
                <p className="text-xs text-slate-400">
                  Se abre a pantalla completa como una aplicación de Android nativa.
                </p>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
