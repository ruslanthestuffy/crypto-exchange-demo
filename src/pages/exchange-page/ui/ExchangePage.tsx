import { Container } from '@mui/material';
import ExchangeForm from '@features/exchange-form/ui/ExchangeForm.tsx';

const ExchangePage = () => {
  return (
    <Container
      sx={{
        bgcolor: '#2c2b2b',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ExchangeForm />
    </Container>
  );
};

export default ExchangePage;
