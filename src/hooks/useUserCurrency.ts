import { useState, useEffect } from 'react';

export function useUserCurrency() {
  const [currency, setCurrency] = useState('USD');
  const [locale, setLocale] = useState('en-US');

  useEffect(() => {
    // Detectar el idioma/región del navegador del usuario (ej. 'es-AR', 'es-MX', 'en-US')
    const userLocale = navigator.language || 'es-AR';
    setLocale(userLocale);

    // Mapeo simple de regiones comunes a monedas
    if (userLocale.includes('AR')) {
      setCurrency('ARS');
    } else if (userLocale.includes('MX')) {
      setCurrency('MXN');
    } else if (userLocale.includes('CO')) {
      setCurrency('COP');
    } else if (userLocale.includes('ES') || userLocale.includes('EU')) {
      setCurrency('EUR');
    } else {
      setCurrency('USD'); // Moneda por defecto internacional
    }
  }, []);

  // Función para formatear cualquier número a la moneda detectada
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return { currency, formatMoney };
}