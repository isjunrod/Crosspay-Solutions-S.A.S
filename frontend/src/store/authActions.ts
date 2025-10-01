import { Dispatch } from 'redux';
import axios from 'axios';
import {
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_START,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT,
  AUTH_CLEAR_ERROR,
  AUTH_HYDRATE,
  User,
  AuthActionTypes,
} from './authTypes';

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api';

// Action creators
export const loginStart = (): AuthActionTypes => ({
  type: AUTH_LOGIN_START,
});

export const loginSuccess = (user: User, token: string): AuthActionTypes => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error: string): AuthActionTypes => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const registerStart = (): AuthActionTypes => ({
  type: AUTH_REGISTER_START,
});

export const registerSuccess = (
  user: User,
  token: string
): AuthActionTypes => ({
  type: AUTH_REGISTER_SUCCESS,
  payload: { user, token },
});

export const registerFailure = (error: string): AuthActionTypes => ({
  type: AUTH_REGISTER_FAILURE,
  payload: error,
});

export const logoutAction = (): AuthActionTypes => ({
  type: AUTH_LOGOUT,
});

export const clearError = (): AuthActionTypes => ({
  type: AUTH_CLEAR_ERROR,
});

export const hydrateAuth = (): AuthActionTypes => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    type: AUTH_HYDRATE,
    payload: {
      token,
      isAuthenticated: !!token,
    },
  };
};

// Thunk actions
export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(loginStart());

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { access_token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', access_token);

      dispatch(loginSuccess(user, access_token));
      return true; // Return success
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error al iniciar sesión';
      dispatch(loginFailure(errorMessage));
      return false; // Return failure
    }
  };
};

export const registerUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(registerStart());

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
      });

      const { access_token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem('token', access_token);

      dispatch(registerSuccess(user, access_token));
      return true; // Return success
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error al registrarse';
      dispatch(registerFailure(errorMessage));
      return false; // Return failure
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch<AuthActionTypes>) => {
    localStorage.removeItem('token');
    dispatch({ type: AUTH_LOGOUT });
  };
};
