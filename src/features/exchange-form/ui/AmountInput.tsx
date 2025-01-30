import { TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { MAX_DECIMALS } from '@features/exchange-form/config/amountInput.ts';
import { memo } from 'react';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  isLoading: boolean;
  label?: string;
}

const AmountInput = memo(
  ({ value, onChange, label, isLoading }: AmountInputProps) => {
    return (
      <NumericFormat
        customInput={TextField}
        fullWidth
        thousandSeparator
        value={value}
        allowNegative={false}
        label={label}
        disabled={isLoading}
        placeholder="0.00"
        decimalScale={MAX_DECIMALS}
        max={Number.MAX_SAFE_INTEGER}
        isAllowed={(values) => {
          if (!values.floatValue && !values.value) {
            return true;
          }

          const newAmount = Number(values.value);
          const maxAmount = Number.MAX_SAFE_INTEGER;

          if (newAmount > maxAmount) {
            onChange(maxAmount);
            return false;
          }

          const isValidFormat = /^(0|[1-9]\d*)(\.\d*)?$|^\.\d+$/;
          return isValidFormat.test(values.value);
        }}
        onValueChange={(values, info) => {
          if (info.source === 'prop') {
            return;
          }

          onChange(Number(values.value));
        }}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value && prevProps.isLoading === nextProps.isLoading;
  }
);

export default AmountInput;
