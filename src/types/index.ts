export type CurrencyCode = 'USD' | 'EUR' | 'MXN' | 'COP' | 'ARS' | 'CLP' | 'PEN';

export interface CurrencyRate {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rateToUsd: number; // 1 USD = rateToUsd
}

export interface Transaction {
  id: string;
  title: string;
  category: 'supermercado' | 'restaurante' | 'hogar' | 'ocio' | 'transporte' | 'servicios';
  amount: number;
  currency: CurrencyCode;
  paidBy: 'Sofia' | 'Mateo' | 'Yo';
  splitType: '50_50' | 'proportional' | 'solo';
  date: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  names: string;
  location: string;
  mode: 'pareja' | 'personal';
  avatarInitials: string;
  avatarBg: string;
  quote: string;
  metric: string;
  metricLabel: string;
  rating: number;
}

export type PetSpecies = 'perro' | 'gato' | 'conejo' | 'ave' | 'otro';

export type PetExpenseCategory = 
  | 'comida' 
  | 'veterinario' 
  | 'higiene' 
  | 'juguetes' 
  | 'medicinas' 
  | 'guarderia';

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  colorTheme: string;
  avatarEmoji: string;
  monthlyBudget: number;
  spentThisMonth: number;
}

export interface PetExpense {
  id: string;
  petId: string;
  petName: string;
  concept: string;
  category: PetExpenseCategory;
  amount: number;
  currency: CurrencyCode;
  paidBy: 'Sofía' | 'Mateo' | 'Yo' | string;
  split: '50_50' | 'solo';
  date: string;
}

export interface PartnerProfile {
  name: string;
  avatarEmoji: string;
  avatarType: 'emoji' | 'initial';
  colorTheme: string;
}

export interface CoupleSettings {
  partner1: PartnerProfile;
  partner2: PartnerProfile;
  pairName: string;
}


