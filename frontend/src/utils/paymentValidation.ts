import { CreatePaymentRequest } from '../store/paymentsTypes';

export const validatePaymentForm = (
  formData: CreatePaymentRequest
): string | null => {
  // Validate required fields
  if (!formData.customerName.trim()) {
    return 'El nombre del cliente es requerido';
  }

  if (!formData.description.trim()) {
    return 'La descripción es requerida';
  }

  if (formData.amount <= 0) {
    return 'El monto debe ser mayor a 0';
  }

  // Validate card number (16 digits as per backend)
  const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
  if (!/^[0-9]{16}$/.test(cleanCardNumber)) {
    return 'El número de tarjeta debe tener 16 dígitos';
  }

  // Validate expiration date (MM/YY format as per backend)
  if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expirationDate)) {
    return 'La fecha de expiración debe estar en formato MM/YY';
  }

  // Validate security code (3-4 digits as per backend)
  if (!/^[0-9]{3,4}$/.test(formData.securityCode)) {
    return 'El código de seguridad debe tener 3 o 4 dígitos';
  }

  // Validate optional email if provided
  if (formData.customerEmail && !/\S+@\S+\.\S+/.test(formData.customerEmail)) {
    return 'El email del cliente no es válido';
  }

  return null;
};

export const formatCardNumberInput = (value: string): string => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '');

  // Add spaces every 4 digits
  return numericValue.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

export const formatExpirationDate = (value: string): string => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '');

  // Add slash after first two digits
  if (numericValue.length >= 2) {
    return numericValue.substring(0, 2) + '/' + numericValue.substring(2, 4);
  }

  return numericValue;
};
