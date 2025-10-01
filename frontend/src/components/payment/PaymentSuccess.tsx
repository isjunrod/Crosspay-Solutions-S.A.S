import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f0728] via-[#1a0b3a] to-[#2d1b57] flex items-center justify-center">
            <Card className="w-full max-w-lg bg-white/[0.08] backdrop-blur-2xl border border-white/[0.12]">
                <CardHeader className="text-center pb-12 pt-12">
                    <div className="mx-auto mb-8 h-20 w-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-emerald-400 text-3xl font-bold mb-4">¡Pago Exitoso!</CardTitle>
                    <CardDescription className="text-white/60 text-xl leading-relaxed">
                        Tu pago ha sido procesado correctamente.
                        <br />
                        Serás redirigido al dashboard en unos segundos...
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}