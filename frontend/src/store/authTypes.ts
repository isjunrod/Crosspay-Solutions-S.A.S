// Types
export interface User {
  id: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Action types
export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_REGISTER_START = 'AUTH_REGISTER_START';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR';
export const AUTH_HYDRATE = 'AUTH_HYDRATE';

// Action interfaces
interface AuthLoginStartAction {
  type: typeof AUTH_LOGIN_START;
}

interface AuthLoginSuccessAction {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: {
    user: User;
    token: string;
  };
}

interface AuthLoginFailureAction {
  type: typeof AUTH_LOGIN_FAILURE;
  payload: string;
}

interface AuthRegisterStartAction {
  type: typeof AUTH_REGISTER_START;
}

interface AuthRegisterSuccessAction {
  type: typeof AUTH_REGISTER_SUCCESS;
  payload: {
    user: User;
    token: string;
  };
}

interface AuthRegisterFailureAction {
  type: typeof AUTH_REGISTER_FAILURE;
  payload: string;
}

interface AuthLogoutAction {
  type: typeof AUTH_LOGOUT;
}

interface AuthClearErrorAction {
  type: typeof AUTH_CLEAR_ERROR;
}

interface AuthHydrateAction {
  type: typeof AUTH_HYDRATE;
  payload: {
    token: string | null;
    isAuthenticated: boolean;
  };
}

export type AuthActionTypes =
  | AuthLoginStartAction
  | AuthLoginSuccessAction
  | AuthLoginFailureAction
  | AuthRegisterStartAction
  | AuthRegisterSuccessAction
  | AuthRegisterFailureAction
  | AuthLogoutAction
  | AuthClearErrorAction
  | AuthHydrateAction;
