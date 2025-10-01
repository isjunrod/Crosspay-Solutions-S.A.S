import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createPayment } from '../store/paymentsActions';
import { CreatePaymentRequest } from '../store/paymentsTypes';
import {
  validatePaymentForm,
  formatCardNumberInput,
  formatExpirationDate,
} from '../utils/paymentValidation';

const initialFormData: CreatePaymentRequest = {
  currency: 'USD',
  amount: 0,
  description: '',
  customerName: '',
  documentType: 'cedula',
  cardNumber: '',
  expirationDate: '',
  securityCode: '',
  customerEmail: '',
  customerPhone: '',
};

export const usePaymentForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] =
    useState<CreatePaymentRequest>(initialFormData);
  const [formError, setFormError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: keyof CreatePaymentRequest, value: any) => {
    setFormError('');

    let processedValue = value;

    // Special formatting for certain fields
    if (field === 'cardNumber') {
      processedValue = formatCardNumberInput(value);
    } else if (field === 'expirationDate') {
      processedValue = formatExpirationDate(value);
    } else if (field === 'amount') {
      processedValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({ ...prev, [field]: processedValue }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFormError('');
    setSuccess(false);
  };

  const submitForm = async () => {
    const validationError = validatePaymentForm(formData);
    if (validationError) {
      setFormError(validationError);
      return false;
    }

    try {
      // Clean card number (remove spaces) before sending to backend
      const cleanFormData = {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, ''),
      };

      const result = await dispatch(createPayment(cleanFormData) as any);

      if (result) {
        setSuccess(true);
        resetForm();

        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);

        return true;
      }
      return false;
    } catch (error) {
      setFormError('Error al procesar el pago. Inténtalo de nuevo.');
      return false;
    }
  };

  return {
    formData,
    formError,
    success,
    handleInputChange,
    resetForm,
    submitForm,
  };
};
