import { Container, Typography } from '@mui/material';
import ExchangeForm from '@features/exchange-form/ui/ExchangeForm.tsx';
import { exchangeStore } from '@entities/exchange/model/exchangeStore.ts';
import { observer } from 'mobx-react-lite';

const ExchangePage = observer(() => {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
      }}
    >
      <ExchangeForm />

      {exchangeStore.availableCurrencies.state !== 'pending' && (
        <>
          <Typography marginTop={2} variant={'h5'}>
            Total time spend: 8hrs
          </Typography>

          <ol>
            <li>Test it more for all corner cases</li>
            <li>Add API caching for rates and currencies</li>
            <li>Currencies pre-selection based on search query</li>
            <li>Change UI based on provided design</li>
            <li>Enhance UX with tooltips and util buttons (clear, max, etc..)</li>
          </ol>
        </>
      )}
    </Container>
  );
});

export default ExchangePage;
