import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CreditCard, TrendingUp, Users, Eye, EyeOff } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface StatsCardsProps {
    totalBalance: number;
    totalPayments: number;
    completedPayments: number;
    pendingPayments: number;
    successRate: number;
    balanceVisible: boolean;
    onToggleBalance: () => void;
}

export default function StatsCards({
    totalBalance,
    totalPayments,
    completedPayments,
    pendingPayments,
    successRate,
    balanceVisible,
    onToggleBalance
}: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white/80">
                        Balance Total
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleBalance}
                        className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                        {balanceVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">
                        {balanceVisible ? formatCurrency(totalBalance) : '****'}
                    </div>
                    <p className="text-xs text-white/60">
                        +2.5% desde el mes pasado
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white/80">
                        Pagos Totales
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-purple-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">{totalPayments}</div>
                    <p className="text-xs text-white/60">
                        Transacciones registradas
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white/80">
                        Pagos Completados
                    </CardTitle>
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">
                        {completedPayments}
                    </div>
                    <p className="text-xs text-white/60">
                        {successRate}% de éxito
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white/80">
                        Pagos Pendientes
                    </CardTitle>
                    <Users className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-white">
                        {pendingPayments}
                    </div>
                    <p className="text-xs text-white/60">
                        Requieren atención
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}