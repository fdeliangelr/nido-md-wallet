import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Users,
  User,
  Heart,
  Globe,
  Plus,
  CheckCircle2,
  TrendingUp,
  Download,
  LogOut,
  ShoppingBag,
  Utensils,
  Home,
  Zap,
  Coffee,
  Split,
  Trash2,
  Sparkles,
  ArrowRightLeft,
  Calendar,
  X,
  Smartphone,
  Check,
  AlertCircle,
  Wifi,
  WifiOff,
  BarChart3,
  Stethoscope,
  Smile,
  ShieldCheck,
  CreditCard,
  Settings
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { CurrencyCode, Pet, PetExpenseCategory, CoupleSettings } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { CoupleConfigModal } from './CoupleConfigModal';
import { PetConfigModal } from '../components/PetConfigModal';
import { IncomeSplitCalculator } from './IncomeSplitCalculator';

interface DashboardProps {
  onLogout: () => void;
}

interface AppTransaction {
  id: string;
  title: string;
  amount: number;
  currency: CurrencyCode;
  category: 'supermercado' | 'restaurante' | 'hogar' | 'ocio' | 'transporte' | 'mascota' | 'servicios';
  type: 'pareja' | 'personal' | 'mascota';
  petName?: string;
  paidBy: string;
  splitRatio: '50_50' | '60_40' | 'solo';
  date: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSInstallGuide, setShowIOSInstallGuide] = useState(false);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'pareja' | 'personal' | 'mascotas' | 'analiticas' | 'viajes'>('pareja');
  
  // Active Currency (Predeterminado en ARS para tu región)
  const [currency, setCurrency] = useState<CurrencyCode>('ARS');
  
  // Estados para la calculadora de ingresos y división proporcional
  const [partner1Income, setPartner1Income] = useState<number>(1200);
  const [partner2Income, setPartner2Income] = useState<number>(1500);
  const [isProportionalActive, setIsProportionalActive] = useState<boolean>(false);
  
  // Couple Settings State with LocalStorage persistence
  const [coupleSettings, setCoupleSettings] = useState<CoupleSettings>(() => {
    try {
      const saved = localStorage.getItem('mis_gastos_couple_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return {
      partner1: {
        name: 'Sofía',
        avatarEmoji: '👩‍🦰',
        avatarType: 'initial',
        colorTheme: 'from-pink-500 to-purple-600'
      },
      partner2: {
        name: 'Mateo',
        avatarEmoji: '👨‍🦱',
        avatarType: 'initial',
        colorTheme: 'from-blue-500 to-indigo-600'
      },
      pairName: 'Sofía & Mateo'
    };
  });
  const [showCoupleModal, setShowCoupleModal] = useState(false);

  const handleSaveCoupleSettings = (updated: CoupleSettings) => {
    const oldP1 = coupleSettings.partner1.name;
    const oldP2 = coupleSettings.partner2.name;
    setCoupleSettings(updated);
    setNewPaidBy(updated.partner1.name);
    setTransactions(prev => prev.map(t => {
      if (t.paidBy === oldP1 || t.paidBy === 'Sofía' || t.paidBy === 'Pareja 1') {
        return { ...t, paidBy: updated.partner1.name };
      }
      if (t.paidBy === oldP2 || t.paidBy === 'Mateo' || t.paidBy === 'Pareja 2') {
        return { ...t, paidBy: updated.partner2.name };
      }
      return t;
    }));
    try {
      localStorage.setItem('mis_gastos_couple_settings', JSON.stringify(updated));
    } catch (e) {}
  };

  // Pair Split Setting
  const [pairSplitRatio, setPairSplitRatio] = useState<'50_50' | '60_40'>('50_50');

  // Transactions State
  const [transactions, setTransactions] = useState<AppTransaction[]>([
    {
      id: 'tx-1',
      title: 'Despensa Semanal Orgánica',
      amount: 84.50,
      currency: 'USD',
      category: 'supermercado',
      type: 'pareja',
      paidBy: 'Sofía',
      splitRatio: '50_50',
      date: 'Hoy, 2:15 PM'
    },
    {
      id: 'tx-2',
      title: 'Cena Trattoria Italiana',
      amount: 62.00,
      currency: 'USD',
      category: 'restaurante',
      type: 'pareja',
      paidBy: 'Mateo',
      splitRatio: '50_50',
      date: 'Ayer, 9:30 PM'
    },
    {
      id: 'tx-3',
      title: 'Alimento Premium 15kg (Gringa)',
      amount: 68.50,
      currency: 'USD',
      category: 'mascota',
      type: 'mascota',
      petName: 'Gringa 🐱',
      paidBy: 'Sofía',
      splitRatio: '50_50',
      date: 'Hace 2 días'
    },
    {
      id: 'tx-4',
      title: 'Fibra Óptica & Wi-Fi Hogar',
      amount: 55.00,
      currency: 'USD',
      category: 'hogar',
      type: 'pareja',
      paidBy: 'Mateo',
      splitRatio: '50_50',
      date: 'Hace 3 días'
    },
    {
      id: 'tx-5',
      title: 'Café de especialidad & Libro',
      amount: 18.50,
      currency: 'USD',
      category: 'ocio',
      type: 'personal',
      paidBy: 'Yo',
      splitRatio: 'solo',
      date: 'Hace 4 días'
    }
  ]);

  // Mascotas State with localStorage persistence
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
        name: 'Gringa',
        species: 'gato',
        breed: 'Naraja Loca',
        colorTheme: 'from-amber-500 to-orange-600',
        avatarEmoji: '🐱',
        monthlyBudget: 62400,
        spentThisMonth: 54080
      }
    ];
  });
  const [activePetId, setActivePetId] = useState<string>(() => pets[0]?.id || 'pet-1');
  const [showPetModal, setShowPetModal] = useState(false);
  const [selectedPetForConfig, setSelectedPetForConfig] = useState<string | undefined>(undefined);

  const handleSavePet = (petToSave: Pet) => {
    const exists = pets.some(p => p.id === petToSave.id);
    let updatedPets: Pet[];
    if (exists) {
      const oldPet = pets.find(p => p.id === petToSave.id);
      updatedPets = pets.map(p => (p.id === petToSave.id ? petToSave : p));
      if (oldPet && (oldPet.name !== petToSave.name || oldPet.avatarEmoji !== petToSave.avatarEmoji)) {
        setTransactions(prev => prev.map(t => {
          if (t.type === 'mascota' && t.petName && (t.petName.includes(oldPet.name) || t.petName.includes(oldPet.id))) {
            return { ...t, petName: `${petToSave.name} ${petToSave.avatarEmoji}` };
          }
          return t;
        }));
      }
    } else {
      updatedPets = [...pets, petToSave];
      setActivePetId(petToSave.id);
    }
    setPets(updatedPets);
    try {
      localStorage.setItem('mis_gastos_pets', JSON.stringify(updatedPets));
    } catch (e) {}
  };

  const handleDeletePet = (petId: string) => {
    const updatedPets = pets.filter(p => p.id !== petId);
    setPets(updatedPets);
    if (activePetId === petId) {
      setActivePetId(updatedPets[0]?.id || '');
    }
    try {
      localStorage.setItem('mis_gastos_pets', JSON.stringify(updatedPets));
    } catch (e) {}
  };

  // Modals & Action States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [settledSuccessToast, setSettledSuccessToast] = useState(false);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);

  // New Transaction Form State
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'pareja' | 'personal' | 'mascota'>('pareja');
  const [newCategory, setNewCategory] = useState<AppTransaction['category']>('supermercado');
  const [newPaidBy, setNewPaidBy] = useState<string>(coupleSettings.partner1.name);
  const [newPetSelected, setNewPetSelected] = useState<string>(() => 
    pets[0] ? `${pets[0].name} ${pets[0].avatarEmoji}` : 'Gringa 🐱'
  );

  // Currency Multipliers
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

  const formatAmount = (usdVal: number) => {
    const val = usdVal * currencyMultipliers[currency];
    if (currency === 'COP' || currency === 'ARS' || currency === 'CLP') {
      return `${currencySymbols[currency]}${Math.round(val).toLocaleString()}`;
    }
    return `${currencySymbols[currency]}${val.toFixed(2)}`;
  };

  // Calculations: Pair balance
  const sharedTransactions = transactions.filter(t => t.type === 'pareja' || t.type === 'mascota');
  const partner1PaidTotal = sharedTransactions
    .filter(t => t.paidBy === coupleSettings.partner1.name || t.paidBy === 'Sofía')
    .reduce((acc, t) => acc + t.amount, 0);
  const partner2PaidTotal = sharedTransactions
    .filter(t => t.paidBy === coupleSettings.partner2.name || t.paidBy === 'Mateo')
    .reduce((acc, t) => acc + t.amount, 0);

  const sharedTotal = partner1PaidTotal + partner2PaidTotal;
  
  const partner1Target = pairSplitRatio === '50_50' ? sharedTotal * 0.5 : sharedTotal * 0.6;
  const partner2Target = pairSplitRatio === '50_50' ? sharedTotal * 0.5 : sharedTotal * 0.4;
  const partner2OwesPartner1 = partner1PaidTotal - partner1Target;

  // Personal Budget stats
  const personalTotal = transactions
    .filter(t => t.type === 'personal')
    .reduce((acc, t) => acc + t.amount, 0);
  const personalBudgetLimit = 850;
  const personalPercent = Math.min(100, Math.round((personalTotal / personalBudgetLimit) * 100));

  // Handler: Add Expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(newAmount);
    if (isNaN(amt) || amt <= 0) return;

    const newTx: AppTransaction = {
      id: `tx-${Date.now()}`,
      title: newTitle.trim() || 'Gasto anotado',
      amount: amt,
      currency,
      category: newType === 'mascota' ? 'mascota' : newCategory,
      type: newType,
      petName: newType === 'mascota' ? newPetSelected : undefined,
      paidBy: newPaidBy,
      splitRatio: newType === 'personal' ? 'solo' : pairSplitRatio,
      date: 'Justo ahora'
    };

    setTransactions([newTx, ...transactions]);
    setShowAddModal(false);
    setNewTitle('');
    setNewAmount('');
  };

  // Handler: Settle Up
  const handleSettleUp = () => {
    setShowSettleModal(false);
    setSettledSuccessToast(true);
    const settlementTx: AppTransaction = {
      id: `settle-${Date.now()}`,
      title: `Liquidación de cuentas: Saldo en ceros`,
      amount: Math.abs(partner2OwesPartner1),
      currency: 'USD',
      category: 'servicios',
      type: 'pareja',
      paidBy: partner2OwesPartner1 > 0 ? coupleSettings.partner2.name : coupleSettings.partner1.name,
      splitRatio: '50_50',
      date: 'Justo ahora'
    };
    setTransactions([settlementTx, ...transactions]);
    setTimeout(() => {
      setSettledSuccessToast(false);
    }, 4000);
  };

  // Recharts Bar Data for Analytics
  const analyticsData = [
    { name: 'Súper', Gastado: 84.50 },
    { name: 'Restaurante', Gastado: 62.00 },
    { name: 'Mascotas', Gastado: 54.08 },
    { name: 'Hogar', Gastado: 55.00 },
    { name: 'Ocio', Gastado: 18.50 },
  ];

  const currentPet = pets.find(p => p.id === activePetId) || pets[0];
  const petExpenses = currentPet
    ? transactions.filter(t => t.type === 'mascota' && (t.petName?.includes(currentPet.name)))
    : [];

  return (
    <div className="min-h-screen bg-[#090814] text-slate-100 flex flex-col font-sans select-none pb-20 md:pb-8">
      
      {/* Top Native Bar */}
      <header className="sticky top-0 z-40 bg-[#0f0d24]/90 backdrop-blur-xl border-b border-purple-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand & Connection Status */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-purple-950/50 border border-purple-400/30 shadow-lg shadow-purple-600/30 flex items-center justify-center">
              <img 
                src="/logo.jpg" 
                alt="NidoMDwallet Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold font-display text-white tracking-tight">NidoMDwallet</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <button
                  onClick={() => setIsSimulatedOffline(!isSimulatedOffline)}
                  className={`flex items-center gap-1 cursor-pointer transition-colors ${
                    isSimulatedOffline ? 'text-amber-400' : 'text-emerald-400'
                  }`}
                  title="Haz clic para probar el modo sin conexión"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSimulatedOffline ? 'bg-amber-400' : 'bg-emerald-400 animate-pulse'}`} />
                  <span>{isSimulatedOffline ? 'Modo Offline (Simulado)' : 'En Línea · Sincronizado'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowCoupleModal(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/25 text-xs text-purple-200 transition-all cursor-pointer shadow-sm hover:scale-[1.02]"
            >
              <div className="flex -space-x-2">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${coupleSettings.partner1.colorTheme} flex items-center justify-center text-[10px] font-bold text-white shadow`}>
                  {coupleSettings.partner1.avatarType === 'emoji' ? coupleSettings.partner1.avatarEmoji : (coupleSettings.partner1.name.charAt(0) || 'S')}
                </div>
                <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${coupleSettings.partner2.colorTheme} flex items-center justify-center text-[10px] font-bold text-white shadow`}>
                  {coupleSettings.partner2.avatarType === 'emoji' ? coupleSettings.partner2.avatarEmoji : (coupleSettings.partner2.name.charAt(0) || 'M')}
                </div>
              </div>
              <span className="font-bold hidden md:inline truncate max-w-[130px]">
                {coupleSettings.partner1.name} & {coupleSettings.partner2.name}
              </span>
              <Settings className="w-3.5 h-3.5 text-purple-400" />
            </button>

            <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-2.5 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-purple-400 mr-1.5" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value="USD" className="bg-[#141129]">USD ($)</option>
                <option value="EUR" className="bg-[#141129]">EUR (€)</option>
                <option value="MXN" className="bg-[#141129]">MXN ($)</option>
                <option value="COP" className="bg-[#141129]">COP ($)</option>
                <option value="ARS" className="bg-[#141129]">ARS ($)</option>
                <option value="PEN" className="bg-[#141129]">PEN (S/.)</option>
              </select>
            </div>

            {!isInstalled && (
              <>
                {isInstallable ? (
                  <button
                    onClick={install}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Instalar App</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowIOSInstallGuide(true)}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/30 text-purple-200 text-xs font-medium transition-all cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-purple-300" />
                    <span>Instalar en Celular</span>
                  </button>
                )}
              </>
            )}

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer border border-white/5"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-purple-500/15">
          <div className="flex items-center gap-1.5 p-1 bg-[#130f28] border border-white/10 rounded-2xl">
            <button
              onClick={() => setActiveTab('pareja')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pareja'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-pink-300" />
              <span>En Pareja</span>
            </button>

            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'personal'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5 text-purple-300" />
              <span>Personal</span>
            </button>

            <button
              onClick={() => setActiveTab('mascotas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'mascotas'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🐾 Mascotas</span>
            </button>

            <button
              onClick={() => setActiveTab('analiticas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'analiticas'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Analíticas</span>
            </button>

            <button
              onClick={() => setActiveTab('viajes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'viajes'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-300" />
              <span>Viajes & Cambio</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:brightness-110 text-white text-xs font-bold shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95 transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>+ Registrar Gasto</span>
          </button>
        </div>

        {/* Settled Toast Notification */}
        <AnimatePresence>
          {settledSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 flex items-center justify-between shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <p className="font-bold text-sm text-white">¡Cuentas liquidadas con éxito!</p>
                  <p className="text-xs text-emerald-300/80">
                    Se registró la transferencia compensatoria. El saldo entre Sofía y Mateo ha quedado en {formatAmount(0)}.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSettledSuccessToast(false)}
                className="text-emerald-400 hover:text-white text-xs"
              >
                Cerrar
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TAB 1: EN PAREJA */}
        {activeTab === 'pareja' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              <div className="lg:col-span-7 bg-[#14102c] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2.5">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${coupleSettings.partner1.colorTheme} border-2 border-[#14102c] flex items-center justify-center font-bold text-xs text-white shadow-md`}>
                          {coupleSettings.partner1.avatarType === 'emoji' ? coupleSettings.partner1.avatarEmoji : (coupleSettings.partner1.name.charAt(0).toUpperCase() || 'P1')}
                        </div>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${coupleSettings.partner2.colorTheme} border-2 border-[#14102c] flex items-center justify-center font-bold text-xs text-white shadow-md`}>
                          {coupleSettings.partner2.avatarType === 'emoji' ? coupleSettings.partner2.avatarEmoji : (coupleSettings.partner2.name.charAt(0).toUpperCase() || 'P2')}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-bold text-white font-display flex items-center gap-1.5">
                            <span>{coupleSettings.pairName || `${coupleSettings.partner1.name} & ${coupleSettings.partner2.name}`}</span>
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          </h2>
                          <button
                            onClick={() => setShowCoupleModal(true)}
                            className="text-[11px] text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 bg-purple-500/10 hover:bg-purple-500/20 px-2 py-0.5 rounded-lg border border-purple-500/20 transition-all cursor-pointer"
                          >
                            <Settings className="w-3 h-3" />
                            <span>Configurar</span>
                          </button>
                        </div>
                        <p className="text-xs text-slate-400">Finanzas Conjuntas · {coupleSettings.partner1.name} y {coupleSettings.partner2.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl p-1 text-[11px]">
                      <button
                        onClick={() => setPairSplitRatio('50_50')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          pairSplitRatio === '50_50' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        50 / 50
                      </button>
                      <button
                        onClick={() => setPairSplitRatio('60_40')}
                        className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          pairSplitRatio === '60_40' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        60 / 40
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-4">
                    <span className="text-xs text-slate-400 block mb-1">Gasto total acumulado este mes</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl sm:text-4xl font-black font-display text-white tabular-nums">
                        {formatAmount(sharedTotal)}
                      </span>
                      <span className="text-xs text-purple-300 font-medium">
                        {sharedTransactions.length} gastos compartidos
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-200">
                        <Split className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">Balance Neto de Cuentas</span>
                        {Math.abs(partner2OwesPartner1) < 0.01 ? (
                          <p className="text-base font-bold text-emerald-400">¡Cuentas al día! Nadie debe nada.</p>
                        ) : partner2OwesPartner1 > 0 ? (
                          <p className="text-base font-bold text-white">
                            {coupleSettings.partner2.name} le debe <span className="text-emerald-400 font-extrabold">{formatAmount(partner2OwesPartner1)}</span> a {coupleSettings.partner1.name}
                          </p>
                        ) : (
                          <p className="text-base font-bold text-white">
                            {coupleSettings.partner1.name} le debe <span className="text-pink-400 font-extrabold">{formatAmount(Math.abs(partner2OwesPartner1))}</span> a {coupleSettings.partner2.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowSettleModal(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Liquidar Balance</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>{coupleSettings.partner1.name} aportó: <strong>{formatAmount(partner1PaidTotal)}</strong></span>
                  <span>{coupleSettings.partner2.name} aportó: <strong>{formatAmount(partner2PaidTotal)}</strong></span>
                </div>
              </div>

              {/* Side Snapshot & Dynamic Pets List */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                
                <div className="bg-[#14102c] border border-purple-500/20 rounded-3xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <span>🐾 Gastos de Mascotas del Mes</span>
                    </span>
                    <button
                      onClick={() => setActiveTab('mascotas')}
                      className="text-xs text-pink-400 hover:text-pink-300 font-medium cursor-pointer"
                    >
                      Ver detalles →
                    </button>
                  </div>

                  <div className="space-y-2">
                    {pets.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-2">No hay mascotas registradas.</p>
                    ) : (
                      pets.map((pet) => (
                        <div key={pet.id} className="p-2.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{pet.avatarEmoji}</span>
                            <span className="text-xs font-semibold text-white">{pet.name} ({pet.breed || pet.species})</span>
                          </div>
                          <span className="text-xs font-bold text-white tabular-nums">{formatAmount(pet.spentThisMonth)}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Calculadora de Aporte Justo por Ingresos */}
            <IncomeSplitCalculator
              coupleSettings={coupleSettings}
              currency={currency}
              formatAmount={formatAmount}
              isProportionalActive={isProportionalActive}
              setIsProportionalActive={setIsProportionalActive}
              partner1Income={partner1Income}
              setPartner1Income={setPartner1Income}
              partner2Income={partner2Income}
              setPartner2Income={setPartner2Income}
            />

            {/* Shared Transactions Feed */}
            <div className="bg-[#14102c] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Movimientos Compartidos Recientes ({sharedTransactions.length})
                  </h3>
                  <p className="text-xs text-slate-400">Gastos divididos entre {coupleSettings.partner1.name} y {coupleSettings.partner2.name}</p>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="text-xs text-purple-400 hover:text-purple-300 font-semibold"
                >
                  + Agregar nuevo
                </button>
              </div>

              <div className="space-y-2.5">
                {sharedTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-purple-500/30 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-300">
                        {tx.category === 'restaurante' ? (
                          <Utensils className="w-4 h-4" />
                        ) : tx.category === 'hogar' ? (
                          <Home className="w-4 h-4" />
                        ) : tx.category === 'mascota' ? (
                          <span className="text-base">🐾</span>
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{tx.title}</p>
                        <p className="text-xs text-slate-400">
                          Pagó <strong className="text-purple-300">{tx.paidBy}</strong> · 50% c/u · {tx.date}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-white tabular-nums">
                        {formatAmount(tx.amount)}
                      </p>
                      <p className="text-[10px] text-purple-300 font-medium">
                        Tu cuota: {formatAmount(tx.amount / 2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 2: PERSONAL */}
        {activeTab === 'personal' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-6 bg-[#14102c] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-slate-400 font-semibold">Mi Billetera Individual</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Bajo control
                  </span>
                </div>

                <div className="text-3xl font-black font-display text-white mb-2 tabular-nums">
                  {formatAmount(personalTotal)}{' '}
                  <span className="text-sm font-normal text-slate-400">/ {formatAmount(personalBudgetLimit)}</span>
                </div>

                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${personalPercent}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-slate-400 mb-6">
                  <span>{personalPercent}% del presupuesto utilizado</span>
                  <span className="text-emerald-400 font-semibold">
                    Quedan {formatAmount(personalBudgetLimit - personalTotal)} para 18 días
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold text-slate-300 block mb-2">Desglose de categorías personales</span>
                  
                  <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Coffee className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-slate-200">Cafés, Snacks y Salidas Personales</span>
                    </div>
                    <span className="text-xs font-bold text-white tabular-nums">{formatAmount(18.50)}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 bg-[#14102c] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>Detección de Fugas & Gastos Hormiga</span>
                  </div>
                  <h4 className="text-lg font-bold font-display text-white mb-2">
                    Ahorro mensual proyectado: +{formatAmount(140.00)}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Al separar tus gastos individuales de los gastos de pareja, identificamos suscripciones no utilizadas y pequeños cafés diarios que pueden optimizarse sin sacrificar tu estilo de vida.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                  <span className="text-xs font-bold text-slate-300 block mb-2">Privacidad garantizada</span>
                  <p className="text-xs text-slate-400">
                    Tus gastos en esta pestaña son 100% privados y no se comparten en el feed conjunto con tu pareja.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 3: MASCOTAS 🐾 */}
        {activeTab === 'mascotas' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {pets.map((pet) => {
                  const isSelected = pet.id === activePetId;
                  return (
                    <button
                      key={pet.id}
                      onClick={() => setActivePetId(pet.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#181335] border-pink-500/60 shadow-lg shadow-pink-950/40 text-white scale-[1.02]'
                          : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-lg">{pet.avatarEmoji}</span>
                      <div className="text-left">
                        <p className="text-xs font-bold leading-tight">{pet.name}</p>
                        <p className="text-[10px] text-pink-300">{pet.breed || pet.species}</p>
                      </div>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    setSelectedPetForConfig(undefined);
                    setShowPetModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-pink-600/20 hover:bg-pink-600/30 border border-dashed border-pink-400/50 text-pink-200 text-xs font-bold transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Plus className="w-3.5 h-3.5 text-pink-300" />
                  <span>+ Nueva Mascota</span>
                </button>
              </div>

              {pets.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedPetForConfig(currentPet?.id);
                    setShowPetModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-pink-400" />
                  <span>Configurar Mascotas</span>
                </button>
              )}
            </div>

            {!currentPet ? (
              <div className="p-10 text-center bg-[#14102c] border border-pink-500/25 rounded-3xl max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-pink-500/20 text-3xl flex items-center justify-center mx-auto mb-4 border border-pink-500/30">
                  🐾
                </div>
                <h3 className="text-lg font-bold font-display text-white mb-2">
                  No tienes mascotas agregadas aún
                </h3>
                <button
                  onClick={() => {
                    setSelectedPetForConfig(undefined);
                    setShowPetModal(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-pink-900/40 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar mi primera mascota</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                <div className="lg:col-span-6 bg-[#14102c] border border-pink-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentPet.colorTheme} flex items-center justify-center text-2xl shadow-lg`}>
                        {currentPet.avatarEmoji}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold font-display text-white">{currentPet.name}</h3>
                          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        </div>
                        <p className="text-xs text-slate-400">{currentPet.breed || currentPet.species} · Presupuesto mensual</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPetForConfig(currentPet.id);
                          setShowPetModal(true);
                        }}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                      >
                        <Settings className="w-3 h-3 text-pink-400" />
                        <span>Editar</span>
                      </button>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase">
                        {currentPet.species}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-4">
                    <div className="flex justify-between items-baseline mb-1 text-xs">
                      <span className="text-slate-400">Presupuesto del mes</span>
                      <span className="font-bold text-white tabular-nums">
                        {formatAmount(currentPet.spentThisMonth)} / {formatAmount(currentPet.monthlyBudget)}
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                        style={{ width: `${Math.min(100, Math.round((currentPet.spentThisMonth / currentPet.monthlyBudget) * 100))}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setNewType('mascota');
                        setNewPetSelected(`${currentPet.name} ${currentPet.avatarEmoji}`);
                        setShowAddModal(true);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/30 cursor-pointer transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Gasto de {currentPet.name}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedPetForConfig(currentPet.id);
                        setShowPetModal(true);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all"
                    >
                      <Settings className="w-3.5 h-3.5 text-pink-400" />
                      <span>Configurar Perfil</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-[#14102c] border border-pink-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-bold font-display text-white">
                      Historial de {currentPet.name} ({petExpenses.length})
                    </h4>
                    <span className="text-xs text-pink-400 font-semibold">
                      División 50/50
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {petExpenses.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-8">No hay gastos recientes para {currentPet.name}.</p>
                    ) : (
                      petExpenses.map((pEx) => (
                        <div
                          key={pEx.id}
                          className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{currentPet.avatarEmoji}</span>
                            <div>
                              <p className="text-xs font-semibold text-white">{pEx.title}</p>
                              <p className="text-[10px] text-slate-400">
                                Pagó <strong>{pEx.paidBy}</strong> · 50% c/u · {pEx.date}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-xs font-bold text-white tabular-nums">{formatAmount(pEx.amount)}</p>
                            <p className="text-[10px] text-pink-300">{formatAmount(pEx.amount / 2)} c/u</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        )}

        {/* TAB 4: ANALÍTICAS */}
        {activeTab === 'analiticas' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#14102c] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
              <h3 className="text-lg font-bold font-display text-white mb-1">
                Desglose Visual de Gastos Mensuales
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Comparativa de desembolso por categorías en {currency}
              </p>

              <div className="w-full h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `${currencySymbols[currency]}${v}`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#161230',
                        borderColor: 'rgba(168,85,247,0.3)',
                        borderRadius: '16px',
                        color: '#fff',
                        fontSize: '12px'
                      }}
                      formatter={(val: any) => [`${currencySymbols[currency]}${Number(val || 0).toFixed(2)}`, 'Gasto']}
                    />
                    <Bar dataKey="Gastado" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 5: VIAJES & CAMBIO */}
        {activeTab === 'viajes' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-[#14102c] border border-purple-500/25 rounded-3xl p-6 sm:p-7 shadow-2xl">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-2">
                <Globe className="w-4 h-4" />
                <span>Conversor y Modo Viaje en Vivo</span>
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">
                Gastos Internacionales Sincronizados
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mb-6">
                Pagas en moneda local extranjera y la aplicación convierte y divide automáticamente con tu pareja en la divisa base de su hogar.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {(['USD', 'EUR', 'MXN', 'COP', 'ARS', 'PEN'] as CurrencyCode[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      currency === c
                        ? 'bg-purple-600/30 border-purple-400 text-white shadow-lg'
                        : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs font-bold block">{c}</span>
                    <span className="text-sm font-black text-purple-300 font-display mt-1">
                      {formatAmount(50)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-30">
        <button
          onClick={() => setShowAddModal(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-purple-600/50 cursor-pointer active:scale-95"
          aria-label="Registrar nuevo gasto"
        >
          <Plus className="w-7 h-7" />
        </button>
      </div>

      {/* MODAL: REGISTRAR NUEVO GASTO */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowAddModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#161230] border border-purple-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl z-10 text-white"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">Nuevo Gasto</h3>
                  <p className="text-xs text-slate-400">Registra y divide al instante</p>
                </div>
              </div>

              <form onSubmit={handleAddExpense} className="space-y-4">
                
                <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setNewType('pareja')}
                    className={`py-1.5 rounded-lg transition-all ${
                      newType === 'pareja' ? 'bg-purple-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    💑 En Pareja
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('personal')}
                    className={`py-1.5 rounded-lg transition-all ${
                      newType === 'personal' ? 'bg-purple-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    👤 Personal
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('mascota')}
                    className={`py-1.5 rounded-lg transition-all ${
                      newType === 'mascota' ? 'bg-pink-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    🐾 Mascota
                  </button>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Concepto</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ej. Supermercado, Cena Romántica, Croquetas"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">Monto ({currency})</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full text-sm font-bold px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  {newType === 'mascota' ? (
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Mascota</label>
                      <select
                        value={newPetSelected}
                        onChange={(e) => setNewPetSelected(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none cursor-pointer"
                      >
                        {pets.map((p) => (
                          <option key={p.id} value={`${p.name} ${p.avatarEmoji}`} className="bg-[#141129]">
                            {p.name} {p.avatarEmoji} ({p.breed || p.species})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="text-xs font-medium text-slate-300 block mb-1">Categoría</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as AppTransaction['category'])}
                        className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none cursor-pointer"
                      >
                        <option value="supermercado" className="bg-[#141129]">Supermercado</option>
                        <option value="restaurante" className="bg-[#141129]">Restaurante & Cenas</option>
                        <option value="hogar" className="bg-[#141129]">Hogar & Servicios</option>
                        <option value="ocio" className="bg-[#141129]">Ocio & Salidas</option>
                        <option value="transporte" className="bg-[#141129]">Transporte</option>
                      </select>
                    </div>
                  )}
                </div>

                {newType !== 'personal' && (
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">¿Quién pagó la cuenta?</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setNewPaidBy(coupleSettings.partner1.name)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          newPaidBy === coupleSettings.partner1.name
                            ? 'bg-pink-600/30 border-pink-400 text-pink-200 shadow-md'
                            : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full bg-gradient-to-tr ${coupleSettings.partner1.colorTheme} text-[10px] flex items-center justify-center text-white`}>
                          {coupleSettings.partner1.avatarType === 'emoji' ? coupleSettings.partner1.avatarEmoji : (coupleSettings.partner1.name.charAt(0).toUpperCase() || 'P1')}
                        </span>
                        <span className="truncate">{coupleSettings.partner1.name}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewPaidBy(coupleSettings.partner2.name)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          newPaidBy === coupleSettings.partner2.name
                            ? 'bg-blue-600/30 border-blue-400 text-blue-200 shadow-md'
                            : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full bg-gradient-to-tr ${coupleSettings.partner2.colorTheme} text-[10px] flex items-center justify-center text-white`}>
                          {coupleSettings.partner2.avatarType === 'emoji' ? coupleSettings.partner2.avatarEmoji : (coupleSettings.partner2.name.charAt(0).toUpperCase() || 'P2')}
                        </span>
                        <span className="truncate">{coupleSettings.partner2.name}</span>
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:brightness-110 rounded-xl font-bold text-xs text-white shadow-lg shadow-purple-600/30 active:scale-95 transition-all mt-2 cursor-pointer"
                >
                  Registrar y Sincronizar
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: LIQUIDAR CUENTAS */}
      <AnimatePresence>
        {showSettleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowSettleModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#161230] border border-purple-500/30 rounded-3xl p-6 text-center z-10 text-white"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto mb-4 flex items-center justify-center text-2xl shadow-lg">
                🤝
              </div>

              <h4 className="text-xl font-bold font-display text-white mb-2">Liquidar Balance de Pareja</h4>
              
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {partner2OwesPartner1 > 0 ? (
                  <span>
                    {coupleSettings.partner2.name} transferirá exactamente <strong>{formatAmount(partner2OwesPartner1)}</strong> a {coupleSettings.partner1.name} para quedar en ceros ($0.00).
                  </span>
                ) : (
                  <span>
                    {coupleSettings.partner1.name} transferirá exactamente <strong>{formatAmount(Math.abs(partner2OwesPartner1))}</strong> a {coupleSettings.partner2.name} para quedar en ceros ($0.00).
                  </span>
                )}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettleModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSettleUp}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
                >
                  Confirmar Pago
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: INSTRUCCIONES INSTALACIÓN iOS / PWA */}
      <AnimatePresence>
        {showIOSInstallGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowIOSInstallGuide(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-[#161230] border border-purple-500/30 rounded-3xl p-6 z-10 text-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-8 h-8 text-purple-400" />
                <div>
                  <h4 className="text-base font-bold font-display text-white">Instalar Mis Gastos</h4>
                  <p className="text-xs text-slate-400">En iPhone, Android o Escritorio</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 mb-6 bg-black/30 p-4 rounded-2xl border border-white/5">
                <p>
                  1. En tu navegador móvil (Safari o Chrome), toca el botón <strong>Compartir</strong> (Share) o los 3 puntos del menú.
                </p>
                <p>
                  2. Selecciona <strong>"Agregar a pantalla de inicio"</strong> o <strong>"Instalar aplicación"</strong>.
                </p>
                <p>
                  3. ¡Listo! Se abrirá a pantalla completa como una app nativa sin consumir espacio de tu teléfono.
                </p>
              </div>

              <button
                onClick={() => setShowIOSInstallGuide(false)}
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                Entendido
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: CONFIGURAR PAREJA */}
      <AnimatePresence>
        {showCoupleModal && (
          <CoupleConfigModal
            isOpen={showCoupleModal}
            onClose={() => setShowCoupleModal(false)}
            currentSettings={coupleSettings}
            onSave={handleSaveCoupleSettings}
          />
        )}
      </AnimatePresence>

      {/* MODAL: CONFIGURAR MASCOTAS */}
      <AnimatePresence>
        {showPetModal && (
          <PetConfigModal
            isOpen={showPetModal}
            onClose={() => {
              setShowPetModal(false);
              setSelectedPetForConfig(undefined);
            }}
            pets={pets}
            selectedPetId={selectedPetForConfig || activePetId}
            onSavePet={handleSavePet}
            onDeletePet={handleDeletePet}
            currencySymbol={currencySymbols[currency]}
          />
        )}
      </AnimatePresence>

    </div>
  );
};