export const formatPrice = (value: string | number): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return `$${numValue.toFixed(3)}`;
};