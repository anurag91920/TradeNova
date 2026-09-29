export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{10,15}$/;
  return phoneRegex.test(phone);
};

export const isValidCryptoAddress = (address, type = 'all') => {
  if (!address) return false;

  if (type === 'bitcoin' || type === 'all') {
    const btcRegex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    if (btcRegex.test(address)) return true;
  }

  if (type === 'ethereum' || type === 'all') {
    const ethRegex = /^0x[a-fA-F0-9]{40}$/;
    if (ethRegex.test(address)) return true;
  }

  if (type === 'all') {
    const genericRegex = /^[a-zA-Z0-9]{20,60}$/;
    return genericRegex.test(address);
  }

  return false;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const validateTradeAmount = (amount, minAmount = 10, maxAmount = 1000000) => {
  if (amount < minAmount) {
    return { valid: false, message: `Minimum trade amount is $${minAmount}` };
  }
  if (amount > maxAmount) {
    return { valid: false, message: `Maximum trade amount is $${maxAmount}` };
  }
  return { valid: true };
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};