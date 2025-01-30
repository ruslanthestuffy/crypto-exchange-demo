import { observer } from 'mobx-react-lite';
import { Autocomplete, TextField, Typography } from '@mui/material';

interface CurrencyDropdownProps {
  label?: string;
  value?: string;
  onChange: (currency?: string) => void;
  options: { symbol: string; name: string }[];
  isLoading: boolean;
}

const CurrencyDropdown = observer(
  ({ label, value, onChange, options, isLoading }: CurrencyDropdownProps) => {
    return (
      <Autocomplete
        fullWidth
        sx={{ maxWidth: 220 }}
        options={options}
        value={options.find((o) => o.symbol === value) ?? undefined}
        onChange={(_, newValue) => onChange(newValue?.symbol || undefined)}
        getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
        renderOption={(props, option) => {
          return (
            <Typography {...props} key={option.name + option.symbol}>
              {option.symbol} - {option.name}
            </Typography>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            slotProps={{
              input: {
                ...params.InputProps,
              },
            }}
          />
        )}
        disableClearable
        autoHighlight
        // filterOptions={(opts, { inputValue }) => {
        //   const query = inputValue.trim().toLowerCase();
        //
        //   if (!query) {
        //     return options;
        //   }
        //
        //   const filterredOptions = opts.filter(
        //     (opt) =>
        //       opt.symbol.toLowerCase().includes(query) || opt.name.toLowerCase().includes(query)
        //   );
        //
        //   return filterredOptions;
        // }}
        disabled={isLoading}
      />
    );
  }
);

export default CurrencyDropdown;
