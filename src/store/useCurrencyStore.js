import { create } from 'zustand';

export const CURRENCY_RATES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, name: 'US Dollar (USD)' },
  EUR: { code: 'EUR', symbol: '�', rate: 0.92, name: 'Euro (EUR)' },
  GBP: { code: 'GBP', symbol: '�', rate: 0.79, name: 'British Pound (GBP)' },
  INR: { code: 'INR', symbol: '?', rate: 86.5, name: 'Indian Rupee (INR)' },
  JPY: { code: 'JPY', symbol: '�', rate: 154.0, name: 'Japanese Yen (JPY)' }
};

export const useCurrencyStore = create((set, get) => ({
  currency: JSON.parse(localStorage.getItem('aurastore_currency') || JSON.stringify(CURRENCY_RATES.USD)),

  setCurrency: (currencyCode) => {
    const target = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.USD;
    localStorage.setItem('aurastore_currency', JSON.stringify(target));
    set({ currency: target });
  },

  formatPrice: (amountInUSD) => {
    const { symbol, rate, code } = get().currency;
    const converted = amountInUSD * rate;
    
    if (code === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    } else if (code === 'INR') {
      return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  }
}));
