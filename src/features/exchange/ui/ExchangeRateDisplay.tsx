import { observer } from 'mobx-react-lite';
import { exchangeStore } from '@features/exchange/model/exchangeStore.ts';
import { Box, Typography } from '@mui/material';
import { MAX_DECIMALS, MIN_VALUE } from '@features/exchange/config/amountInput.ts';

export function getExchangeRateDisplay(
  fromCurrency: string | null,
  toCurrency: string | null,
  exchangeRate: number | null,
  isLoadingRate: boolean
): { formattedRate: string; displayText: string } {
  if (!fromCurrency || !toCurrency) {
    return { formattedRate: '...', displayText: 'Select currencies to see the rate' };
  }

  if (isLoadingRate) {
    return { formattedRate: '...', displayText: 'Loading rate...' };
  }

  if (exchangeRate === null) {
    return { formattedRate: '...', displayText: 'Exchange rate unavailable' };
  }

  if (exchangeRate < MIN_VALUE) {
    return { formattedRate: `< ${MIN_VALUE}`, displayText: 'Exchange rate too low' };
  }

  return { formattedRate: exchangeRate.toFixed(MAX_DECIMALS), displayText: 'Estimated rate:' };
}

const ExchangeRateDisplay = observer(() => {
  const { fromCurrency, toCurrency, exchangeRate, isLoadingRate } = exchangeStore;
  const { formattedRate, displayText } = getExchangeRateDisplay(
    fromCurrency,
    toCurrency,
    exchangeRate,
    isLoadingRate
  );

  return (
    <Box sx={{ textAlign: 'center', mt: 1 }}>
      <Typography variant="body1" color="textSecondary">
        {displayText}
      </Typography>
      {fromCurrency && toCurrency && (
        <Typography variant="h6" fontWeight="bold">
          1 {fromCurrency} ≈ {formattedRate} {toCurrency}
        </Typography>
      )}
    </Box>
  );
});

export default ExchangeRateDisplay;
