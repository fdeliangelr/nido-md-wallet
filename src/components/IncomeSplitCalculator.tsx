import React, { useState } from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';
import { CurrencyCode, CoupleSettings } from '../types';

interface IncomeSplitCalculatorProps {
  coupleSettings: CoupleSettings;
  currency: CurrencyCode;
  formatAmount: (amount: number) => string;
  isProportionalActive: boolean;
  setIsProportionalActive: (active: boolean) => void;
  partner1Income: number;
  setPartner1Income: (income: number) => void;
  partner2Income: number;
  setPartner2Income: (income: number) => void;
}

export const IncomeSplitCalculator: React.FC<IncomeSplitCalculatorProps> = ({
  coupleSettings,
  currency,
  formatAmount,
  isProportionalActive,
  setIsProportionalActive,
  partner1Income,
  setPartner1Income,
  partner2Income,
  setPartner2Income,
}) => {
  // Cálculo de proporciones según ingresos
  const totalIncome = (partner1Income || 0) + (partner2Income || 0);
  const partner1IncomeShare = totalIncome > 0 ? partner1Income / totalIncome : 0.5;
  const partner2IncomeShare = totalIncome > 0 ? partner2Income / totalIncome : 0.5;

  return (
    <div className="bg-[#14102c] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">
              Calculadora de Aporte Justo por Ingresos
            </h3>
            <p className="text-xs text-slate-400">
              Divide los gastos de forma equitativa según lo que gana cada uno
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsProportionalActive(!isProportionalActive)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            isProportionalActive
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          {isProportionalActive ? '✓ Proporcional Activo' : 'Activar Proporcional'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Ingreso Partner 1 */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Sueldo de {coupleSettings.partner1.name} ({currency})
          </label>
          <input
            type="number"
            value={partner1Income}
            onChange={(e) => setPartner1Income(parseFloat(e.target.value) || 0)}
            className="w-full text-sm font-bold px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400 tabular-nums"
          />
          <p className="text-[11px] text-purple-300 mt-2 font-medium">
            Aporte sugerido: <strong>{(partner1IncomeShare * 100).toFixed(1)}%</strong>
          </p>
        </div>

        {/* Ingreso Partner 2 */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
          <label className="text-xs font-semibold text-slate-300 block mb-1">
            Sueldo de {coupleSettings.partner2.name} ({currency})
          </label>
          <input
            type="number"
            value={partner2Income}
            onChange={(e) => setPartner2Income(parseFloat(e.target.value) || 0)}
            className="w-full text-sm font-bold px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400 tabular-nums"
          />
          <p className="text-[11px] text-blue-300 mt-2 font-medium">
            Aporte sugerido: <strong>{(partner2IncomeShare * 100).toFixed(1)}%</strong>
          </p>
        </div>
      </div>

      {isProportionalActive && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
          <span className="text-emerald-200">
            💡 <strong>Modo Proporcional Aplicado:</strong> Los gastos se dividirán en un{' '}
            {(partner1IncomeShare * 100).toFixed(0)}% para {coupleSettings.partner1.name} y un{' '}
            {(partner2IncomeShare * 100).toFixed(0)}% para {coupleSettings.partner2.name} en lugar del
            50/50 clásico.
          </span>
        </div>
      )}
    </div>
  );
};