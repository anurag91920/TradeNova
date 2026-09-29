import rateLimit from 'express-rate-limit';

/**
 * Create a rate limiter without custom keyGenerator.
 * Let express-rate-limit handle IP detection internally (IPv6-safe).
 */
export const createRateLimiter = (options = {}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000,
    max: options.max || 100,
    message: options.message || {
      success: false,
      message: 'Too many requests, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    validate: {
      // Disable the specific IPv6 validation warning (we're not using custom keyGenerator)
      keyGeneratorIpFallback: false,
      // Disable "trust proxy" validation warning for dev
      trustProxy: false
    },
    ...options
  });
};

export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 1000 : 10,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  }
});

export const tradeLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: process.env.NODE_ENV === 'development' ? 100 : 30,
  message: {
    success: false,
    message: 'Trade rate limit exceeded. Please wait.'
  }
});

export const generalLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 1000
});

export default createRateLimiter;