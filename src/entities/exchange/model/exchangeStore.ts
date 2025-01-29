import { makeAutoObservable } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { fetchAvailableCurrencies, fetchExchangeRate } from '@shared/api/exchangeApi';

class ExchangeStore {
  fromCurrency?: string;
  toCurrency?: string;
  fromAmount = 1;
  toAmount = 0;
  availableCurrencies = fromPromise(fetchAvailableCurrencies());
  exchangeRate: number | null = null;
  isLoadingRate = false;

  constructor() {
    makeAutoObservable(this);
    this.availableCurrencies.then((data) => {
      if (data.length >= 2) {
        this.fromCurrency = data[0].symbol;
        this.toCurrency = data[1].symbol;
        this.updateExchangeRate();
      }
    });
  }

  setFromCurrency = (currency: string) => {
    this.fromCurrency = currency;
    this.updateExchangeRate();
  };

  setToCurrency = (currency: string) => {
    this.toCurrency = currency;
    this.updateExchangeRate();
  };

  setFromAmount = (value: number) => {
    this.fromAmount = value;
    if (this.exchangeRate) {
      this.toAmount = parseFloat((value * this.exchangeRate).toFixed(6));
    }
  };

  setToAmount = (value: number) => {
    this.toAmount = value;
    if (this.exchangeRate) {
      this.fromAmount = parseFloat((value / this.exchangeRate).toFixed(6));
    }
  };

  updateExchangeRate = async () => {
    if (!this.fromCurrency || !this.toCurrency) return 0;
    this.isLoadingRate = true;

    const rate = await fetchExchangeRate(this.fromCurrency, this.toCurrency);

    if (rate) {
      this.exchangeRate = rate;
      this.toAmount = parseFloat((this.fromAmount * rate).toFixed(6));
    }
    this.isLoadingRate = false;
  };
}

export const exchangeStore = new ExchangeStore();
