export const digitDivider = (value: number, digit = 3, divider = ',') => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, divider);
};
