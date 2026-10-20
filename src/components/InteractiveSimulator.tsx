import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlusCircle, 
  ShoppingCart, 
  UtensilsCrossed, 
  Home, 
  Film, 
  Car, 
  Coffee, 
  CheckCircle, 
  Trash2, 
  Receipt,
  Heart,
  TrendingUp,
  Sparkles
} from 'lucide-react';
type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'COP' | 'ARS' | 'CLP' | 'PEN';

interface SimulatedItem {
  id: string;
  concept: string;
  category: string;
  amount: number;
  currency: CurrencyCode;
  paidBy: 'Yo' | 'Pareja';
  mode: 'personal' | 'pareja';
  timestamp: string;
}

export const InteractiveSimulator: React.FC = () => {
  const [concept, setConcept] = useState('Despensa del súper');
  const [amount, setAmount] = useState('65.00');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [category, setCategory] = useState('supermercado');
  const [mode, setMode] = useState<'pareja' | 'personal'>('pareja');
  const [paidBy, setPaidBy] = useState<'Yo' | 'Pareja'>('Yo');
  const [successNotice, setSuccessNotice] = useState(false);

  const [history, setHistory] = useState<SimulatedItem[]>([
    {
      id: 'sim-1',
      concept: 'Cena de Aniversario',
      category: 'restaurante',
      amount: 85.0,
      currency: 'USD',
      paidBy: 'Yo',
      mode: 'pareja',
      timestamp: 'Hace 5 minutos'
    },
    {
      id: 'sim-2',
      concept: 'Factura de Internet',
      category: 'hogar',
      amount: 45.0,
      currency: 'USD',
      paidBy: 'Pareja',
      mode: 'pareja',
      timestamp: 'Ayer'
    }
  ]);

  const categories = [
    { id: 'supermercado', label: 'Súper', icon: ShoppingCart },
    { id: 'restaurante', label: 'Cenas', icon: UtensilsCrossed },
    { id: 'hogar', label: 'Hogar', icon: Home },
    { id: 'ocio', label: 'Ocio', icon: Film },
    { id: 'transporte', label: 'Transporte', icon: Car },
    { id: 'cafe', label: 'Café', icon: Coffee },
  ];

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    const newItem: SimulatedItem = {
      id: Date.now().toString(),
      concept: concept.trim() || 'Gasto registrado',
      category,
      amount: val,
      currency,
      paidBy,
      mode,
      timestamp: 'Justo ahora'
    };

    setHistory([newItem, ...history]);
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3000);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  // Calculations
  const totalAmount = history.reduce((acc, item) => acc + item.amount, 0);
  
  // Calculate pair balance: how much Yo paid vs Pareja paid for shared items
  const sharedItems = history.filter(i => i.mode === 'pareja');
  const paidByYo = sharedItems.filter(i => i.paidBy === 'Yo').reduce((a, b) => a + b.amount, 0);
  const paidByPareja = sharedItems.filter(i => i.paidBy === 'Pareja').reduce((a, b) => a + b.amount, 0);
  
  // Balance: each should have paid half of total shared
  const halfShared = (paidByYo + paidByPareja) / 2;
  const balanceDifference = paidByYo - halfShared; // positive: pareja owes yo; negative: yo owes pareja

  return (
    <section id="simulador" className="py-20 md:py-28 relative bg-[#090812]">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-900/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/30 border border-purple-500/25 text-purple-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Experiencia Interactiva</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-4">
            Pruébalo tú mismo en vivo
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Registra un gasto simulado aquí abajo y observa cómo la aplicación recalcula los saldos y cuentas compartidas al milisegundo.
          </p>
        </div>

        {/* Live Simulator Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-5 bg-[#141129] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2 mb-5">
              <Receipt className="w-5 h-5 text-purple-400" />
              <span>Registrar Movimiento</span>
            </h3>

            <form onSubmit={handleAddExpense} className="space-y-4">
              
              {/* Concept input */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Concepto o Descripción
                </label>
                <input
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="Ej: Despensa de la semana"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
                  required
                />
              </div>

              {/* Amount and Currency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Monto
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white font-display text-base font-bold focus:outline-none focus:border-purple-400 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    Moneda
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-400 transition-colors cursor-pointer"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="MXN">MXN ($)</option>
                    <option value="COP">COP ($)</option>
                    <option value="ARS">ARS ($)</option>
                    <option value="PEN">PEN (S/.)</option>
                  </select>
                </div>
              </div>

              {/* Category picker */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Categoría
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setCategory(cat.id)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-xs transition-all cursor-pointer ${
                          category === cat.id
                            ? 'bg-purple-600/30 border-purple-400 text-white font-semibold'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-purple-300" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mode: Shared vs Personal */}
              <div className="p-3 rounded-2xl bg-black/30 border border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Tipo de Cuenta</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setMode('pareja')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        mode === 'pareja'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      En Pareja (50/50)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('personal')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        mode === 'personal'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      Personal
                    </button>
                  </div>
                </div>

                {mode === 'pareja' && (
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-slate-400">¿Quién pagó la cuenta?</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setPaidBy('Yo')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          paidBy === 'Yo' ? 'bg-pink-600/30 border border-pink-500/40 text-pink-200' : 'text-slate-400'
                        }`}
                      >
                        Yo
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaidBy('Pareja')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          paidBy === 'Pareja' ? 'bg-blue-600/30 border border-blue-500/40 text-blue-200' : 'text-slate-400'
                        }`}
                      >
                        Mi Pareja
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Registrar Gasto Simulado</span>
              </button>
            </form>

            <AnimatePresence>
              {successNotice && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-xs font-medium"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>¡Gasto registrado! Las cuentas se han recalculado en el visor.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Live Feed & Balance Side */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Real-time Balance Box */}
            <div className="bg-[#141129] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  ESTADO EN TIEMPO REAL
                </span>
                {history.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Reiniciar simulador</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-xs text-slate-400 block mb-1">Gasto total acumulado</span>
                  <p className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums">
                    ${totalAmount.toFixed(2)} <span className="text-xs font-normal text-slate-400">USD</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">{history.length} movimientos registrados</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30">
                  <span className="text-xs text-purple-300 font-semibold block mb-1">
                    Balance Compartido (Quién debe a quién)
                  </span>
                  {balanceDifference === 0 ? (
                    <p className="text-xl font-black text-emerald-400 font-display">
                      ¡Cuentas al 100% equilibradas!
                    </p>
                  ) : balanceDifference > 0 ? (
                    <div>
                      <p className="text-xl font-black text-purple-200 font-display tabular-nums">
                        Tu pareja te debe ${balanceDifference.toFixed(2)}
                      </p>
                      <p className="text-[11px] text-emerald-400">Tú has pagado más en gastos conjuntos</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-black text-pink-300 font-display tabular-nums">
                        Tú le debes ${Math.abs(balanceDifference).toFixed(2)} a tu pareja
                      </p>
                      <p className="text-[11px] text-slate-400">Tu pareja ha pagado más en gastos conjuntos</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feed of entries */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 block">
                  HISTORIAL DEL SIMULADOR ({history.length})
                </span>

                {history.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl text-slate-500 text-sm">
                    No hay gastos aún. Agrega uno usando el formulario de la izquierda.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                    {history.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between hover:border-purple-500/20 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-purple-900/30 border border-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
                            {item.concept.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{item.concept}</p>
                            <p className="text-xs text-slate-400">
                              {item.mode === 'pareja' ? (
                                <span>
                                  Dividido 50/50 · Pagó <strong>{item.paidBy}</strong>
                                </span>
                              ) : (
                                <span>Gasto Personal</span>
                              )}
                              {' · '}{item.timestamp}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-bold text-white tabular-nums">
                            ${item.amount.toFixed(2)} {item.currency}
                          </p>
                          {item.mode === 'pareja' && (
                            <p className="text-[10px] text-purple-400 font-medium">
                              ${(item.amount / 2).toFixed(2)} c/u
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
