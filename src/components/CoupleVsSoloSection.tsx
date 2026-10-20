import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Heart, User, Check, Sparkles, SlidersHorizontal, Calculator, ArrowRight } from 'lucide-react';

interface CoupleVsSoloSectionProps {
  onStartFree: () => void;
}

export const CoupleVsSoloSection: React.FC<CoupleVsSoloSectionProps> = ({ onStartFree }) => {
  const [activeMode, setActiveMode] = useState<'pareja' | 'personal'>('pareja');
  
  // Interactive Split Calculator state
  const [expenseTotal, setExpenseTotal] = useState<number>(180);
  const [partner1Ratio, setPartner1Ratio] = useState<number>(50); // percentage

  const partner2Ratio = 100 - partner1Ratio;
  const partner1Pays = ((expenseTotal * partner1Ratio) / 100).toFixed(2);
  const partner2Pays = ((expenseTotal * partner2Ratio) / 100).toFixed(2);

  return (
    <section id="modo-pareja" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>Diseñado para tu vida real</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-5">
            Cuentas claras,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              relaciones sanas
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Ya sea que compartas alquiler y despensa con tu pareja, o quieras organizar tus ingresos personales, Mis Gastos se adapta a tu dinámica sin fórmulas complicadas.
          </p>
        </div>

        {/* Interactive Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#141129] border border-purple-500/25 shadow-xl">
            <button
              onClick={() => setActiveMode('pareja')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeMode === 'pareja'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4 text-pink-300" />
              <span>Modo Pareja (Compartido)</span>
            </button>

            <button
              onClick={() => setActiveMode('personal')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeMode === 'personal'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-purple-300" />
              <span>Modo Personal (Individual)</span>
            </button>
          </div>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Benefits & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            {activeMode === 'pareja' ? (
              <motion.div
                key="pareja-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-3xl bg-[#131028]/80 border border-purple-500/20 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                      01
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      División 50/50 o Proporcional al Ingreso
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Si uno gana más que el otro, pueden definir porcentajes justos (por ejemplo, 60% y 40%) o mantener la división mitad y mitad. Mis Gastos calcula automáticamente la cuota de cada uno.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#131028]/80 border border-purple-500/20 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                      02
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Siempre saben quién debe a quién
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Olvídate de hacer cuentas mentales a fin de mes. La app compensa los gastos mutuos y muestra un saldo neto único. Con un solo botón de "Liquidar", quedan en ceros.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#131028]/80 border border-purple-500/20 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                      03
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Gastos conjuntos y privados en el mismo lugar
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    No todo tiene que ser compartido: puedes marcar compras como personales con un toque para proteger tu privacidad y tus sorpresas o regalos.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="personal-info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-3xl bg-[#131028]/80 border border-purple-500/20 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                      01
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Presupuestos por categorías inteligentes
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Define límites mensuales para restaurantes, salidas, servicios y transporte. Recibe alertas amigables cuando estés cerca de sobrepasar tu meta mensual.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#131028]/80 border border-purple-500/20 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                      02
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Detección de gastos hormiga y fugas
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Visualiza exactamente en qué se va tu dinero cada semana. Los pequeños cafés y suscripciones olvidadas quedan al descubierto para acelerar tu ahorro.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#131028]/80 border border-purple-500/20 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      03
                    </div>
                    <h3 className="text-xl font-bold text-white font-display">
                      Transición a Modo Pareja cuando lo desees
                    </h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Comienza tú solo hoy, y cuando te mudes con tu pareja o planifiquen un viaje juntos, vincúlate en 10 segundos sin perder tu historial previo.
                  </p>
                </div>
              </motion.div>
            )}

            <div className="pt-2">
              <button
                onClick={onStartFree}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                <span>Crear cuenta y comenzar gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Live Split Calculator Widget */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181335] to-[#120f26] border border-purple-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center border border-purple-400/30">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-display">
                      Calculadora Interactiva de División
                    </h4>
                    <p className="text-xs text-slate-400">Prueba cómo se divide un gasto en tiempo real</p>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  En tiempo real
                </span>
              </div>

              {/* Expense Amount Selector */}
              <div className="mb-6 space-y-2">
                <label className="text-xs font-semibold text-slate-300 flex justify-between">
                  <span>Monto del Gasto (Ejemplo: Compra del Súper o Cena):</span>
                  <span className="text-purple-300 font-bold">${expenseTotal} USD</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[60, 120, 180, 250].map((val) => (
                    <button
                      key={val}
                      onClick={() => setExpenseTotal(val)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        expenseTotal === val
                          ? 'bg-purple-600 border-purple-400 text-white shadow-md shadow-purple-600/30'
                          : 'bg-black/30 border-white/10 text-slate-300 hover:border-purple-500/40'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Split Ratio */}
              <div className="mb-6 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-slate-300">
                    Proporción: <span className="text-purple-300 font-bold">{partner1Ratio}% Sofía</span> /{' '}
                    <span className="text-indigo-300 font-bold">{partner2Ratio}% Mateo</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPartner1Ratio(50)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                    >
                      50 / 50
                    </button>
                    <button
                      onClick={() => setPartner1Ratio(60)}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                    >
                      60 / 40
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={partner1Ratio}
                  onChange={(e) => setPartner1Ratio(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Sofía aporta más</span>
                  <span>Mitad y mitad</span>
                  <span>Mateo aporta más</span>
                </div>
              </div>

              {/* Results Cards */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 mx-auto mb-1 flex items-center justify-center text-xs font-bold text-white">
                    S
                  </div>
                  <p className="text-xs font-medium text-slate-300">Parte de Sofía ({partner1Ratio}%)</p>
                  <p className="text-xl font-extrabold text-white font-display mt-1 tabular-nums">
                    ${partner1Pays}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-center">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-1 flex items-center justify-center text-xs font-bold text-white">
                    M
                  </div>
                  <p className="text-xs font-medium text-slate-300">Parte de Mateo ({partner2Ratio}%)</p>
                  <p className="text-xl font-extrabold text-white font-display mt-1 tabular-nums">
                    ${partner2Pays}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Si Sofía paga la factura completa de <strong>${expenseTotal}</strong> con su tarjeta, Mis Gastos registra automáticamente que Mateo le adeuda exactamente <strong>${partner2Pays}</strong>.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
