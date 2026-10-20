import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo funciona si mi pareja y yo tenemos teléfonos diferentes (uno iPhone y otro Android)?',
      a: 'Funciona exactamente igual y sin ninguna limitación. Ambos instalan la app como PWA desde su navegador preferido (Safari o Chrome), se vinculan con una invitación y todos los gastos y saldos se sincronizan en la nube en milisegundos.'
    },
    {
      q: '¿Qué pasa si uno gana más dinero que el otro?',
      a: 'Mis Gastos incluye división proporcional flexible. Si pactan aportar en base a sus ingresos (por ejemplo, 60% uno y 40% el otro), la app calcula automáticamente esa relación en cada ticket o gasto mensual.'
    },
    {
      q: '¿Mi pareja puede ver mis compras privadas o regalos sorpresa?',
      a: 'No. Cada movimiento tiene un interruptor claro: "Compartido" o "Personal". Todo lo que clasifiques como personal permanece estrictamente privado en tu perfil.'
    },
    {
      q: '¿Cómo funciona la conversión de moneda en viajes al extranjero?',
      a: 'Mis Gastos detecta tu moneda local o te permite seleccionar cualquier divisa del mundo (EUR, USD, MXN, COP, etc.). Tú ingresas el importe en la moneda del país donde estás y el balance conjunto se calcula en la moneda principal de la pareja sin fórmulas manuales.'
    },
    {
      q: '¿Realmente funciona sin conexión a internet?',
      a: 'Sí. Si estás en un avión, metro o en una zona sin cobertura, puedes anotar tus compras con total normalidad. Los datos se guardan en tu dispositivo y se sincronizan apenas recuperes conexión.'
    }
  ];

  return (
    <section className="py-20 relative bg-[#090812]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/60 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Preguntas Frecuentes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white mb-4">
            Todo lo que necesitas saber
          </h2>
          <p className="text-base text-slate-300">
            Respuestas directas sobre el funcionamiento diario de Mis Gastos.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#141129] border border-purple-500/20 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-slate-100 hover:text-white font-semibold text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
