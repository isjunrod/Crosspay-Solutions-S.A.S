'use client'

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft } from 'lucide-react';
import { RootState } from '../store/index';
import { usePaymentForm } from '../hooks/usePaymentForm';
import CustomerInfo from './payment/CustomerInfo';
import PaymentDetails from './payment/PaymentDetails';
import CardInfo from './payment/CardInfo';
import PaymentSuccess from './payment/PaymentSuccess';

const PaymentForm: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { loading: paymentsLoading } = useSelector((state: RootState) => state.payments);

  const {
    formData,
    formError,
    success,
    handleInputChange,
    submitForm
  } = usePaymentForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  if (!isAuthenticated) {
    return null;
  }

  if (success) {
    return <PaymentSuccess />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0728] via-[#1a0b3a] to-[#2d1b57] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={handleGoBack}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Dashboard
          </Button>
        </div>

        <Card className="bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12] shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
              Crear Nuevo Pago
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            {formError && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-300">{formError}</AlertDescription>
              </Alert>
            )}

            <div className={`transition-opacity duration-200 ${paymentsLoading ? 'opacity-60' : 'opacity-100'}`}>
              <form onSubmit={handleSubmit} className="space-y-8">
              <CustomerInfo
                customerName={formData.customerName}
                customerEmail={formData.customerEmail || ''}
                customerPhone={formData.customerPhone || ''}
                documentType={formData.documentType}
                onFieldChange={handleInputChange}
                  disabled={paymentsLoading}
              />

              <PaymentDetails
                currency={formData.currency}
                amount={formData.amount}
                description={formData.description}
                onFieldChange={handleInputChange}
                  disabled={paymentsLoading}
              />

              <CardInfo
                cardNumber={formData.cardNumber}
                expirationDate={formData.expirationDate}
                securityCode={formData.securityCode}
                onFieldChange={handleInputChange}
                  disabled={paymentsLoading}
              />

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  onClick={handleGoBack}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                  disabled={paymentsLoading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                  disabled={paymentsLoading}
                >
                  {paymentsLoading ? 'Procesando...' : 'Procesar Pago'}
                </Button>
              </div>
            </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentForm;