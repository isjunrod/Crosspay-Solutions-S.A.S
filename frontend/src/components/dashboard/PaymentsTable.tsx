import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CreditCard, Plus } from 'lucide-react';
import { Payment } from '../../store/paymentsTypes';
import { formatCurrency, formatDate, getStatusColor, getStatusText } from '../../utils/formatters';

interface PaymentsTableProps {
    payments: Payment[];
    onCreatePayment: () => void;
}

export default function PaymentsTable({ payments, onCreatePayment }: PaymentsTableProps) {
    return (
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <CardHeader>
                <CardTitle className="text-white flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                    Pagos Recientes
                </CardTitle>
            </CardHeader>
            <CardContent>
                {payments.length === 0 ? (
                    <div className="text-center py-8">
                        <CreditCard className="mx-auto h-12 w-12 text-white/40 mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">
                            No hay pagos registrados
                        </h3>
                        <p className="text-white/60 mb-4">
                            Comienza creando tu primer pago
                        </p>
                        <Button
                            onClick={onCreatePayment}
                            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Crear Pago
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                                        Divisa
                                    </th>
                                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                                        Monto
                                    </th>
                                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                                        Descripción
                                    </th>
                                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                                        Nombre
                                    </th>
                                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                                        Tipo de documento
                                    </th>
                                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                                        Fecha de la transacción
                                    </th>
                                    <th className="text-left py-3 px-4 text-white/80 font-medium">
                                        Estado
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment: Payment) => (
                                    <tr
                                        key={payment._id}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="py-3 px-4 text-white">
                                            {payment.currency}
                                        </td>
                                        <td className="py-3 px-4 text-white font-medium">
                                            {formatCurrency(payment.amount, payment.currency)}
                                        </td>
                                        <td className="py-3 px-4 text-white/80 max-w-xs truncate">
                                            {payment.description}
                                        </td>
                                        <td className="py-3 px-4 text-white">
                                            {payment.customerName}
                                        </td>
                                        <td className="py-3 px-4 text-white/80 capitalize">
                                            {payment.documentType}
                                        </td>
                                        <td className="py-3 px-4 text-white/80">
                                            {formatDate(payment.createdAt)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                                {getStatusText(payment.status)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}