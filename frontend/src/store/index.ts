import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './authReducer';
import paymentsReducer from './paymentsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  payments: paymentsReducer,
});

// @ts-ignore - Redux v5 types are causing issues with legacy createStore
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
