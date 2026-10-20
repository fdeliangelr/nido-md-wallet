import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Plus,
  Sparkles,
  CheckCircle2,
  Trash2,
  DollarSign,
  PieChart,
  ShieldAlert,
  X,
  Stethoscope,
  ShoppingBag,
  Sparkle,
  Bath,
  Smile,
  AlertCircle,
  Settings
} from 'lucide-react';
import { Pet, PetExpense, PetExpenseCategory, PetSpecies } from '../types';
import { PetConfigModal } from '../components/PetConfigModal';

export const PetsSection: React.FC = () => {
  // Pre-configured pets with localStorage sync
  const [pets, setPets] = useState<Pet[]>(() => {
    try {
      const saved = localStorage.getItem('mis_gastos_pets');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [
      {
        id: 'pet-1',
        name: 'Milo',
        species: 'perro',
        breed: 'Golden Retriever (3 años)',
        colorTheme: 'from-amber-500 to-orange-600',
        avatarEmoji: '🐕',
        monthlyBudget: 160,
        spentThisMonth: 104.50
      },
      {
        id: 'pet-2',
        name: 'Luna',
        species: 'gato',
        breed: 'Siamés (2 años)',
        colorTheme: 'from-purple-500 to-indigo-600',
        avatarEmoji: '🐈',
        monthlyBudget: 90,
        spentThisMonth: 52.00
      }
    ];
  });

  const [selectedPetId, setSelectedPetId] = useState<string>(() => pets[0]?.id || 'pet-1');
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedPetForConfig, setSelectedPetForConfig] = useState<string | undefined>(undefined);
  
  // Pet Expenses List
  const [expenses, setExpenses] = useState<PetExpense[]>([
    {
      id: 'pe-1',
      petId: 'pet-1',
      petName: 'Milo',
      concept: 'Alimento Premium 15kg + Snacks dentales',
      category: 'comida',
      amount: 68.50,
      currency: 'USD',
      paidBy: 'Sofía',
      split: '50_50',
      date: 'Hoy, 11:20 AM'
    },
    {
      id: 'pe-2',
      petId: 'pet-1',
      petName: 'Milo',
      concept: 'Baño medicado & corte de uñas',
      category: 'higiene',
      amount: 36.00,
      currency: 'USD',
      paidBy: 'Mateo',
      split: '50_50',
      date: 'Hace 3 días'
    },
    {
      id: 'pe-3',
      petId: 'pet-2',
      petName: 'Luna',
      concept: 'Arena aglomerante lavanda 20L',
      category: 'higiene',
      amount: 22.00,
      currency: 'USD',
      paidBy: 'Sofía',
      split: '50_50',
      date: 'Ayer'
    },
    {
      id: 'pe-4',
      petId: 'pet-2',
      petName: 'Luna',
      concept: 'Alimento húmedo en latas (pack x12)',
      category: 'comida',
      amount: 30.00,
      currency: 'USD',
      paidBy: 'Mateo',
      split: '50_50',
      date: 'Hace 4 días'
    }
  ]);



  // New Expense Form State
  const [newExpenseConcept, setNewExpenseConcept] = useState('Consulta veterinaria');
  const [newExpenseAmount, setNewExpenseAmount] = useState('45.00');
  const [newExpenseCategory, setNewExpenseCategory] = useState<PetExpenseCategory>('veterinario');
  const [newExpensePaidBy, setNewExpensePaidBy] = useState<'Sofía' | 'Mateo' | 'Yo'>('Sofía');
  const [expenseSuccessToast, setExpenseSuccessToast] = useState(false);

  const categoryIcons: Record<PetExpenseCategory, { label: string; icon: string }> = {
    comida: { label: 'Comida & Snacks', icon: '🥩' },
    veterinario: { label: 'Veterinario & Vacunas', icon: '🩺' },
    higiene: { label: 'Higiene & Necesidades', icon: '🛁' },
    juguetes: { label: 'Juguetes & Accesorios', icon: '🎾' },
    medicinas: { label: 'Medicinas & Suplementos', icon: '💊' },
    guarderia: { label: 'Guardería & Paseador', icon: '🏨' }
  };

  const handleSavePet = (petToSave: Pet) => {
    const exists = pets.some(p => p.id === petToSave.id);
    let updatedPets: Pet[];
    if (exists) {
      updatedPets = pets.map(p => (p.id === petToSave.id ? petToSave : p));
      setExpenses(prev => prev.map(e => e.petId === petToSave.id ? { ...e, petName: petToSave.name } : e));
    } else {
      updatedPets = [...pets, petToSave];
      setSelectedPetId(petToSave.id);
    }
    setPets(updatedPets);
    try {
      localStorage.setItem('mis_gastos_pets', JSON.stringify(updatedPets));
    } catch (e) {}
  };

  const handleDeletePet = (petId: string) => {
    const updatedPets = pets.filter(p => p.id !== petId);
    setPets(updatedPets);
    if (selectedPetId === petId) {
      setSelectedPetId(updatedPets[0]?.id || '');
    }
    try {
      localStorage.setItem('mis_gastos_pets', JSON.stringify(updatedPets));
    } catch (e) {}
  };

  const handleAddPetExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(newExpenseAmount);
    if (isNaN(amt) || amt <= 0) return;

    const currentPet = pets.find(p => p.id === selectedPetId) || pets[0];
    if (!currentPet) return;

    const newEx: PetExpense = {
      id: `pe-${Date.now()}`,
      petId: currentPet.id,
      petName: currentPet.name,
      concept: newExpenseConcept.trim() || 'Gasto de mascota',
      category: newExpenseCategory,
      amount: amt,
      currency: 'USD',
      paidBy: newExpensePaidBy,
      split: '50_50',
      date: 'Justo ahora'
    };

    setExpenses([newEx, ...expenses]);

    // Update pet's spent this month
    setPets(pets.map(p => {
      if (p.id === currentPet.id) {
        return { ...p, spentThisMonth: p.spentThisMonth + amt };
      }
      return p;
    }));

    setExpenseSuccessToast(true);
    setTimeout(() => setExpenseSuccessToast(false), 3000);
  };

  const currentPet = pets.find(p => p.id === selectedPetId) || pets[0];
  const petExpenses = currentPet ? expenses.filter(e => e.petId === currentPet.id) : [];
  const petTotalSpent = petExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const budgetPercentage = currentPet ? Math.min(100, Math.round((petTotalSpent / currentPet.monthlyBudget) * 100)) : 0;

  // Category breakdown for current pet
  const categoryTotals = petExpenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<PetExpenseCategory, number>);

  return (
    <section id="mascotas" className="py-20 md:py-28 relative bg-[#0b0919] border-t border-purple-500/15">
      {/* Glow ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-pink-600/10 via-purple-600/15 to-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-4 shadow-lg shadow-purple-950/40">
            <span className="text-sm">🐾</span>
            <span>Espacio Especial para Mascotas</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-4">
            Control de gastos para tus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400">
              mascotas y peludos
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Personaliza el perfil de cada mascota, define presupuestos mensuales y lleva un control detallado de su comida, veterinario, medicinas y necesidades, dividiéndolo en pareja sin líos.
          </p>
        </div>

        {/* Pet Profiles Bar & Add Button */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {pets.map((pet) => {
            const isSelected = pet.id === selectedPetId;
            return (
              <button
                key={pet.id}
                onClick={() => setSelectedPetId(pet.id)}
                className={`flex items-center gap-3 p-2 sm:p-2.5 pr-4 sm:pr-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#181333] border-purple-400 shadow-xl shadow-purple-950/50 scale-[1.03]'
                    : 'bg-[#120f26]/80 border-white/10 hover:border-purple-500/30 text-slate-300'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${pet.colorTheme} flex items-center justify-center text-xl shadow-md`}>
                  {pet.avatarEmoji}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white font-display">{pet.name}</span>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    ${pet.spentThisMonth.toFixed(2)} / ${pet.monthlyBudget} USD
                  </p>
                </div>
              </button>
            );
          })}

          {/* Add & Configure Pet Buttons */}
          <button
            onClick={() => {
              setSelectedPetForConfig(undefined);
              setShowConfigModal(true);
            }}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 border border-dashed border-purple-400/50 text-purple-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 text-purple-300" />
            <span>+ Agregar Mascota</span>
          </button>

          <button
            onClick={() => {
              setSelectedPetForConfig(currentPet?.id);
              setShowConfigModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
          >
            <Settings className="w-4 h-4 text-pink-400" />
            <span>Configurar</span>
          </button>
        </div>

        {/* Selected Pet Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pet Profile Summary & Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Pet Card */}
            <div className="bg-[#141129] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3.5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentPet.colorTheme} flex items-center justify-center text-3xl shadow-lg shadow-purple-900/30`}>
                    {currentPet.avatarEmoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white font-display flex items-center gap-2">
                      <span>{currentPet.name}</span>
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-xs text-slate-300">{currentPet.breed || currentPet.species}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedPetForConfig(currentPet.id);
                      setShowConfigModal(true);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-purple-300 hover:text-white transition-all cursor-pointer"
                    title="Editar nombre, avatar o presupuesto"
                  >
                    <Settings className="w-3.5 h-3.5 text-purple-300" />
                    <span>Editar</span>
                  </button>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {currentPet.species.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Budget Progress Bar */}
              <div className="space-y-2 mt-4 p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-slate-400">Presupuesto mensual</span>
                  <span className="font-bold text-white tabular-nums">
                    ${petTotalSpent.toFixed(2)}{' '}
                    <span className="text-slate-400 font-normal">/ ${currentPet.monthlyBudget}.00 USD</span>
                  </span>
                </div>

                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      budgetPercentage > 90
                        ? 'bg-rose-500'
                        : budgetPercentage > 75
                        ? 'bg-amber-400'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                    }`}
                    style={{ width: `${budgetPercentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] pt-1">
                  <span className="text-slate-400">{budgetPercentage}% consumido</span>
                  <span className={budgetPercentage > 90 ? 'text-rose-400' : 'text-emerald-400'}>
                    Te quedan ${(Math.max(0, currentPet.monthlyBudget - petTotalSpent)).toFixed(2)} USD
                  </span>
                </div>
              </div>

              {/* Quick Categories summary chips */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  DISTRIBUCIÓN DE GASTOS DE {currentPet.name.toUpperCase()}
                </span>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(categoryIcons).slice(0, 4).map(([catKey, catInfo]) => {
                    const spentInCat = categoryTotals[catKey as PetExpenseCategory] || 0;
                    return (
                      <div
                        key={catKey}
                        className="p-2.5 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span>{catInfo.icon}</span>
                          <span className="text-slate-300 text-[11px] truncate">{catInfo.label.split('&')[0]}</span>
                        </div>
                        <span className="font-bold text-white tabular-nums">${spentInCat.toFixed(0)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Quick Form to Log Pet Expense */}
            <div className="bg-[#141129] border border-purple-500/25 rounded-3xl p-6 shadow-2xl relative">
              <h4 className="text-base font-bold text-white font-display flex items-center gap-2 mb-4">
                <span>+ Registrar gasto para {currentPet.name}</span>
              </h4>

              <form onSubmit={handleAddPetExpense} className="space-y-3.5">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Concepto</label>
                  <input
                    type="text"
                    value={newExpenseConcept}
                    onChange={(e) => setNewExpenseConcept(e.target.value)}
                    placeholder="Ej. Vacuna, Croquetas, Peluquería"
                    className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Monto ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newExpenseAmount}
                      onChange={(e) => setNewExpenseAmount(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-bold focus:outline-none focus:border-purple-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Categoría</label>
                    <select
                      value={newExpenseCategory}
                      onChange={(e) => setNewExpenseCategory(e.target.value as PetExpenseCategory)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none cursor-pointer"
                    >
                      {Object.entries(categoryIcons).map(([catKey, info]) => (
                        <option key={catKey} value={catKey} className="bg-[#141129]">
                          {info.icon} {info.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">¿Quién pagó?</label>
                    <select
                      value={newExpensePaidBy}
                      onChange={(e) => setNewExpensePaidBy(e.target.value as 'Sofía' | 'Mateo' | 'Yo')}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none cursor-pointer"
                    >
                      <option value="Sofía" className="bg-[#141129]">Sofía</option>
                      <option value="Mateo" className="bg-[#141129]">Mateo</option>
                      <option value="Yo" className="bg-[#141129]">Yo (Solo)</option>
                    </select>
                  </div>

                  <div className="flex flex-col justify-end">
                    <button
                      type="submit"
                      className="w-full py-2 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95 transition-all"
                    >
                      Guardar Gasto
                    </button>
                  </div>
                </div>
              </form>

              <AnimatePresence>
                {expenseSuccessToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-3 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>¡Gasto guardado para {currentPet.name}! Saldo actualizado.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Pet Expense History & Needs Checklist */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Feed of expenses for this pet */}
            <div className="bg-[#141129] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h4 className="text-base font-bold text-white font-display">
                    Historial de Gastos de {currentPet.name} ({petExpenses.length})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Cuentas claras en alimentos, vacunas y artículos para {currentPet.name}
                  </p>
                </div>

                <span className="text-xs font-bold text-purple-300 px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-500/20">
                  Total: ${petTotalSpent.toFixed(2)} USD
                </span>
              </div>

              {petExpenses.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl text-slate-400 text-sm">
                  No hay gastos registrados para {currentPet.name} todavía.
                </div>
              ) : (
                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                  {petExpenses.map((exp) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-purple-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-lg">
                          {categoryIcons[exp.category]?.icon || '🐾'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{exp.concept}</p>
                          <p className="text-xs text-slate-400">
                            {categoryIcons[exp.category]?.label} · Pagó <strong>{exp.paidBy}</strong> (50% c/u) · {exp.date}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-black text-white tabular-nums">
                          ${exp.amount.toFixed(2)} USD
                        </p>
                        <p className="text-[10px] text-purple-300 font-medium">
                          ${(exp.amount / 2).toFixed(2)} cada uno
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Couple collaboration note */}
              <div className="mt-5 p-3.5 rounded-2xl bg-gradient-to-r from-pink-950/30 to-purple-950/30 border border-pink-500/20 flex items-center gap-3 text-xs text-slate-300">
                <Heart className="w-4 h-4 text-pink-400 shrink-0" />
                <span>
                  Los gastos de <strong>{currentPet.name}</strong> se integran automáticamente en el saldo global en pareja, garantizando que el cuidado de tu mascota sea justo para ambos.
                </span>
              </div>
            </div>

            {/* Pet Needs & Care Guide Showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-[#141129]/80 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🩺</span>
                  <h5 className="text-sm font-bold text-white font-display">Recordatorios Veterinarios</h5>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Registra vacunas, desparasitaciones y revisiones periódicas con fechas estimadas de próxima dosis para no descuidar su salud.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-[#141129]/80 border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🥩</span>
                  <h5 className="text-sm font-bold text-white font-display">Alertas de Alimento</h5>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Calcula la duración del bulto de croquetas o alimento húmedo según el peso y edad de tu mascota para presupuestar la reposición a tiempo.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL: CONFIGURAR MASCOTAS (AGREGAR, ELIMINAR, EDITAR NOMBRES Y AVATARES) */}
      <AnimatePresence>
        {showConfigModal && (
          <PetConfigModal
            isOpen={showConfigModal}
            onClose={() => {
              setShowConfigModal(false);
              setSelectedPetForConfig(undefined);
            }}
            pets={pets}
            selectedPetId={selectedPetForConfig || selectedPetId}
            onSavePet={handleSavePet}
            onDeletePet={handleDeletePet}
            currencySymbol="$"
          />
        )}
      </AnimatePresence>
    </section>
  );
};
