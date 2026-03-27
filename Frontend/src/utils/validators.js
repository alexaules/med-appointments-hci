export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password) {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
}

export function required(value) {
  return String(value || '').trim().length > 0;
}
