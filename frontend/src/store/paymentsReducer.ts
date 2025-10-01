import {
  PaymentsState,
  PaymentsActionTypes,
  PAYMENTS_FETCH_START,
  PAYMENTS_FETCH_SUCCESS,
  PAYMENTS_FETCH_FAILURE,
  PAYMENTS_CREATE_START,
  PAYMENTS_CREATE_SUCCESS,
  PAYMENTS_CREATE_FAILURE,
  PAYMENTS_SET_FILTERS,
  PAYMENTS_CLEAR_ERROR,
} from './paymentsTypes';

const initialState: PaymentsState = {
  payments: [],
  pagination: null,
  loading: false,
  error: null,
  filters: {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  },
};

const paymentsReducer = (
  state = initialState,
  action: PaymentsActionTypes
): PaymentsState => {
  switch (action.type) {
    case PAYMENTS_FETCH_START:
    case PAYMENTS_CREATE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PAYMENTS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        payments: action.payload.payments,
        pagination: action.payload.pagination,
        error: null,
      };

    case PAYMENTS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case PAYMENTS_FETCH_FAILURE:
    case PAYMENTS_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PAYMENTS_SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case PAYMENTS_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default paymentsReducer;
