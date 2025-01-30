import { observer } from 'mobx-react-lite';
import { exchangeStore } from '@entities/exchange/model/exchangeStore';
import { Box, Typography } from '@mui/material';
import { MAX_DECIMALS, MIN_VALUE } from '@features/exchange-form/config/amountInput.ts';

const ExchangeRateDisplay = observer(() => {
  const { fromCurrency, toCurrency, exchangeRate } = exchangeStore;

  let formattedRate = '...';

  if (exchangeRate !== null) {
    if (exchangeRate < MIN_VALUE) {
      formattedRate = `< ${MIN_VALUE}`;
    } else {
      formattedRate = exchangeRate.toFixed(MAX_DECIMALS);
    }
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 1 }}>
      <Typography variant="body1" color="textSecondary">
        Estimated rate:
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        1 {fromCurrency} ≈ {formattedRate} {toCurrency}
      </Typography>
    </Box>
  );
});

export default ExchangeRateDisplay;
