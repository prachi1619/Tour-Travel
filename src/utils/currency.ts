import axios from 'axios';

const EXCHANGE_API_KEY = process.env.REACT_APP_EXCHANGE_API_KEY;
const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest';

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  lastUpdated: string;
}

export const getExchangeRate = async (from: string, to: string): Promise<ExchangeRate> => {
  try {
    const response = await axios.get(`${EXCHANGE_API_BASE}/${from}`);
    
    return {
      from,
      to,
      rate: response.data.rates[to],
      lastUpdated: new Date(response.data.time_last_updated * 1000).toLocaleString()
    };
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
};

export const convertCurrency = (amount: number, rate: number): number => {
  return Number((amount * rate).toFixed(2));
}; 