import { makeAutoObservable, runInAction } from 'mobx';
import { fromPromise } from 'mobx-utils';
import { fetchAvailableCurrencies, fetchExchangeRate } from '@shared/api/exchangeApi.ts';
import { debounce } from 'lodash';

class ExchangeStore {
  fromCurrency: string | null = null;
  toCurrency: string | null = null;
  fromAmount = 1;
  toAmount = 0;
  availableCurrencies = fromPromise(fetchAvailableCurrencies());
  exchangeRate: number | null = null;
  isLoadingRate = false;

  constructor() {
    makeAutoObservable(this, {
      swapCurrencies: false,
    });

    this.swapCurrencies = debounce(this._swapCurrencies, 300, {
      leading: true,
      trailing: false,
    });

    this.initializeCurrencies();
  }

  updateSearchParams() {
    const params = new URLSearchParams(window.location.search);

    if (this.fromCurrency) {
      params.set('from', this.fromCurrency);
    } else {
      params.delete('from');
    }

    if (this.toCurrency) {
      params.set('to', this.toCurrency);
    } else {
      params.delete('to');
    }

    window.history.replaceState(null, '', `?${params.toString()}`);
  }

  parseSearchParams() {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const to = params.get('to');
    return { from, to };
  }

  async initializeCurrencies() {
    const { from, to } = this.parseSearchParams();
    const data = await this.availableCurrencies;

    runInAction(() => {
      if (data.length >= 2) {
        const upperFrom = from?.toUpperCase();
        const upperTo = to?.toUpperCase();

        const validFrom =
          data.find((c) => c.symbol.toUpperCase() === upperFrom)?.symbol || data[0].symbol;
        let validTo =
          data.find((c) => c.symbol.toUpperCase() === upperTo)?.symbol || data[1].symbol;

        if (validFrom === validTo) {
          validTo = data.find((c) => c.symbol !== validFrom)?.symbol || data[1].symbol;
        }

        this.fromCurrency = validFrom;
        this.toCurrency = validTo;
        this.updateExchangeRate();
        this.updateSearchParams();
      }
    });
  }

  setFromCurrency = (currency: string | null) => {
    if (!currency) return;

    if (currency === this.toCurrency) {
      this.toCurrency = null;
    }

    this.fromCurrency = currency;
    this.updateExchangeRate();
    this.updateSearchParams();
  };

  setToCurrency = (currency: string | null) => {
    if (!currency) return;

    if (currency === this.fromCurrency) {
      this.fromCurrency = null;
    }

    this.toCurrency = currency;
    this.updateExchangeRate();
    this.updateSearchParams();
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

  private _swapCurrencies = () => {
    runInAction(() => {
      if (!this.fromCurrency || !this.toCurrency) return;

      [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
      this.updateExchangeRate();
      this.updateSearchParams();
    });
  };

  // Debounced method (overwritten in constructor)
  swapCurrencies!: () => void;

  updateExchangeRate = async () => {
    if (!this.fromCurrency || !this.toCurrency || this.isLoadingRate) return;

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
