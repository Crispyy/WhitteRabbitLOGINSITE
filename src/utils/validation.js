export const validateSolanaAddress = (address) => {
  const addressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return addressRegex.test(address);
};

export const validateAccessKey = (key) => {
  const keyRegex = /^WXRB-\d{4}-\d{4}-[A-Z]{4}$/;
  return keyRegex.test(key);
};

export const validateAmount = (amount, required, tolerance) => {
  const min = required * (1 - tolerance);
  const max = required * (1 + tolerance);
  return amount >= min && amount <= max;
};