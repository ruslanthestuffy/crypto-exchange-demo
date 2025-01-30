import { makeAutoObservable, runInAction } from 'mobx';
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
    this.initializeCurrencies();
  }

  async initializeCurrencies() {
    const data = await this.availableCurrencies;

    runInAction(() => {
      if (data.length >= 2) {
        this.fromCurrency = data[0].symbol;
        this.toCurrency = data[1].symbol;
        this.updateExchangeRate();
      }
    });
  }

  setFromCurrency = (currency?: string) => {
    if (!currency || currency === this.toCurrency) return;
    this.fromCurrency = currency;
    this.updateExchangeRate();
  };

  setToCurrency = (currency?: string) => {
    if (!currency || currency === this.fromCurrency) return;
    this.toCurrency = currency;
    this.updateExchangeRate();
  };

  setFromAmount = (value: number) => {
    if (value < 0) return;
    this.fromAmount = value;
    if (this.exchangeRate) {
      this.toAmount = parseFloat((value * this.exchangeRate).toFixed(6));
    }
  };

  setToAmount = (value: number) => {
    if (value < 0) return;
    this.toAmount = value;
    if (this.exchangeRate) {
      this.fromAmount = parseFloat((value / this.exchangeRate).toFixed(6));
    }
  };

  swapCurrencies = () => {
    if (!this.fromCurrency || !this.toCurrency) return;
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    this.updateExchangeRate();
  };

  updateExchangeRate = async () => {
    if (!this.fromCurrency || !this.toCurrency) return;
    this.isLoadingRate = true;

    const rate = await fetchExchangeRate(this.fromCurrency, this.toCurrency);
    runInAction(() => {
      if (rate) {
        this.exchangeRate = rate;
        this.toAmount = parseFloat((this.fromAmount * rate).toFixed(6));
      }
      this.isLoadingRate = false;
    });
  };
}

export const exchangeStore = new ExchangeStore();
