import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, CircularProgress, IconButton, Paper, Stack } from '@mui/material';
import { SwapVert } from '@mui/icons-material';
import { useInterval } from 'usehooks-ts';
import { exchangeStore } from '@features/exchange/model/exchangeStore.ts';
import CurrencyDropdown from './CurrencyDropdown.tsx';
import AmountInput from './AmountInput.tsx';
import ExchangeRateDisplay from '@features/exchange/ui/ExchangeRateDisplay.tsx';

const ExchangeForm = observer(() => {
  // Track how many dropdowns are open (if at least one is open, we pause the refetch)
  const [dropdownOpenCount, setDropdownOpenCount] = useState(0);
  const isDropdownFocused = dropdownOpenCount > 0;

  const handleDropdownOpen = () => setDropdownOpenCount((count) => count + 1);
  const handleDropdownClose = () => setDropdownOpenCount((count) => Math.max(count - 1, 0));

  useInterval(() => {
    if (!isDropdownFocused) {
      exchangeStore.updateExchangeRate();
    }
  }, 20 * 1000);

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
        {dropdownOpenCount}
        {String(isDropdownFocused)}
        <CurrencyDropdown
          value={exchangeStore.fromCurrency}
          onChange={exchangeStore.setFromCurrency}
          options={currencyOptions}
          isLoading={exchangeStore.isLoadingRate}
          onOpen={handleDropdownOpen}
          onClose={handleDropdownClose}
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
          onOpen={handleDropdownOpen}
          onClose={handleDropdownClose}
        />
      </Stack>

      <ExchangeRateDisplay />
    </Paper>
  );
});

export default ExchangeForm;
