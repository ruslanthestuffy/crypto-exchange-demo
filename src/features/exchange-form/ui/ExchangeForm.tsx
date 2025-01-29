import { observer } from 'mobx-react-lite';
import { exchangeStore } from '@entities/exchange/model/exchangeStore';
import CurrencyDropdown from './CurrencyDropdown';
import AmountInput from './AmountInput';
import { Box, Button, CircularProgress, IconButton, Paper, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const ExchangeForm = observer(() => {
  const handleSwapCurrencies = () => {
    const temp = exchangeStore.fromCurrency;
    exchangeStore.setFromCurrency(exchangeStore.toCurrency!);
    exchangeStore.setToCurrency(temp!);
  };

  if (exchangeStore.availableCurrencies.state === 'pending') {
    return <CircularProgress sx={{ margin: 'auto' }} />;
  }

  if (exchangeStore.availableCurrencies.state === 'rejected') {
    return <p>Error loading currencies.</p>;
  }

  const currencyOptions = exchangeStore.availableCurrencies.value || [];

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        maxWidth: 500,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CurrencyDropdown
        label="From"
        value={exchangeStore.fromCurrency}
        onChange={exchangeStore.setFromCurrency}
        options={currencyOptions.map((c) => c.symbol.toUpperCase())}
        loading={exchangeStore.isLoadingRate}
      />
      <AmountInput
        value={exchangeStore.fromAmount}
        onChange={exchangeStore.setFromAmount}
        loading={exchangeStore.isLoadingRate}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          onClick={handleSwapCurrencies}
          sx={{ border: '1px solid', borderRadius: '50%', width: 50, height: 50 }}
        >
          <SwapHorizIcon fontSize="large" />
        </IconButton>
      </Box>

      <CurrencyDropdown
        label="To"
        value={exchangeStore.toCurrency}
        onChange={exchangeStore.setToCurrency}
        options={currencyOptions.map((c) => c.symbol.toUpperCase())}
        loading={exchangeStore.isLoadingRate}
      />
      <AmountInput
        value={exchangeStore.toAmount}
        onChange={exchangeStore.setToAmount}
        loading={exchangeStore.isLoadingRate}
      />

      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Typography variant="body1" color="textSecondary">
          Estimated rate:
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          1 {exchangeStore.fromCurrency} ≈ {exchangeStore.exchangeRate?.toFixed(6) || '...'}{' '}
          {exchangeStore.toCurrency}
        </Typography>
      </Box>

      <Button variant="contained" fullWidth disabled={exchangeStore.isLoadingRate}>
        Exchange
      </Button>
    </Paper>
  );
});

export default ExchangeForm;
