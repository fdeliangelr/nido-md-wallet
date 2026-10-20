import React from 'react';
import { Star, Quote, Heart, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      names: 'Sofía Valenzuela & Mateo R.',
      location: 'Ciudad de México · Viven juntos desde 2024',
      mode: 'pareja',
      avatarInitials: 'S&M',
      avatarBg: 'from-pink-600 to-purple-600',
      quote: 'Antes llegaba el fin de mes y nos pasábamos horas revisando tickets de tarjetas y peleando por quién había pagado la luz o el súper. Con Mis Gastos cada uno anota su parte en 3 segundos y sabemos el saldo exacto.',
      metric: '+$380 USD',
      metricLabel: 'Ahorro promedio mensual identificado',
      rating: 5
    },
    {
      id: '2',
      names: 'Camila Torres',
      location: 'Bogotá, Colombia · Diseñadora Freelance',
      mode: 'personal',
      avatarInitials: 'CT',
      avatarBg: 'from-purple-600 to-indigo-600',
      quote: 'Trabajo como nómada digital y viajo mucho. La función de cambio automático de moneda me salvó la vida; anoto en pesos, dólares o euros sin enloquecer con las tasas de cambio de los bancos.',
      metric: '100% Claridad',
      metricLabel: 'En gastos de viaje en 4 países distintos',
      rating: 5
    },
    {
      id: '3',
      names: 'Diego & Lucía Morales',
      location: 'Buenos Aires, Argentina · Pareja con ingresos dispares',
      mode: 'pareja',
      avatarInitials: 'D&L',
      avatarBg: 'from-violet-600 to-fuchsia-600',
      quote: 'Como tenemos sueldos diferentes, no queríamos dividir todo 50/50. Ajustamos la proporción 60/40 en Mis Gastos y ahora cada uno aporta exactamente lo que corresponde a su bolsillo con total justicia.',
      metric: '0 Conflictos',
      metricLabel: 'Por dinero desde que usan la aplicación',
      rating: 5
    }
  ];

  return (
    <section id="testimonios" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>Historias Reales</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white mb-5">
            Parejas y personas con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              paz mental financiera
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Más de 14,000 personas gestionan sus cuentas compartidas e individuales cada día.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-3xl bg-[#141129] border border-purple-500/20 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-200 leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              <div>
                {/* Metric pill */}
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 mb-6">
                  <span className="text-lg font-black text-white font-display tabular-nums">
                    {t.metric}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    {t.metricLabel}
                  </span>
                </div>

                {/* Author profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.avatarBg} flex items-center justify-center font-bold text-xs text-white shadow-md shrink-0`}>
                    {t.avatarInitials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.names}</h4>
                    <p className="text-[11px] text-slate-400">{t.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global proof stats banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#15112e] to-indigo-950/50 border border-purple-500/30 max-w-4xl mx-auto shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-purple-500/20">
            <div className="pt-2 sm:pt-0">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-display tabular-nums block mb-1">
                +14,200
              </span>
              <span className="text-xs text-slate-300">Cuentas activas en 2026</span>
            </div>
            <div className="pt-4 sm:pt-0 sm:px-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-purple-300 font-display tabular-nums block mb-1">
                4.9 / 5.0
              </span>
              <span className="text-xs text-slate-300">Calificación de satisfacción</span>
            </div>
            <div className="pt-4 sm:pt-0 sm:pl-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-display tabular-nums block mb-1">
                $1.2M USD
              </span>
              <span className="text-xs text-slate-300">Gastos gestionados cada mes</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
