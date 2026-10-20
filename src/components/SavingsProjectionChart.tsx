import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { TrendingUp, Sparkles, PiggyBank, Calendar, DollarSign, ShieldAlert } from 'lucide-react';
import { CurrencyCode } from '../types';

interface SavingsProjectionChartProps {
  currentExpensesTotal: number;
  currency: CurrencyCode;
  mode: 'pareja' | 'personal';
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  currencySymbol: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, currencySymbol }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#14102c]/95 border border-purple-500/30 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md text-xs space-y-2">
        <p className="font-bold text-white border-b border-white/10 pb-1 text-sm font-display">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-300">{entry.name}:</span>
            </div>
            <span className="font-extrabold text-white tabular-nums">
              {currencySymbol}{entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const SavingsProjectionChart: React.FC<SavingsProjectionChartProps> = ({
  currentExpensesTotal,
  currency,
  mode
}) => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(2000);
  const [timeframeMonths, setTimeframeMonths] = useState<6 | 12>(6);

  const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    EUR: '€',
    MXN: '$',
    COP: '$',
    ARS: '$',
    CLP: '$',
    PEN: 'S/.'
  };

  const currSymbol = currencySymbols[currency] || '$';

  // Calculate projected data
  const chartData = useMemo(() => {
    // Baseline simulated monthly expenses:
    // If user has entered multiple test expenses, we extrapolate to a realistic monthly run-rate
    const baseExpenseSample = currentExpensesTotal > 0 ? currentExpensesTotal : 120;
    // Estimated monthly expense based on sample:
    const estimatedMonthlyExpenses = Math.min(
      monthlyIncome * 0.9,
      Math.max(300, baseExpenseSample * 3.5)
    );

    // With "Mis Gastos", users typically cut duplicate expenses and detect leaks (approx 15% optimization)
    const monthlyExpensesWithApp = estimatedMonthlyExpenses * 0.85;

    const monthlySavingsTrad = Math.max(50, monthlyIncome - estimatedMonthlyExpenses);
    const monthlySavingsWithApp = Math.max(100, monthlyIncome - monthlyExpensesWithApp);

    const monthNames = [
      'Mes 1', 'Mes 2', 'Mes 3', 'Mes 4', 'Mes 5', 'Mes 6',
      'Mes 7', 'Mes 8', 'Mes 9', 'Mes 10', 'Mes 11', 'Mes 12'
    ];

    const data = [];
    let cumulativeWithApp = 0;
    let cumulativeTrad = 0;

    for (let i = 0; i < timeframeMonths; i++) {
      cumulativeWithApp += Math.round(monthlySavingsWithApp);
      cumulativeTrad += Math.round(monthlySavingsTrad);

      data.push({
        month: monthNames[i],
        'Con Mis Gastos': cumulativeWithApp,
        'Sin Control': cumulativeTrad,
        gastoMensual: Math.round(monthlyExpensesWithApp)
      });
    }

    return {
      points: data,
      monthlySavingsWithApp: Math.round(monthlySavingsWithApp),
      monthlySavingsTrad: Math.round(monthlySavingsTrad),
      totalProjectedWithApp: cumulativeWithApp,
      totalProjectedTrad: cumulativeTrad,
      extraSavings: cumulativeWithApp - cumulativeTrad
    };
  }, [currentExpensesTotal, monthlyIncome, timeframeMonths]);

  return (
    <div className="mt-8 bg-[#15112e] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">
              Proyección de Ahorro con Datos del Simulador
            </h4>
          </div>
          <p className="text-xs text-slate-300">
            Gráfico de proyección mensual basado en tus {currentExpensesTotal > 0 ? `gastos simulados (${currSymbol}${currentExpensesTotal.toFixed(2)})` : 'gastos'} y tu presupuesto estimado.
          </p>
        </div>

        {/* Controls: Timeframe & Preset Income */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Income selector */}
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs">
            <span className="text-slate-400">Ingreso/Mes:</span>
            <select
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value={1200} className="bg-[#141129]">{currSymbol}1,200</option>
              <option value={2000} className="bg-[#141129]">{currSymbol}2,000</option>
              <option value={3200} className="bg-[#141129]">{currSymbol}3,200</option>
              <option value={5000} className="bg-[#141129]">{currSymbol}5,000</option>
            </select>
          </div>

          {/* Timeframe switch */}
          <div className="inline-flex p-1 bg-black/40 rounded-xl border border-white/10 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setTimeframeMonths(6)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                timeframeMonths === 6
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              6 Meses
            </button>
            <button
              type="button"
              onClick={() => setTimeframeMonths(12)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                timeframeMonths === 12
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              12 Meses
            </button>
          </div>
        </div>
      </div>

      {/* Key Metric Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Ahorro mensual estimado</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <p className="text-xl font-black text-purple-300 font-display tabular-nums">
            {currSymbol}{chartData.monthlySavingsWithApp.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">/mes</span>
          </p>
          <p className="text-[10px] text-emerald-400 mt-0.5">
            +15% optimizado vs sin app
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/20">
          <div className="flex items-center justify-between text-[11px] text-purple-300 mb-1">
            <span>Total proyectado ({timeframeMonths}m)</span>
            <PiggyBank className="w-3.5 h-3.5 text-purple-300" />
          </div>
          <p className="text-xl font-black text-white font-display tabular-nums">
            {currSymbol}{chartData.totalProjectedWithApp.toLocaleString()}
          </p>
          <p className="text-[10px] text-slate-300 mt-0.5">
            Acumulado con cuentas al día
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/20">
          <div className="flex items-center justify-between text-[11px] text-emerald-300 mb-1">
            <span>Ahorro extra generado</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
              +{currSymbol}{chartData.extraSavings.toLocaleString()}
            </span>
          </div>
          <p className="text-xl font-black text-emerald-400 font-display tabular-nums">
            +{currSymbol}{chartData.extraSavings.toLocaleString()}
          </p>
          <p className="text-[10px] text-emerald-300/80 mt-0.5">
            Por eliminar gastos duplicados y hormiga
          </p>
        </div>
      </div>

      {/* Recharts Line Chart */}
      <div className="w-full h-[290px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData.points}
            margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.08)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
              tickFormatter={(val) => `${currSymbol}${val}`}
            />
            <Tooltip
              content={<CustomTooltip currencySymbol={currSymbol} />}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px' }}
            />
            <Line
              type="monotone"
              dataKey="Con Mis Gastos"
              stroke="#c084fc"
              strokeWidth={3}
              dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#f472b6', stroke: '#ffffff', strokeWidth: 2 }}
              name="Con Mis Gastos"
            />
            <Line
              type="monotone"
              dataKey="Sin Control"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ fill: '#64748b', strokeWidth: 1, r: 3 }}
              activeDot={{ r: 5, fill: '#94a3b8' }}
              name="Sin Control (Tradicional)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer hint */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
        <span>
          💡 Añade más gastos en el simulador superior para recalcular la curva de ahorro dinámicamente.
        </span>
        <span className="text-purple-300 font-medium hidden sm:inline">
          {mode === 'pareja' ? 'Modo Pareja: Dividiendo 50/50' : 'Modo Personal'}
        </span>
      </div>
    </div>
  );
};
