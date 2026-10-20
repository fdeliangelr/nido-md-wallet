import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Heart, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose, onSuccessLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [partnerInvite, setPartnerInvite] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Keep state in sync if initialMode changes
  React.useEffect(() => {
    setMode(initialMode);
    setSubmitted(false);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitted(true);
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
        className="relative w-full max-w-md rounded-3xl bg-[#141129] border border-purple-500/30 p-6 sm:p-8 shadow-2xl z-10 text-white overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold font-display text-white">
              {mode === 'register' ? '¡Cuenta creada con éxito!' : '¡Bienvenido de vuelta!'}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xs mx-auto">
              {mode === 'register'
                ? `Hemos preparado tu espacio financiero. Revisa tu correo (${email}) para activar tu código de invitación para tu pareja.`
                : `Sesión iniciada correctamente como ${email}. Cargando tus finanzas sincronizadas...`}
            </p>

            <button
              onClick={() => {
                onClose();
                onSuccessLogin();
              }}
              className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
            >
              <span>Entrar al Dashboard de la App</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">Mis Gastos</h3>
                <p className="text-xs text-slate-400">Tu gestor financiero inteligente</p>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-black/40 rounded-xl border border-white/5 text-xs font-semibold mb-6">
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Crear Cuenta
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Iniciar Sesión
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Sofía"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>

              {mode === 'register' && (
                <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={partnerInvite}
                    onChange={(e) => setPartnerInvite(e.target.checked)}
                    className="mt-0.5 rounded border-purple-500 text-purple-600 accent-purple-600"
                  />
                  <span className="text-xs text-slate-300 leading-tight">
                    Quiero generar un enlace de invitación para vincular a mi pareja de inmediato.
                  </span>
                </label>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>{mode === 'register' ? 'Empezar gratis ahora' : 'Acceder a mi cuenta'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Instant Demo Access Button */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSuccessLogin();
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/20 text-purple-300 hover:text-white font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>⚡ O probar directamente como Sofía & Mateo (Demo)</span>
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Conexión cifrada de punto a punto · 100% Privado</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
