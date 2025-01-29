import { CircularProgress, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  loading: boolean;
}

const AmountInput = ({ value, onChange, loading }: AmountInputProps) => {
  return (
    <NumericFormat
      customInput={TextField}
      fullWidth
      thousandSeparator
      decimalScale={6}
      value={value}
      onValueChange={(values) => onChange(Number(values.value))}
      label="Amount"
      InputProps={{
        endAdornment: loading ? <CircularProgress size={20} /> : null,
      }}
      disabled={loading}
    />
  );
};

export default AmountInput;
