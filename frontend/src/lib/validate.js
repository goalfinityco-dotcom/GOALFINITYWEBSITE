const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;

export const validateEnquiry = ({ name, email, phone, message }) => {
  const errors = {};
  const n = name.trim().replace(/\s+/g, " ");
  if (n.length < 2 || !/\p{L}/u.test(n) || /[<>@/\{}[\]=]/.test(n)) errors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(email.trim())) errors.email = "Please enter a valid email address.";
  const p = phone.trim();
  const digits = p.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(p) || digits.length < 7 || digits.length > 15) errors.phone = "Enter a valid phone number (7-15 digits, with country code).";
  if (message && message.length > 2000) errors.message = "Message is too long (max 2000 characters).";
  return errors;
};
