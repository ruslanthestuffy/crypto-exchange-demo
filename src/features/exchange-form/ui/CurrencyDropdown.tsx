import { observer } from 'mobx-react-lite';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

interface CurrencyDropdownProps {
  label: string;
  value?: string;
  onChange: (currency?: string) => void;
  options: { symbol: string; name: string }[];
  loading: boolean;
}

const CurrencyDropdown = observer(
  ({ label, value, onChange, options, loading }: CurrencyDropdownProps) => {
    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
        value={options.find((o) => o.symbol === value) ?? undefined}
        onChange={(_, newValue) => onChange(newValue?.symbol || undefined)}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: loading ? <CircularProgress size={20} /> : null,
              },
            }}
          />
        )}
        disableClearable
        filterOptions={(opts, { inputValue }) => {
          const query = inputValue.trim().toLowerCase();
          return opts.filter(
            (opt) =>
              opt.symbol.toLowerCase().includes(query) || opt.name.toLowerCase().includes(query)
          );
        }}
        disabled={loading}
        fullWidth
      />
    );
  }
);

export default CurrencyDropdown;
