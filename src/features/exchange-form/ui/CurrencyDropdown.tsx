import { observer } from 'mobx-react-lite';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

interface CurrencyDropdownProps {
  label: string;
  value?: string;
  onChange: (currency?: string) => void;
  options: string[];
  loading: boolean;
}

const CurrencyDropdown = observer(
  ({ label, value, onChange, options, loading }: CurrencyDropdownProps) => {
    return (
      <Autocomplete
        options={options}
        value={value ?? ''}
        onChange={(_, newValue) => onChange(newValue || undefined)}
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
        filterOptions={(opts, { inputValue }) =>
          opts.filter((opt) => opt.toLowerCase().includes(inputValue.toLowerCase()))
        }
        disabled={loading}
      />
    );
  }
);

export default CurrencyDropdown;
