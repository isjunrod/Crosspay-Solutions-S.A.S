'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from './ui/alert';
import { useAuth } from '../hooks/useAuth';
import { usePayments, usePaymentStats } from '../hooks/usePayments';
import DashboardHeader from './dashboard/DashboardHeader';
import StatsCards from './dashboard/StatsCards';
import PaymentsTable from './dashboard/PaymentsTable';
import PaymentFilters from './PaymentFilters';

export default function Dashboard() {
    const router = useRouter();
    const { user, handleLogout } = useAuth();
    const { payments, loading, error } = usePayments();
    const stats = usePaymentStats(payments);

    const [showFilters, setShowFilters] = useState(false);
    const [balanceVisible, setBalanceVisible] = useState(true);

    const handleCreatePayment = () => {
        router.push('/payments');
    };

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const handleToggleBalance = () => {
        setBalanceVisible(!balanceVisible);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <div className="text-white text-xl">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
                <DashboardHeader
                    userName={user?.email}
                    onToggleFilters={handleToggleFilters}
                    onCreatePayment={handleCreatePayment}
                    onLogout={handleLogout}
                />

                {error && (
                    <Alert className="border-red-500/50 bg-red-500/10 text-red-300">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {showFilters && (
                    <PaymentFilters onClose={() => setShowFilters(false)} />
                )}

                <StatsCards
                    totalBalance={stats.totalBalance}
                    totalPayments={stats.totalPayments}
                    completedPayments={stats.completedPayments}
                    pendingPayments={stats.pendingPayments}
                    successRate={stats.successRate}
                    balanceVisible={balanceVisible}
                    onToggleBalance={handleToggleBalance}
                />

                <PaymentsTable
                    payments={payments}
                    onCreatePayment={handleCreatePayment}
                />
            </div>
        </div>
    );
}