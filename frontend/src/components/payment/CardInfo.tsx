import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CreditCard, Calendar, Lock } from 'lucide-react';
import { CreatePaymentRequest } from '../../store/paymentsTypes';

interface CardInfoProps {
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
    onFieldChange: (field: keyof CreatePaymentRequest, value: any) => void;
    disabled?: boolean;
}

export default function CardInfo({
    cardNumber,
    expirationDate,
    securityCode,
    onFieldChange,
    disabled = false
}: CardInfoProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-400" />
                Información de la Tarjeta
            </h3>

            <div className="space-y-2">
                <Label className="text-white/80">Número de Tarjeta *</Label>
                <Input
                    value={cardNumber}
                    onChange={(e) => onFieldChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                    disabled={disabled}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-white/80 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Fecha de Expiración *
                    </Label>
                    <Input
                        value={expirationDate}
                        onChange={(e) => onFieldChange('expirationDate', e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        disabled={disabled}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-white/80 flex items-center">
                        <Lock className="w-4 h-4 mr-1" />
                        Código de Seguridad *
                    </Label>
                    <Input
                        value={securityCode}
                        onChange={(e) => onFieldChange('securityCode', e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
}