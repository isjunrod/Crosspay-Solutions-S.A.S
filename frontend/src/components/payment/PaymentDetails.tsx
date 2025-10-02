import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { DollarSign } from 'lucide-react';
import { CreatePaymentRequest } from '../../store/paymentsTypes';

interface PaymentDetailsProps {
    currency: 'COP' | 'USD';
    amount: number;
    description: string;
    onFieldChange: (field: keyof CreatePaymentRequest, value: any) => void;
    disabled?: boolean;
}

export default function PaymentDetails({
    currency,
    amount,
    description,
    onFieldChange,
    disabled = false
}: PaymentDetailsProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-purple-400" />
                Detalles del Pago
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-white/80">Moneda *</Label>
                    <select
                        value={currency}
                        onChange={(e) => onFieldChange('currency', e.target.value)}
                        className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={disabled}
                    >
                        <option value="USD" className="bg-gray-800">USD - Dólar Americano</option>
                        <option value="COP" className="bg-gray-800">COP - Peso Colombiano</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <Label className="text-white/80">Monto *</Label>
                    <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={amount || ''}
                        onChange={(e) => onFieldChange('amount', e.target.value)}
                        placeholder="0.00"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        disabled={disabled}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-white/80">Descripción *</Label>
                <Input
                    value={description}
                    onChange={(e) => onFieldChange('description', e.target.value)}
                    placeholder="Descripción del pago"
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    disabled={disabled}
                />
            </div>
        </div>
    );
}