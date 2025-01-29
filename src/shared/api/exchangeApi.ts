export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
}

const API_KEY = import.meta.env.VITE_COINMARKETCAP_API_KEY;

export const fetchAvailableCurrencies = async (): Promise<CryptoCurrency[]> => {
  try {
    const response = await fetch('/api/cryptocurrency/map', {
      headers: { 'X-CMC_PRO_API_KEY': API_KEY },
    });
    const data = await response.json();
    return data.data.map((coin: { id: number; symbol: string; name: string }) => ({
      id: coin.id.toString(),
      symbol: coin.symbol,
      name: coin.name,
    }));
  } catch (error) {
    console.error('Error fetching currencies:', error);
    return [];
  }
};

export const fetchExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number | null> => {
  try {
    const response = await fetch(
      `/api/cryptocurrency/quotes/latest?symbol=${fromCurrency},${toCurrency}`,
      {
        headers: { 'X-CMC_PRO_API_KEY': API_KEY },
      }
    );
    const data = await response.json();
    const fromPrice = data.data[fromCurrency]?.quote?.USD?.price;
    const toPrice = data.data[toCurrency]?.quote?.USD?.price;
    return fromPrice && toPrice ? fromPrice / toPrice : null;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return null;
  }
};
