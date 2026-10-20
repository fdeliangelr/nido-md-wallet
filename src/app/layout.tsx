import type { Metadata } from 'next';
import '../global.css';

export const metadata: Metadata = {
  title: 'Mis Gastos — Finanzas Personales y en Pareja',
  description: 'Landing page dinámica con mockups interactivos de celulares, control de gastos en pareja y conversión de monedas en tiempo real.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
  other: {
    'theme-color': '#0b0a15',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Mis Gastos',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#0b0a15] text-slate-100 antialiased selection:bg-purple-600 selection:text-white overflow-x-hidden font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}