// Types based on backend schemas
export interface Payment {
  _id: string;
  userId: string;
  currency: 'COP' | 'USD';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  customerName: string;
  documentType: 'cedula' | 'pasaporte';
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  maskedCardNumber?: string; // Virtual field from backend
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentRequest {
  currency: 'COP' | 'USD';
  amount: number;
  description: string;
  customerName: string;
  documentType: 'cedula' | 'pasaporte';
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  customerEmail?: string;
  customerPhone?: string;
}

export interface PaymentQueryParams {
  currency?: 'COP' | 'USD';
  customerName?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaymentFilters {
  currency?: 'COP' | 'USD';
  customerName?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaymentsState {
  payments: Payment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null;
  loading: boolean;
  error: string | null;
  filters: PaymentFilters;
}

// Action types
export const PAYMENTS_FETCH_START = 'PAYMENTS_FETCH_START';
export const PAYMENTS_FETCH_SUCCESS = 'PAYMENTS_FETCH_SUCCESS';
export const PAYMENTS_FETCH_FAILURE = 'PAYMENTS_FETCH_FAILURE';
export const PAYMENTS_CREATE_START = 'PAYMENTS_CREATE_START';
export const PAYMENTS_CREATE_SUCCESS = 'PAYMENTS_CREATE_SUCCESS';
export const PAYMENTS_CREATE_FAILURE = 'PAYMENTS_CREATE_FAILURE';
export const PAYMENTS_SET_FILTERS = 'PAYMENTS_SET_FILTERS';
export const PAYMENTS_CLEAR_ERROR = 'PAYMENTS_CLEAR_ERROR';

// Action interfaces
interface PaymentsFetchStartAction {
  type: typeof PAYMENTS_FETCH_START;
}

interface PaymentsFetchSuccessAction {
  type: typeof PAYMENTS_FETCH_SUCCESS;
  payload: {
    payments: Payment[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

interface PaymentsFetchFailureAction {
  type: typeof PAYMENTS_FETCH_FAILURE;
  payload: string;
}

interface PaymentsCreateStartAction {
  type: typeof PAYMENTS_CREATE_START;
}

interface PaymentsCreateSuccessAction {
  type: typeof PAYMENTS_CREATE_SUCCESS;
  payload: Payment;
}

interface PaymentsCreateFailureAction {
  type: typeof PAYMENTS_CREATE_FAILURE;
  payload: string;
}

interface PaymentsSetFiltersAction {
  type: typeof PAYMENTS_SET_FILTERS;
  payload: PaymentFilters;
}

interface PaymentsClearErrorAction {
  type: typeof PAYMENTS_CLEAR_ERROR;
}

export type PaymentsActionTypes =
  | PaymentsFetchStartAction
  | PaymentsFetchSuccessAction
  | PaymentsFetchFailureAction
  | PaymentsCreateStartAction
  | PaymentsCreateSuccessAction
  | PaymentsCreateFailureAction
  | PaymentsSetFiltersAction
  | PaymentsClearErrorAction;
