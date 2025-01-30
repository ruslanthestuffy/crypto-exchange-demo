import { Container, Typography } from '@mui/material';
import ExchangeForm from '@features/exchange-form/ui/ExchangeForm.tsx';
import { exchangeStore } from '@entities/exchange/model/exchangeStore.ts';
import { observer } from 'mobx-react-lite';

const ExchangePage = observer(() => {
  return (
    <Container
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ExchangeForm />

      {exchangeStore.availableCurrencies.state !== 'pending' && (
        <>
          <Typography marginTop={2} variant={'h5'}>
            Things I would do if had more than 8 hours
          </Typography>
          <ol>
            <li>Adaptive for all devices</li>
            <li>Test it properly, here are many corner cases</li>
            <li>Add more debounce for clickable and mutable parts (reverse)</li>
            <li>Dockerize repository for security and maintainability</li>
            <li>Add API caching for rates and currencies</li>
            <li>Write Unit Tests</li>
            <li>Add interval refetch for rates (10-20 sec)</li>
            <li>Currencies pre-selection based on search query</li>
            <li>Make better UI (current one is MUI default)</li>
            <li>Improve error handling and add retry options</li>
            <li>Enhance UX with tooltips and util buttons (clear, max, etc..)</li>
            <li>Ensure proper accessibility (ARIA, keyboard navigation)</li>
          </ol>
        </>
      )}
    </Container>
  );
});

export default ExchangePage;
