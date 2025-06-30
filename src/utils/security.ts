
// Security utilities for input validation and sanitization

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  if (!/(?=.*[!@#$%^&*])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one special character (!@#$%^&*)' };
  }
  return { isValid: true, message: 'Password is strong' };
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes to prevent injection
    .substring(0, 255); // Limit length
};

export const validateCreditCard = (cardNumber: string): boolean => {
  // Luhn algorithm for credit card validation
  const number = cardNumber.replace(/\s/g, '');
  if (!/^\d+$/.test(number)) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  const match = expiryDate.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  
  const month = parseInt(match[1], 10);
  const year = parseInt(match[2], 10) + 2000;
  
  if (month < 1 || month > 12) return false;
  
  const now = new Date();
  const expiry = new Date(year, month - 1);
  
  return expiry > now;
};

export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

export const rateLimitCheck = (key: string, limit: number, windowMs: number): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Get stored attempts for this key
  const stored = localStorage.getItem(`rateLimit_${key}`);
  let attempts: number[] = stored ? JSON.parse(stored) : [];
  
  // Filter out old attempts
  attempts = attempts.filter(time => time > windowStart);
  
  // Check if limit exceeded
  if (attempts.length >= limit) {
    return false;
  }
  
  // Add current attempt
  attempts.push(now);
  localStorage.setItem(`rateLimit_${key}`, JSON.stringify(attempts));
  
  return true;
};
