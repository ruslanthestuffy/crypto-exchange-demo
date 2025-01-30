import { observer } from 'mobx-react-lite';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { Children, forwardRef } from 'react';

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

const VirtualizedListbox = forwardRef<HTMLDivElement, any>(({ children, ...rest }, ref) => {
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
});

const CurrencyDropdown = observer(
  ({ label, value, onChange, options, isLoading }: CurrencyDropdownProps) => {
    return (
      <Autocomplete
        fullWidth
        sx={{ maxWidth: 220 }}
        options={options}
        // @ts-ignore | null need to keep it controllable
        value={options.find((o) => o.symbol === value) ?? null}
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
