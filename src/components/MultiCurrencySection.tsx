import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowRightLeft, Sparkles, Plane, ShieldCheck, MapPin } from 'lucide-react';
type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'COP' | 'ARS' | 'CLP' | 'PEN';

export const MultiCurrencySection: React.FC = () => {
  const [baseAmount, setBaseAmount] = useState<number>(100);
  const [baseCurrency, setBaseCurrency] = useState<CurrencyCode>('USD');

  const currencies: { code: CurrencyCode; name: string; flag: string; rateToUsd: number; symbol: string }[] = [
    { code: 'USD', name: 'Dólar Estadounidense', flag: '🇺🇸', rateToUsd: 1, symbol: '$' },
    { code: 'EUR', name: 'Euro Europeo', flag: '🇪🇺', rateToUsd: 0.92, symbol: '€' },
    { code: 'MXN', name: 'Peso Mexicano', flag: '🇲🇽', rateToUsd: 20.45, symbol: '$' },
    { code: 'COP', name: 'Peso Colombiano', flag: '🇨🇴', rateToUsd: 4180, symbol: '$' },
    { code: 'ARS', name: 'Peso Argentino', flag: '🇦🇷', rateToUsd: 1040, symbol: '$' },
    { code: 'CLP', name: 'Peso Chileno', flag: '🇨🇱', rateToUsd: 970, symbol: '$' },
    { code: 'PEN', name: 'Sol Peruano', flag: '🇵🇪', rateToUsd: 3.75, symbol: 'S/.' },
  ];

  // Convert baseAmount from baseCurrency to target
  const getConverted = (targetCode: CurrencyCode) => {
    const currentCurr = currencies.find(c => c.code === baseCurrency);
    const targetCurr = currencies.find(c => c.code === targetCode);
    if (!currentCurr || !targetCurr) return '0.00';

    // Amount in USD:
    const inUsd = baseAmount / currentCurr.rateToUsd;
    const finalVal = inUsd * targetCurr.rateToUsd;

    if (targetCode === 'COP' || targetCode === 'ARS' || targetCode === 'CLP') {
      return Math.round(finalVal).toLocaleString();
    }
    return finalVal.toFixed(2);
  };

  return (
    <section id="multi-moneda" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sin fronteras</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-5">
            Moneda automática{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              según tu región
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            ¿Viajando por el mundo o tu pareja vive en otro país? Mis Gastos detecta tu ubicación o te permite fijar la divisa de cada viaje. Se acabó hacer conversiones mentales en el restaurante.
          </p>
        </div>

        {/* Interactive Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Explanatory side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-[#141129]/80 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Plane className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white font-display">Viajes en pareja sin estrés</h3>
              </div>
              <p className="text-sm text-slate-300">
                Pagas un museo en París en euros (€) o un taxi en Cancún en pesos ($MXN). La app registra el importe original y automáticamente lo traduce a la moneda habitual de tus balances.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#141129]/80 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white font-display">Detección regional inteligente</h3>
              </div>
              <p className="text-sm text-slate-300">
                Al aterrizar en un nuevo país, la app te sugiere con un solo clic el cambio de moneda de captura sin desordenar tus finanzas consolidadas.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#141129]/80 border border-purple-500/20">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white font-display">Tasas oficiales actualizadas</h3>
              </div>
              <p className="text-sm text-slate-300">
                Conversiones precisas basadas en los tipos de cambio de mercado internacional para que nadie pague de más ni de menos.
              </p>
            </div>
          </div>

          {/* Interactive Live Converter Box */}
          <div className="lg:col-span-7 bg-[#161230] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <h4 className="text-lg font-bold text-white font-display">Simulador de Conversión Multi-Moneda</h4>
                <p className="text-xs text-slate-400">Ingresa una cantidad y mira el equivalente en tiempo real</p>
              </div>

              {/* Base Currency input */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={baseAmount}
                  onChange={(e) => setBaseAmount(parseFloat(e.target.value) || 0)}
                  className="w-24 px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white font-bold text-sm focus:outline-none focus:border-purple-400"
                />
                <select
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value as CurrencyCode)}
                  className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-white font-semibold text-sm focus:outline-none cursor-pointer"
                >
                  {currencies.map(c => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Currency cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {currencies.map((curr) => {
                const isBase = curr.code === baseCurrency;
                return (
                  <motion.div
                    key={curr.code}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setBaseCurrency(curr.code)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isBase
                        ? 'bg-purple-600/30 border-purple-400 shadow-lg shadow-purple-600/20'
                        : 'bg-black/30 border-white/5 hover:border-purple-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg">{curr.flag}</span>
                      <span className="text-xs font-bold text-slate-400">{curr.code}</span>
                    </div>

                    <p className="text-base font-extrabold text-white font-display tabular-nums">
                      {curr.symbol} {getConverted(curr.code)}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate">{curr.name}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                Haz clic en cualquier tarjeta de moneda para cambiar la moneda base de comparación.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
