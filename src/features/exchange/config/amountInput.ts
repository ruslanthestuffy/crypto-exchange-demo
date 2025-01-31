export const MAX_DECIMALS = 6;

export const MIN_VALUE = Number(
  `0.${Array(MAX_DECIMALS - 1)
    .fill(0)
    .join('')}1`
);
