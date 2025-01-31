import { Box, Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import ExchangeForm from '@features/exchange-form/ui/ExchangeForm.tsx';
import { exchangeStore } from '@entities/exchange/model/exchangeStore.ts';
import { observer } from 'mobx-react-lite';
import { CheckCircle } from '@mui/icons-material';

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
        pt: 10,
      }}
    >
      <ExchangeForm />

      {exchangeStore.availableCurrencies.state !== 'pending' && (
        <Box sx={{ maxWidth: { xs: '100%', md: 600 }, mt: 6, p: 3, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h5" gutterBottom>
            Implemented Features
          </Typography>

          <List>
            {[
              'Input validations (leading zeros, negative values, min/max, customizable decimals)',
              'Cached coins list API for optimized performance',
              'Interval-based rate refetch',
              'Debounced reverse coins button click',
              'Virtualized coins list for better performance',
              'Autocomplete coin search',
              'Handling different rate amount cases',
              'Currency preselection based on search query',
            ].map((feature, index) => (
              <ListItem key={index}>
                <CheckCircle color="primary" sx={{ mr: 1 }} />
                <ListItemText color={'black'} primary={feature} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Container>
  );
});

export default ExchangePage;
