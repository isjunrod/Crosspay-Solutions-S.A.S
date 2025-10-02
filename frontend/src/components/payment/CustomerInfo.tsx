import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User, Mail, Phone } from 'lucide-react';
import { CreatePaymentRequest } from '../../store/paymentsTypes';

interface CustomerInfoProps {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    documentType: 'cedula' | 'pasaporte';
    onFieldChange: (field: keyof CreatePaymentRequest, value: any) => void;
    disabled?: boolean;
}

export default function CustomerInfo({
    customerName,
    customerEmail,
    customerPhone,
    documentType,
    onFieldChange,
    disabled = false
}: CustomerInfoProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-400" />
                Información del Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-white/80">Nombre Completo *</Label>
                    <Input
                        value={customerName}
                        onChange={(e) => onFieldChange('customerName', e.target.value)}
                        placeholder="Nombre del cliente"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        disabled={disabled}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-white/80">Tipo de Documento *</Label>
                    <select
                        value={documentType}
                        onChange={(e) => onFieldChange('documentType', e.target.value)}
                        className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={disabled}
                    >
                        <option value="cedula" className="bg-gray-800">Cédula</option>
                        <option value="pasaporte" className="bg-gray-800">Pasaporte</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-white/80 flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        Email (Opcional)
                    </Label>
                    <Input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => onFieldChange('customerEmail', e.target.value)}
                        placeholder="cliente@email.com"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        disabled={disabled}
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-white/80 flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        Teléfono (Opcional)
                    </Label>
                    <Input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => onFieldChange('customerPhone', e.target.value)}
                        placeholder="+57 300 123 4567"
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
}