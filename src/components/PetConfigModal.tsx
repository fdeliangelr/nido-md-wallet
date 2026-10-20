import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Check,
  Trash2,
  Plus,
  Palette,
  AlertTriangle,
  Smile,
  DollarSign
} from 'lucide-react';
import { Pet, PetSpecies } from '../types';

interface PetConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  pets: Pet[];
  selectedPetId?: string;
  onSavePet: (pet: Pet) => void;
  onDeletePet?: (petId: string) => void;
  currencySymbol?: string;
}

export const PetConfigModal: React.FC<PetConfigModalProps> = ({
  isOpen,
  onClose,
  pets,
  selectedPetId,
  onSavePet,
  onDeletePet,
  currencySymbol = '$'
}) => {
  // Mode: 'edit' an existing pet or 'create' a new one
  const [mode, setMode] = useState<'edit' | 'create'>('edit');
  const [currentId, setCurrentId] = useState<string>(selectedPetId || (pets[0]?.id ?? ''));

  // Form Fields
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>('perro');
  const [breed, setBreed] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState('🐕');
  const [colorTheme, setColorTheme] = useState('from-amber-500 to-orange-600');
  const [monthlyBudget, setMonthlyBudget] = useState('120');

  // Deletion confirm state
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Sync state whenever modal opens or currentId changes
  useEffect(() => {
    if (!isOpen) {
      setConfirmDelete(false);
      return;
    }

    const targetId = selectedPetId && pets.some(p => p.id === selectedPetId)
      ? selectedPetId
      : pets[0]?.id;

    if (mode === 'edit' && targetId) {
      const pet = pets.find(p => p.id === targetId) || pets[0];
      if (pet) {
        setCurrentId(pet.id);
        setName(pet.name);
        setSpecies(pet.species);
        setBreed(pet.breed || '');
        setAvatarEmoji(pet.avatarEmoji || '🐾');
        setColorTheme(pet.colorTheme || 'from-amber-500 to-orange-600');
        setMonthlyBudget(String(pet.monthlyBudget || 100));
      }
    } else if (mode === 'create') {
      setName('');
      setSpecies('perro');
      setBreed('');
      setAvatarEmoji('🐕');
      setColorTheme('from-emerald-500 to-teal-600');
      setMonthlyBudget('120');
    }
  }, [isOpen, selectedPetId, mode]);

  const selectPetToEdit = (pet: Pet) => {
    setMode('edit');
    setCurrentId(pet.id);
    setName(pet.name);
    setSpecies(pet.species);
    setBreed(pet.breed || '');
    setAvatarEmoji(pet.avatarEmoji || '🐾');
    setColorTheme(pet.colorTheme || 'from-amber-500 to-orange-600');
    setMonthlyBudget(String(pet.monthlyBudget || 100));
    setConfirmDelete(false);
  };

  const startCreateNew = () => {
    setMode('create');
    setName('');
    setSpecies('perro');
    setBreed('');
    setAvatarEmoji('🐕');
    setColorTheme('from-pink-500 to-purple-600');
    setMonthlyBudget('120');
    setConfirmDelete(false);
  };

  if (!isOpen) return null;

  const colorPresets = [
    { label: 'Ámbar Cálido', class: 'from-amber-500 to-orange-600' },
    { label: 'Rosa & Púrpura', class: 'from-pink-500 to-purple-600' },
    { label: 'Esmeralda & Menta', class: 'from-emerald-500 to-teal-600' },
    { label: 'Azul & Cian', class: 'from-blue-500 to-cyan-600' },
    { label: 'Violeta Profundo', class: 'from-violet-600 to-indigo-700' },
    { label: 'Coral & Fresa', class: 'from-rose-500 to-red-600' }
  ];

  const speciesOptions: { id: PetSpecies; label: string; defaultEmoji: string }[] = [
    { id: 'perro', label: 'Perro', defaultEmoji: '🐕' },
    { id: 'gato', label: 'Gato', defaultEmoji: '🐈' },
    { id: 'conejo', label: 'Conejo', defaultEmoji: '🐰' },
    { id: 'ave', label: 'Ave', defaultEmoji: '🦜' },
    { id: 'otro', label: 'Otro', defaultEmoji: '🐾' }
  ];

  const emojiCatalog = [
    // Perros
    '🐕', '🐶', '🐩', '🦮', '🐕‍🦺', '🐺', '🦊',
    // Gatos
    '🐈', '🐱', '🐈‍⬛', '🦁', '🐯',
    // Roedores & Conejos
    '🐰', '🐇', '🐹', '🐭', '🦔',
    // Aves
    '🦜', '🐦', '🦆', '🦉',
    // Acuáticos & Reptiles
    '🐢', '🐠', '🐡', '🦎', '🐸',
    // Mascotas especiales & extras
    '🐴', '🐮', '🐾', '🦴', '🧶', '💖', '👑', '⭐'
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || (species === 'perro' ? 'Perrito' : species === 'gato' ? 'Gatito' : 'Mi Mascota');
    const budgetNum = parseFloat(monthlyBudget) || 100;

    if (mode === 'create') {
      const newPet: Pet = {
        id: `pet-${Date.now()}`,
        name: finalName,
        species,
        breed: breed.trim() || undefined,
        colorTheme,
        avatarEmoji,
        monthlyBudget: budgetNum,
        spentThisMonth: 0
      };
      onSavePet(newPet);
      onClose();
    } else {
      const existing = pets.find(p => p.id === currentId);
      const updatedPet: Pet = {
        id: currentId,
        name: finalName,
        species,
        breed: breed.trim() || undefined,
        colorTheme,
        avatarEmoji,
        monthlyBudget: budgetNum,
        spentThisMonth: existing ? existing.spentThisMonth : 0
      };
      onSavePet(updatedPet);
      onClose();
    }
  };

  const handleDelete = () => {
    if (!onDeletePet) return;
    if (pets.length <= 1) {
      alert('Debes tener al menos una mascota registrada.');
      return;
    }
    onDeletePet(currentId);
    setConfirmDelete(false);
    // Switch to another pet
    const remaining = pets.filter(p => p.id !== currentId);
    if (remaining.length > 0) {
      selectPetToEdit(remaining[0]);
    } else {
      startCreateNew();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl bg-[#130f28] border border-pink-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl shadow-pink-950/50 z-10 max-h-[92vh] overflow-y-auto text-white"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xl shadow-lg shadow-pink-900/30">
              🐾
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                Configuración de Mascotas
              </h2>
              <p className="text-xs text-slate-400">
                Agrega, edita nombres, avatares y presupuestos
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pet Switcher / Add Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5 no-scrollbar">
          {pets.map((pet) => {
            const isEditingThis = mode === 'edit' && pet.id === currentId;
            return (
              <button
                key={pet.id}
                type="button"
                onClick={() => selectPetToEdit(pet)}
                className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all text-xs font-semibold cursor-pointer shrink-0 ${
                  isEditingThis
                    ? 'bg-pink-600/30 border-pink-400 text-white shadow-md'
                    : 'bg-black/30 border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base">{pet.avatarEmoji}</span>
                <span>{pet.name}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={startCreateNew}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border transition-all text-xs font-bold cursor-pointer shrink-0 ${
              mode === 'create'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 border-pink-300 text-white shadow-lg'
                : 'bg-white/5 hover:bg-white/10 border-dashed border-white/20 text-purple-300'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Nueva Mascota</span>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          
          {/* Live Preview Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colorTheme} flex items-center justify-center text-3xl shadow-lg`}
              >
                {avatarEmoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-white font-display">
                    {name.trim() || 'Nombre de la Mascota'}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 uppercase">
                    {species}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {breed.trim() ? breed : 'Sin raza especificada'} · Presupuesto: {currencySymbol}{monthlyBudget || '0'}/mes
                </p>
              </div>
            </div>

            <span className="text-xs text-pink-400 font-semibold hidden sm:inline-block">
              Vista Previa
            </span>
          </div>

          {/* Name & Species */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nombre de la mascota *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ej. Milo, Luna, Rocky..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Raza o subtítulo (opcional)
              </label>
              <input
                type="text"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                placeholder="ej. Golden Retriever, Siamés..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
          </div>

          {/* Species Chips */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Tipo / Especie
            </label>
            <div className="flex flex-wrap gap-2">
              {speciesOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSpecies(opt.id);
                    // auto pick default emoji if currently default
                    if (['🐕', '🐈', '🐰', '🦜', '🐾'].includes(avatarEmoji)) {
                      setAvatarEmoji(opt.defaultEmoji);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                    species === opt.id
                      ? 'bg-pink-600 border-pink-400 text-white shadow-md'
                      : 'bg-black/30 border-white/10 text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span>{opt.defaultEmoji}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Budget */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Presupuesto mensual estimado ({currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                {currencySymbol}
              </span>
              <input
                type="number"
                min="0"
                step="5"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                placeholder="120"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Para monitorear comidas, visitas al veterinario y necesidades.
            </p>
          </div>

          {/* Avatar Selector (Emojis) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-pink-400" />
                <span>Elegir Avatar (Emoji)</span>
              </label>
              <span className="text-[11px] text-slate-400">Seleccionado: {avatarEmoji}</span>
            </div>
            
            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 max-h-36 overflow-y-auto">
              <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
                {emojiCatalog.map((emoji) => {
                  const isSelected = avatarEmoji === emoji;
                  return (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setAvatarEmoji(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-pink-600 text-white scale-110 shadow-lg ring-2 ring-pink-400'
                          : 'bg-white/5 hover:bg-white/15 text-white'
                      }`}
                    >
                      {emoji}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Color Theme Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span>Color de Fondo y Degradado</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {colorPresets.map((preset) => {
                const isSelected = colorTheme === preset.class;
                return (
                  <button
                    key={preset.class}
                    type="button"
                    onClick={() => setColorTheme(preset.class)}
                    className={`h-11 rounded-xl bg-gradient-to-br ${preset.class} p-1 flex items-center justify-center transition-all cursor-pointer relative ${
                      isSelected ? 'ring-2 ring-white scale-105 shadow-lg' : 'opacity-80 hover:opacity-100'
                    }`}
                    title={preset.label}
                  >
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            {mode === 'edit' && onDeletePet ? (
              <div>
                {!confirmDelete ? (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    disabled={pets.length <= 1}
                    className="px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    title={pets.length <= 1 ? 'No puedes eliminar la única mascota' : 'Eliminar mascota'}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Eliminar</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-rose-300">¿Confirmar?</span>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
                    >
                      Sí, eliminar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-2 py-1 rounded-lg bg-white/10 text-slate-300 text-xs hover:text-white"
                    >
                      No
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-pink-950/50 transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{mode === 'create' ? 'Crear Mascota' : 'Guardar Cambios'}</span>
              </button>
            </div>
          </div>

        </form>
      </motion.div>
    </div>
  );
};
