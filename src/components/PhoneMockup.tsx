import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  User, 
  Globe, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Receipt, 
  TrendingDown,
  ShoppingBag,
  Utensils,
  Zap,
  Coffee,
  Split
} from 'lucide-react';
type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'COP' | 'ARS' | 'CLP' | 'PEN';

export const PhoneMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pareja' | 'personal' | 'moneda'>('pareja');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('Despensa orgánica');
  const [newAmount, setNewAmount] = useState('42.50');
  const [settledToast, setSettledToast] = useState(false);

  // Dynamic sample transactions inside the phone
  const [transactions, setTransactions] = useState([
    {
      id: '1',
      title: 'Supermercado Semanal',
      amount: 84.50,
      paidBy: 'Sofía',
      split: '50% cada uno',
      category: 'compras',
      time: 'Hoy, 2:15 PM'
    },
    {
      id: '2',
      title: 'Cena Trattoria Italiana',
      amount: 62.00,
      paidBy: 'Mateo',
      split: '50% cada uno',
      category: 'restaurante',
      time: 'Ayer, 9:30 PM'
    },
    {
      id: '3',
      title: 'Luz & Wi-Fi Hogar',
      amount: 78.00,
      paidBy: 'Sofía',
      split: '50% cada uno',
      category: 'servicios',
      time: 'Hace 3 días'
    }
  ]);

  const currencySymbols: Record<CurrencyCode, string> = {
    USD: '$',
    EUR: '€',
    MXN: '$MXN ',
    COP: '$COP ',
    ARS: '$ARS ',
    CLP: '$CLP ',
    PEN: 'S/. '
  };

  const currencyMultipliers: Record<CurrencyCode, number> = {
    USD: 1,
    EUR: 0.92,
    MXN: 20.45,
    COP: 4180,
    ARS: 1040,
    CLP: 970,
    PEN: 3.75
  };

  const formatAmount = (usdValue: number) => {
    const val = usdValue * currencyMultipliers[selectedCurrency];
    if (selectedCurrency === 'COP' || selectedCurrency === 'ARS' || selectedCurrency === 'CLP') {
      return `${currencySymbols[selectedCurrency]}${Math.round(val).toLocaleString()}`;
    }
    return `${currencySymbols[selectedCurrency]}${val.toFixed(2)}`;
  };

  const handleAddQuickExpense = () => {
    const amt = parseFloat(newAmount) || 25.0;
    const newTx = {
      id: Date.now().toString(),
      title: newTitle || 'Gasto compartido',
      amount: amt,
      paidBy: 'Mateo',
      split: '50% cada uno',
      category: 'compras',
      time: 'Justo ahora'
    };
    setTransactions([newTx, ...transactions]);
    setShowAddModal(false);
  };

  const handleSettleUp = () => {
    setSettledToast(true);
    setTimeout(() => {
      setSettledToast(false);
    }, 3500);
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[370px] select-none">
      {/* Ambient glow underneath the phone frame */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-fuchsia-600/25 rounded-[55px] blur-2xl -z-10 opacity-75 animate-pulse-glow" />

      {/* Hardware Chassis */}
      <div className="relative rounded-[48px] p-[10px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)] border border-slate-700/60">
        {/* Subtle bezel reflection line */}
        <div className="absolute inset-x-8 top-1 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Screen Bezel and Inner Glass Container */}
        <div className="relative overflow-hidden rounded-[38px] bg-[#0c0a1a] text-white border border-purple-500/20 h-[670px] flex flex-col">
          
          {/* Top Status Bar & Dynamic Island */}
          <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-400 z-30">
            <span>9:41</span>
            
            {/* Dynamic Island with animated status */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center px-2 gap-1.5 shadow-inner border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-medium text-slate-300 tracking-wider">EN LÍNEA</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-[10px]">5G</span>
              <div className="w-4 h-2 rounded-[2px] border border-slate-400 p-[1px] flex items-center">
                <div className="w-2.5 h-full bg-slate-300 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* App Header Inside Phone */}
          <div className="px-4 pt-1 pb-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-600/30">
                <Receipt className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-xs font-bold tracking-tight font-display text-white">Mis Gastos</span>
            </div>

            {/* Currency quick switcher pill */}
            <button
              onClick={() => {
                const codes: CurrencyCode[] = ['USD', 'EUR', 'MXN', 'COP'];
                const next = codes[(codes.indexOf(selectedCurrency) + 1) % codes.length];
                setSelectedCurrency(next);
              }}
              className="px-2 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-purple-500/20 text-[10px] font-medium text-purple-300 flex items-center gap-1 transition-colors"
              title="Cambiar divisa rápida"
            >
              <Globe className="w-2.5 h-2.5" />
              <span>{selectedCurrency}</span>
            </button>
          </div>

          {/* Interactive Screen Mode Tabs */}
          <div className="p-3 bg-black/40 border-b border-white/5">
            <div className="grid grid-cols-3 gap-1 bg-[#15122b] p-1 rounded-xl border border-white/5 text-[11px] font-medium">
              <button
                onClick={() => setActiveTab('pareja')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'pareja'
                    ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3 h-3" />
                <span>En Pareja</span>
              </button>
              <button
                onClick={() => setActiveTab('personal')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'personal'
                    ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3 h-3" />
                <span>Personal</span>
              </button>
              <button
                onClick={() => setActiveTab('moneda')}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  activeTab === 'moneda'
                    ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>Divisas</span>
              </button>
            </div>
          </div>

          {/* Phone Screen Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            
            {/* Settled toast notification */}
            <AnimatePresence>
              {settledToast && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="bg-emerald-950/80 border border-emerald-500/40 rounded-xl p-2.5 flex items-center gap-2 text-emerald-200 text-xs shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-100">¡Cuentas saldadas con éxito!</p>
                    <p className="text-[10px] text-emerald-300/80">Mateo transfirió a Sofía. Saldo en $0.00.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TAB 1: MODO PAREJA */}
            {activeTab === 'pareja' && (
              <motion.div
                key="tab-pareja"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3.5"
              >
                {/* Couple Profile Banner */}
                <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-violet-950/40 border border-purple-500/20 rounded-2xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-[#0c0a1a] flex items-center justify-center text-[11px] font-bold shadow-md">
                        S
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-[#0c0a1a] flex items-center justify-center text-[11px] font-bold shadow-md">
                        M
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1">
                        <span>Sofía & Mateo</span>
                        <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400/20" />
                      </h4>
                      <p className="text-[10px] text-slate-400">Octubre 2026 · Cuentas compartidas</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    50 / 50
                  </span>
                </div>

                {/* Balance Split Widget */}
                <div className="bg-[#15122b]/90 border border-purple-500/25 rounded-2xl p-3.5 shadow-xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] text-slate-400 font-medium">Gasto total conjunto</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      En regla
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-2xl font-black font-display tracking-tight text-white tabular-nums">
                      {formatAmount(224.50)}
                    </span>
                    <span className="text-[11px] text-slate-400">3 gastos este mes</span>
                  </div>

                  {/* Who owes who highlight */}
                  <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-300">
                        <Split className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400">Ajuste de balance</p>
                        <p className="text-xs font-bold text-purple-200">
                          Mateo le debe <span className="text-emerald-400 font-bold">{formatAmount(50.25)}</span> a Sofía
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions inside phone */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Gasto</span>
                    </button>
                    <button
                      onClick={handleSettleUp}
                      className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-purple-500/20 text-purple-200 text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Liquidar</span>
                    </button>
                  </div>
                </div>

                {/* Recent shared transactions feed */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-[11px] font-bold text-slate-300 tracking-wide">ÚLTIMOS MOVIMIENTOS</h5>
                    <span className="text-[10px] text-purple-400 font-medium">Ver todos</span>
                  </div>

                  <div className="space-y-2">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="p-2.5 rounded-xl bg-[#141128] border border-white/5 flex items-center justify-between hover:border-purple-500/20 transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-300">
                            {tx.category === 'restaurante' ? (
                              <Utensils className="w-3.5 h-3.5" />
                            ) : tx.category === 'servicios' ? (
                              <Zap className="w-3.5 h-3.5" />
                            ) : (
                              <ShoppingBag className="w-3.5 h-3.5" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-slate-100">{tx.title}</p>
                            <p className="text-[10px] text-slate-400">
                              Pagó <span className="text-purple-300 font-medium">{tx.paidBy}</span> · {tx.split}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-bold text-white tabular-nums">
                            {formatAmount(tx.amount)}
                          </p>
                          <p className="text-[9px] text-slate-400">{tx.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: MODO PERSONAL */}
            {activeTab === 'personal' && (
              <motion.div
                key="tab-personal"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3.5"
              >
                <div className="bg-[#15122b] border border-purple-500/20 rounded-2xl p-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] text-slate-400">Mi Presupuesto Mensual</span>
                    <span className="text-[10px] text-emerald-400 font-medium">58% gastado</span>
                  </div>
                  <div className="text-2xl font-black font-display text-white mb-2 tabular-nums">
                    {formatAmount(780.00)} <span className="text-xs font-normal text-slate-400">/ {formatAmount(1350.00)}</span>
                  </div>

                  {/* Progress visual bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 w-[58%] rounded-full" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">
                    Te quedan <span className="text-emerald-300 font-medium">{formatAmount(570.00)}</span> para los próximos 21 días.
                  </p>
                </div>

                {/* Categories progress */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-300">DESGLOSE POR CATEGORÍA</span>
                  
                  <div className="p-2.5 rounded-xl bg-[#141128] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                        <Utensils className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-200">Comida & Salidas</p>
                        <p className="text-[10px] text-slate-400">42% del total</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">{formatAmount(327.60)}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#141128] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center">
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-200">Compras & Ropa</p>
                        <p className="text-[10px] text-slate-400">28% del total</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">{formatAmount(218.40)}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#141128] border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center">
                        <Coffee className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-200">Cafés & Snacks</p>
                        <p className="text-[10px] text-slate-400">14% del total</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">{formatAmount(109.20)}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: MODO MULTI-MONEDA */}
            {activeTab === 'moneda' && (
              <motion.div
                key="tab-moneda"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3.5"
              >
                <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-purple-500/20 rounded-2xl p-3.5">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-purple-300" />
                    <span className="text-xs font-bold text-white">Conversión de Moneda en Vivo</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mb-3">
                    Registras en tu moneda local y Mis Gastos actualiza automáticamente el saldo en pareja.
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(['USD', 'EUR', 'MXN', 'COP'] as CurrencyCode[]).map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCurrency(c)}
                        className={`p-2 rounded-xl border flex flex-col items-start transition-all ${
                          selectedCurrency === c
                            ? 'bg-purple-600/40 border-purple-400 text-white'
                            : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="text-[10px] font-bold">{c}</span>
                        <span className="text-xs font-black mt-0.5 text-purple-200 tabular-nums">
                          {formatAmount(50)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#141128] border border-white/5 rounded-xl space-y-2">
                  <span className="text-[10px] font-bold text-slate-400">TIPO DE CAMBIO OFICIAL</span>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span>1 USD =</span>
                      <span className="font-semibold text-white">20.45 MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 USD =</span>
                      <span className="font-semibold text-white">0.92 EUR</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 USD =</span>
                      <span className="font-semibold text-white">4,180 COP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* Interactive Modal to add expense directly inside phone */}
          <AnimatePresence>
            {showAddModal && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="absolute inset-x-0 bottom-0 bg-[#161230] border-t border-purple-500/30 rounded-t-[28px] p-4 shadow-2xl z-40 space-y-3"
              >
                <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-1" />
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-bold text-white">Nuevo gasto compartido</h5>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    Cerrar
                  </button>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Concepto</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Monto ({selectedCurrency})</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <button
                  onClick={handleAddQuickExpense}
                  className="w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-xs font-bold text-white shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-95 transition-all"
                >
                  Confirmar y dividir 50/50
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phone Bottom Home Indicator */}
          <div className="p-2 bg-black/60 flex justify-center border-t border-white/5">
            <div className="w-28 h-1 bg-slate-500/40 rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
};
