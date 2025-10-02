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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center space-x-4">
                <img src="/logo.svg" alt="CrossPay" className="w-40 h-15" />
                <div className="h-8 w-px bg-white/20"></div>
                <div className="flex flex-col">
                    <p className="text-white/90 font-medium">Bienvenido</p>
                    <p className="text-purple-300 text-sm">{userName || 'Usuario'}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <Button
                    onClick={onToggleFilters}
                    variant="outline"
                    className="border-purple-500/50 bg-purple-500/10 text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/70 transition-all duration-200"
                >
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                </Button>
                <Button
                    onClick={onCreatePayment}
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Pago
                </Button>
                <Button
                    onClick={onLogout}
                    variant="outline"
                    className="border-red-500/50 bg-red-500/10 text-red-200 hover:bg-red-500/20 hover:border-red-400/70 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    );
}