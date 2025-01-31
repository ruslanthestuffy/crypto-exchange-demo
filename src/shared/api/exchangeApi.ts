import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
}

const API_KEY = import.meta.env.VITE_COINMARKETCAP_API_KEY;

const api = setupCache(
  axios.create({
    baseURL: '/api',
    headers: { 'X-CMC_PRO_API_KEY': API_KEY },
  }),
  {
    ttl: 5 * 60 * 1000, // Cache duration: 5 minutes
    interpretHeader: false, // Ignore cache headers from the server
    methods: ['get'], // Cache only GET requests
  }
);

/**
 * Fetches available cryptocurrencies with caching.
 */
export const fetchAvailableCurrencies = async (): Promise<CryptoCurrency[]> => {
  try {
    const response = await api.get('/cryptocurrency/map');

    console.log(response);
    if (response.cached) {
      console.log('Returning cached cryptocurrency list');
    } else {
      console.log('Fetching fresh cryptocurrency list');
    }

    return response.data.data.map((coin: { id: number; symbol: string; name: string }) => ({
      id: coin.id.toString(),
      symbol: coin.symbol,
      name: coin.name,
    }));
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return [];
  }
};

/**
 * Fetches the exchange rate between two currencies (caching disabled).
 */
export const fetchExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> => {
  try {
    const { data } = await api.get('/cryptocurrency/quotes/latest', {
      params: { symbol: `${fromCurrency},${toCurrency}` },
      cache: false,
    });

    const fromPrice = data.data[fromCurrency]?.quote?.USD?.price;
    const toPrice = data.data[toCurrency]?.quote?.USD?.price;

    return fromPrice && toPrice ? fromPrice / toPrice : null;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
};
