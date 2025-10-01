import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPayments } from '../store/paymentsActions';
import { RootState } from '../store/index';
import { Payment } from '../store/paymentsTypes';

export const usePayments = () => {
  const dispatch = useDispatch();
  const { payments, loading, error } = useSelector(
    (state: RootState) => state.payments
  );
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchPayments() as any);
    }
  }, [dispatch, user]);

  const refreshPayments = () => {
    dispatch(fetchPayments() as any);
  };

  return {
    payments,
    loading,
    error,
    refreshPayments,
  };
};

export const usePaymentStats = (payments: Payment[]) => {
  const totalBalance = payments.reduce((sum: number, payment: Payment) => {
    const amount =
      payment.currency === 'USD' ? payment.amount * 4000 : payment.amount;
    return sum + amount;
  }, 0);

  const completedPayments = payments.filter(
    (p: Payment) => p.status === 'completed'
  ).length;
  const pendingPayments = payments.filter(
    (p: Payment) => p.status === 'pending'
  ).length;
  const successRate =
    payments.length > 0
      ? Math.round((completedPayments / payments.length) * 100)
      : 0;

  return {
    totalBalance,
    totalPayments: payments.length,
    completedPayments,
    pendingPayments,
    successRate,
  };
};
