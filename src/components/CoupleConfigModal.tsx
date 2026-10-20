import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Check, RefreshCw, Palette, User } from 'lucide-react';
import { CoupleSettings, PartnerProfile } from '../types';

interface CoupleConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings: CoupleSettings;
  onSave: (newSettings: CoupleSettings) => void;
}

export const CoupleConfigModal: React.FC<CoupleConfigModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onSave
}) => {
  const [partner1Name, setPartner1Name] = useState(currentSettings.partner1.name);
  const [partner1AvatarType, setPartner1AvatarType] = useState<'initial' | 'emoji'>(currentSettings.partner1.avatarType || 'initial');
  const [partner1Emoji, setPartner1Emoji] = useState(currentSettings.partner1.avatarEmoji || '👩‍🦰');
  const [partner1Color, setPartner1Color] = useState(currentSettings.partner1.colorTheme || 'from-pink-500 to-purple-600');

  const [partner2Name, setPartner2Name] = useState(currentSettings.partner2.name);
  const [partner2AvatarType, setPartner2AvatarType] = useState<'initial' | 'emoji'>(currentSettings.partner2.avatarType || 'initial');
  const [partner2Emoji, setPartner2Emoji] = useState(currentSettings.partner2.avatarEmoji || '👨‍🦱');
  const [partner2Color, setPartner2Color] = useState(currentSettings.partner2.colorTheme || 'from-blue-500 to-indigo-600');

  const [pairName, setPairName] = useState(currentSettings.pairName || `${currentSettings.partner1.name} & ${currentSettings.partner2.name}`);

  // Re-sync on open
  React.useEffect(() => {
    if (isOpen) {
      setPartner1Name(currentSettings.partner1.name);
      setPartner1AvatarType(currentSettings.partner1.avatarType || 'initial');
      setPartner1Emoji(currentSettings.partner1.avatarEmoji || '👩‍🦰');
      setPartner1Color(currentSettings.partner1.colorTheme || 'from-pink-500 to-purple-600');

      setPartner2Name(currentSettings.partner2.name);
      setPartner2AvatarType(currentSettings.partner2.avatarType || 'initial');
      setPartner2Emoji(currentSettings.partner2.avatarEmoji || '👨‍🦱');
      setPartner2Color(currentSettings.partner2.colorTheme || 'from-blue-500 to-indigo-600');

      setPairName(currentSettings.pairName || `${currentSettings.partner1.name} & ${currentSettings.partner2.name}`);
    }
  }, [isOpen, currentSettings]);

  if (!isOpen) return null;

  const colorThemesP1 = [
    { label: 'Rosa & Púrpura', class: 'from-pink-500 to-purple-600' },
    { label: 'Violeta & Fucsia', class: 'from-violet-500 to-fuchsia-600' },
    { label: 'Esmeralda', class: 'from-emerald-500 to-teal-600' },
    { label: 'Ámbar Cálido', class: 'from-amber-500 to-orange-600' },
    { label: 'Rojo Rubí', class: 'from-rose-500 to-red-600' }
  ];

  const colorThemesP2 = [
    { label: 'Azul & Índigo', class: 'from-blue-500 to-indigo-600' },
    { label: 'Cian & Turquesa', class: 'from-cyan-500 to-blue-600' },
    { label: 'Morado Real', class: 'from-purple-600 to-violet-800' },
    { label: 'Verde Menta', class: 'from-teal-500 to-emerald-600' },
    { label: 'Titanio', class: 'from-slate-600 to-slate-800' }
  ];

  const emojisP1 = ['👩‍🦰', '👩', '👧', '👱‍♀️', '👩‍💻', '🌸', '👑', '✨', '🦊', '💜'];
  const emojisP2 = ['👨‍🦱', '👨', '👦', '👱‍♂️', '👨‍💻', '⚡', '🚀', '🦁', '💎', '💙'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const finalP1Name = partner1Name.trim() || 'Pareja 1';
    const finalP2Name = partner2Name.trim() || 'Pareja 2';

    const updated: CoupleSettings = {
      partner1: {
        name: finalP1Name,
        avatarEmoji: partner1Emoji,
        avatarType: partner1AvatarType,
        colorTheme: partner1Color
      },
      partner2: {
        name: finalP2Name,
        avatarEmoji: partner2Emoji,
        avatarType: partner2AvatarType,
        colorTheme: partner2Color
      },
      pairName: pairName.trim() || `${finalP1Name} & ${finalP2Name}`
    };

    onSave(updated);
    onClose();
  };

  const handleReset = () => {
    setPartner1Name('Sofía');
    setPartner1AvatarType('initial');
    setPartner1Emoji('👩‍🦰');
    setPartner1Color('from-pink-500 to-purple-600');

    setPartner2Name('Mateo');
    setPartner2AvatarType('initial');
    setPartner2Emoji('👨‍🦱');
    setPartner2Color('from-blue-500 to-indigo-600');

    setPairName('Sofía & Mateo');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg rounded-3xl bg-[#15122e] border border-purple-500/30 p-6 sm:p-7 shadow-2xl z-10 text-white max-h-[92vh] overflow-y-auto no-scrollbar"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-pink-500/40" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-display text-white">Configurar Pareja</h3>
            <p className="text-xs text-slate-400">Personaliza los nombres, colores y avatares de ambos</p>
          </div>
        </div>

        {/* LIVE INTERACTIVE PREVIEW */}
        <div className="p-4 rounded-2xl bg-black/40 border border-purple-500/30 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-tr ${partner1Color} border-2 border-[#15122e] flex items-center justify-center font-bold text-sm text-white shadow-lg`}
              >
                {partner1AvatarType === 'emoji' ? partner1Emoji : (partner1Name.charAt(0).toUpperCase() || 'S')}
              </div>
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-tr ${partner2Color} border-2 border-[#15122e] flex items-center justify-center font-bold text-sm text-white shadow-lg`}
              >
                {partner2AvatarType === 'emoji' ? partner2Emoji : (partner2Name.charAt(0).toUpperCase() || 'M')}
              </div>
            </div>

            <div>
              <p className="text-sm font-extrabold text-white font-display flex items-center gap-1.5">
                <span>{pairName || `${partner1Name || 'Pareja 1'} & ${partner2Name || 'Pareja 2'}`}</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </p>
              <p className="text-[11px] text-slate-400">
                {partner1Name || 'Pareja 1'} y {partner2Name || 'Pareja 2'} sincronizados
              </p>
            </div>
          </div>

          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Vista Previa
          </span>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Pair Title Input */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Nombre o Apodo de la Pareja
            </label>
            <input
              type="text"
              value={pairName}
              onChange={(e) => setPairName(e.target.value)}
              placeholder="Ej. Sofía & Mateo 💕"
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* PARTNER 1 CONFIGURATION */}
          <div className="p-4 rounded-2xl bg-[#110e26] border border-white/5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                Pareja 1 (Tu Perfil o Primer Miembro)
              </span>

              {/* Avatar Type Selector */}
              <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setPartner1AvatarType('initial')}
                  className={`px-2 py-0.5 rounded font-medium transition-all ${
                    partner1AvatarType === 'initial' ? 'bg-pink-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Inicial
                </button>
                <button
                  type="button"
                  onClick={() => setPartner1AvatarType('emoji')}
                  className={`px-2 py-0.5 rounded font-medium transition-all ${
                    partner1AvatarType === 'emoji' ? 'bg-pink-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Emoji
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Nombre</label>
              <input
                type="text"
                required
                value={partner1Name}
                onChange={(e) => setPartner1Name(e.target.value)}
                placeholder="Ej. Sofía"
                className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-pink-400 font-semibold"
              />
            </div>

            {/* Emojis selection if emoji mode */}
            {partner1AvatarType === 'emoji' && (
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Elige un avatar emoji</label>
                <div className="flex flex-wrap gap-1.5">
                  {emojisP1.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setPartner1Emoji(em)}
                      className={`w-8 h-8 rounded-xl text-base flex items-center justify-center border transition-all ${
                        partner1Emoji === em
                          ? 'bg-pink-600/40 border-pink-400 scale-110 shadow-md'
                          : 'bg-black/30 border-white/5 hover:border-pink-500/30'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Gradient Theme Picker */}
            <div>
              <label className="text-[11px] text-slate-400 block mb-1.5">Color del Avatar</label>
              <div className="flex gap-2">
                {colorThemesP1.map((theme) => (
                  <button
                    key={theme.class}
                    type="button"
                    onClick={() => setPartner1Color(theme.class)}
                    className={`w-7 h-7 rounded-full bg-gradient-to-tr ${theme.class} border-2 transition-all ${
                      partner1Color === theme.class ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    title={theme.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* PARTNER 2 CONFIGURATION */}
          <div className="p-4 rounded-2xl bg-[#110e26] border border-white/5 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                Pareja 2 (Segundo Miembro / Cónyuge)
              </span>

              {/* Avatar Type Selector */}
              <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setPartner2AvatarType('initial')}
                  className={`px-2 py-0.5 rounded font-medium transition-all ${
                    partner2AvatarType === 'initial' ? 'bg-blue-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Inicial
                </button>
                <button
                  type="button"
                  onClick={() => setPartner2AvatarType('emoji')}
                  className={`px-2 py-0.5 rounded font-medium transition-all ${
                    partner2AvatarType === 'emoji' ? 'bg-blue-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Emoji
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Nombre</label>
              <input
                type="text"
                required
                value={partner2Name}
                onChange={(e) => setPartner2Name(e.target.value)}
                placeholder="Ej. Mateo"
                className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-blue-400 font-semibold"
              />
            </div>

            {/* Emojis selection if emoji mode */}
            {partner2AvatarType === 'emoji' && (
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Elige un avatar emoji</label>
                <div className="flex flex-wrap gap-1.5">
                  {emojisP2.map((em) => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setPartner2Emoji(em)}
                      className={`w-8 h-8 rounded-xl text-base flex items-center justify-center border transition-all ${
                        partner2Emoji === em
                          ? 'bg-blue-600/40 border-blue-400 scale-110 shadow-md'
                          : 'bg-black/30 border-white/5 hover:border-blue-500/30'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Gradient Theme Picker */}
            <div>
              <label className="text-[11px] text-slate-400 block mb-1.5">Color del Avatar</label>
              <div className="flex gap-2">
                {colorThemesP2.map((theme) => (
                  <button
                    key={theme.class}
                    type="button"
                    onClick={() => setPartner2Color(theme.class)}
                    className={`w-7 h-7 rounded-full bg-gradient-to-tr ${theme.class} border-2 transition-all ${
                      partner2Color === theme.class ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    title={theme.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Por Defecto</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:brightness-110 rounded-xl font-bold text-xs text-white shadow-lg shadow-purple-600/30 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>Guardar Configuración</span>
            </button>
          </div>

        </form>

      </motion.div>
    </div>
  );
};
