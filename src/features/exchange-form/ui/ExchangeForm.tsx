import { observer } from 'mobx-react-lite';
import { exchangeStore } from '@entities/exchange/model/exchangeStore';
import CurrencyDropdown from './CurrencyDropdown';
import AmountInput from './AmountInput';
import { Box, CircularProgress, IconButton, Paper, Stack } from '@mui/material';
import { SwapVert } from '@mui/icons-material';
import ExchangeRateDisplay from '@features/exchange-form/ui/ExchangeRateDisplay.tsx';
import { useInterval } from 'usehooks-ts';

const ExchangeForm = observer(() => {
  useInterval(exchangeStore.updateExchangeRate, 200 * 1000);

  if (exchangeStore.availableCurrencies.state === 'pending') {
    return <CircularProgress sx={{ margin: '0 auto' }} />;
  }

  if (exchangeStore.availableCurrencies.state === 'rejected') {
    return <p>Error loading currencies.</p>;
  }

  const currencyOptions = exchangeStore.availableCurrencies.value || [];
  const isBothCurrencySelected = exchangeStore.fromCurrency && exchangeStore.toCurrency;

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3 },
        width: '100%',
        maxWidth: { xs: '100%', md: 600 },
        margin: { md: '0 auto' },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <AmountInput
          label="You send"
          value={exchangeStore.fromAmount}
          onChange={exchangeStore.setFromAmount}
          isLoading={exchangeStore.isLoadingRate}
          disabled={!isBothCurrencySelected}
        />
        <CurrencyDropdown
          value={exchangeStore.fromCurrency}
          onChange={exchangeStore.setFromCurrency}
          options={currencyOptions}
          isLoading={exchangeStore.isLoadingRate}
        />
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton
          onClick={exchangeStore.swapCurrencies}
          sx={{
            border: '1px solid',
            borderRadius: '50%',
            width: 50,
            height: 50,
          }}
        >
          <SwapVert fontSize="large" />
        </IconButton>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        <AmountInput
          label="You get"
          value={exchangeStore.toAmount}
          onChange={exchangeStore.setToAmount}
          isLoading={exchangeStore.isLoadingRate}
          disabled={!isBothCurrencySelected}
        />
        <CurrencyDropdown
          value={exchangeStore.toCurrency}
          onChange={exchangeStore.setToCurrency}
          options={currencyOptions}
          isLoading={exchangeStore.isLoadingRate}
        />
      </Stack>

      <ExchangeRateDisplay />
    </Paper>
  );
});

export default ExchangeForm;
