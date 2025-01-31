import './App.css';
import ExchangePage from '@pages/exchange-page/ui/ExchangePage.tsx';
import { createTheme, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ExchangePage />;
    </ThemeProvider>
  );
}

export default App;
