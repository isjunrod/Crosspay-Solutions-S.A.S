import React from 'react';
import { Button } from '../ui/button';
import { Filter, Plus, LogOut } from 'lucide-react';

interface DashboardHeaderProps {
    userName?: string;
    onToggleFilters: () => void;
    onCreatePayment: () => void;
    onLogout: () => void;
}

export default function DashboardHeader({
    userName,
    onToggleFilters,
    onCreatePayment,
    onLogout
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
                <img src="/logo.svg" alt="CrossPay" className="w-40 h-15" />
                <p className="text-white/70">Bienvenido, {userName || 'Usuario'}</p>
            </div>

            <div className="flex gap-3">
                <Button
                    onClick={onToggleFilters}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                </Button>
                <Button
                    onClick={onCreatePayment}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Pago
                </Button>
                <Button
                    onClick={onLogout}
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    );
}