import { format } from 'date-fns';

export const formatDate = (date) => {
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};

export const formatSolAmount = (amount) => {
  return `${amount.toFixed(2)} SOL`;
};

export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};