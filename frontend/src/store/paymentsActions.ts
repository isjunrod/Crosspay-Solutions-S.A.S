import { Dispatch } from 'redux';
import axios from 'axios';
import {
  PAYMENTS_FETCH_START,
  PAYMENTS_FETCH_SUCCESS,
  PAYMENTS_FETCH_FAILURE,
  PAYMENTS_CREATE_START,
  PAYMENTS_CREATE_SUCCESS,
  PAYMENTS_CREATE_FAILURE,
  PAYMENTS_SET_FILTERS,
  PAYMENTS_CLEAR_ERROR,
  Payment,
  PaymentFilters,
  PaymentQueryParams,
  CreatePaymentRequest,
  PaymentsActionTypes,
} from './paymentsTypes';

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';

// Configure axios to include auth headers
const getAuthHeaders = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Action creators
export const paymentsFetchStart = (): PaymentsActionTypes => ({
  type: PAYMENTS_FETCH_START,
});

export const paymentsFetchSuccess = (
  payments: Payment[],
  pagination: any
): PaymentsActionTypes => ({
  type: PAYMENTS_FETCH_SUCCESS,
  payload: { payments, pagination },
});

export const paymentsFetchFailure = (error: string): PaymentsActionTypes => ({
  type: PAYMENTS_FETCH_FAILURE,
  payload: error,
});

export const paymentsCreateStart = (): PaymentsActionTypes => ({
  type: PAYMENTS_CREATE_START,
});

export const paymentsCreateSuccess = (
  payment: Payment
): PaymentsActionTypes => ({
  type: PAYMENTS_CREATE_SUCCESS,
  payload: payment,
});

export const paymentsCreateFailure = (error: string): PaymentsActionTypes => ({
  type: PAYMENTS_CREATE_FAILURE,
  payload: error,
});

export const setFilters = (filters: PaymentFilters): PaymentsActionTypes => ({
  type: PAYMENTS_SET_FILTERS,
  payload: filters,
});

export const clearError = (): PaymentsActionTypes => ({
  type: PAYMENTS_CLEAR_ERROR,
});

// Thunk actions
export const fetchPayments = (filters?: PaymentQueryParams) => {
  return async (dispatch: Dispatch<PaymentsActionTypes>) => {
    dispatch(paymentsFetchStart());

    try {
      const queryParams = new URLSearchParams();

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, value.toString());
          }
        });
      }

      const response = await axios.get(
        `${API_URL}/payments?${queryParams.toString()}`,
        {
          headers: getAuthHeaders(),
        }
      );

      // Backend returns array directly or with pagination
      const payments = Array.isArray(response.data)
        ? response.data
        : response.data.payments || [];
      const pagination = response.data.pagination || null;

      dispatch(paymentsFetchSuccess(payments, pagination));
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error al obtener pagos';
      dispatch(paymentsFetchFailure(errorMessage));
      return false;
    }
  };
};

export const createPayment = (paymentData: CreatePaymentRequest) => {
  return async (dispatch: Dispatch<PaymentsActionTypes>) => {
    dispatch(paymentsCreateStart());

    try {
      const response = await axios.post(`${API_URL}/payments`, paymentData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
      });

      dispatch(paymentsCreateSuccess(response.data));

      // Refetch payments after creating new one
      dispatch(fetchPayments() as any);
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error al crear pago';
      dispatch(paymentsCreateFailure(errorMessage));
      return false;
    }
  };
};

// Other action creators
export const setPaymentFilters = (
  filters: PaymentFilters
): PaymentsActionTypes => ({
  type: PAYMENTS_SET_FILTERS,
  payload: filters,
});

export const clearPaymentError = (): PaymentsActionTypes => ({
  type: PAYMENTS_CLEAR_ERROR,
});

// Advanced payment queries with full backend support
export const fetchPaymentsWithFilters = (filters: PaymentQueryParams) => {
  return fetchPayments(filters);
};

export const fetchPaymentsByDateRange = (
  startDate: string,
  endDate: string
) => {
  return fetchPayments({ startDate, endDate });
};

export const fetchPaymentsByCurrency = (currency: 'COP' | 'USD') => {
  return fetchPayments({ currency });
};

export const fetchPaymentsByAmountRange = (
  minAmount: number,
  maxAmount: number
) => {
  return fetchPayments({ minAmount, maxAmount });
};
