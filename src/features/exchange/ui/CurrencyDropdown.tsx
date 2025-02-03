import { observer } from 'mobx-react-lite';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Children, forwardRef, HTMLAttributes, ReactNode } from 'react';

interface CurrencyOption {
  symbol: string;
  name: string;
}

interface CurrencyDropdownProps {
  label?: string;
  value: string | null;
  onChange: (currency: string | null) => void;
  options: CurrencyOption[];
  isLoading: boolean;
  onOpen?: VoidFunction;
  onClose?: VoidFunction;
}

const ITEM_HEIGHT = 40;
const LIST_HEIGHT = ITEM_HEIGHT * 8;

const Row = ({ data, index, style }: ListChildComponentProps) => {
  const option = data[index];

  return (
    <Typography {...option.props} style={{ ...style, listStyle: 'none' }}>
      {option}
    </Typography>
  );
};

interface VirtualizedListboxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const VirtualizedListbox = forwardRef<HTMLDivElement, VirtualizedListboxProps>(
  ({ children, ...rest }, ref) => {
    const itemData = Children.toArray(children);

    return (
      <div ref={ref} {...rest}>
        <FixedSizeList
          height={LIST_HEIGHT}
          width="100%"
          itemSize={ITEM_HEIGHT}
          itemCount={itemData.length}
          itemData={itemData}
          overscanCount={5}
        >
          {Row}
        </FixedSizeList>
      </div>
    );
  }
);

const CurrencyDropdown = observer(
  ({ label, value, onChange, options, isLoading, onOpen, onClose }: CurrencyDropdownProps) => {
    return (
      <Autocomplete
        fullWidth
        sx={{
          maxWidth: { xs: '100%', sm: 220 },
        }}
        onOpen={onOpen}
        onClose={onClose}
        options={options}
        value={(options.find((o) => o.symbol === value) ?? null) as CurrencyOption}
        onChange={(_, newValue) => onChange(newValue?.symbol || null)}
        getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
        disableClearable
        disabled={isLoading}
        slotProps={{
          listbox: { component: VirtualizedListbox },
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    );
  }
);

export default CurrencyDropdown;
