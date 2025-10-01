export interface ValidationErrors {
  [key: string]: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return 'El email es requerido';
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return 'El email no es válido';
  }
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) {
    return 'La contraseña es requerida';
  }
  if (password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  return '';
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (password !== confirmPassword) {
    return 'Las contraseñas no coinciden';
  }
  return '';
};

export const validateLoginForm = (
  formData: LoginFormData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateRegisterForm = (
  formData: RegisterFormData
): ValidationErrors => {
  const errors: ValidationErrors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validateConfirmPassword(
    formData.password,
    formData.confirmPassword
  );
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  return errors;
};
