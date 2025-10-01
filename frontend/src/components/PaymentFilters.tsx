'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { CalendarDays, Filter, Search, DollarSign, X } from 'lucide-react'
import { fetchPaymentsWithFilters } from '../store/paymentsActions'
import { PaymentQueryParams } from '../store/paymentsTypes'

interface PaymentFiltersProps {
    onClose?: () => void
}

export default function PaymentFilters({ onClose }: PaymentFiltersProps) {
    const dispatch = useDispatch()

    const [filters, setFilters] = useState<PaymentQueryParams>({
        currency: undefined,
        customerName: '',
        startDate: '',
        endDate: '',
        minAmount: undefined,
        maxAmount: undefined,
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc'
    })

    const handleFilterChange = (field: keyof PaymentQueryParams, value: any) => {
        setFilters(prev => ({ ...prev, [field]: value }))
    }

    const applyFilters = () => {
        // Clean empty filters
        const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                acc[key as keyof PaymentQueryParams] = value
            }
            return acc
        }, {} as PaymentQueryParams)

        dispatch(fetchPaymentsWithFilters(cleanFilters) as any)

        if (onClose) {
            onClose()
        }
    }

    const clearFilters = () => {
        setFilters({
            currency: undefined,
            customerName: '',
            startDate: '',
            endDate: '',
            minAmount: undefined,
            maxAmount: undefined,
            page: 1,
            limit: 10,
            sortBy: 'createdAt',
            sortOrder: 'desc'
        })

        dispatch(fetchPaymentsWithFilters({}) as any)
    }

    return (
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
            <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                        <Filter className="w-5 h-5 mr-2 text-purple-400" />
                        Filtros Avanzados
                    </div>
                    {onClose && (
                        <Button
                            onClick={onClose}
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Currency and Customer Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Moneda</Label>
                        <select
                            value={filters.currency || ''}
                            onChange={(e) => handleFilterChange('currency', e.target.value || undefined)}
                            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/20 text-white"
                        >
                            <option value="" className="bg-gray-800">Todas las monedas</option>
                            <option value="USD" className="bg-gray-800">USD - Dólar</option>
                            <option value="COP" className="bg-gray-800">COP - Peso</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white/80">Nombre del Cliente</Label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                            <Input
                                value={filters.customerName || ''}
                                onChange={(e) => handleFilterChange('customerName', e.target.value)}
                                placeholder="Buscar por nombre..."
                                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>
                    </div>
                </div>

                {/* Date Range */}
                <div className="space-y-2">
                    <Label className="text-white/80 flex items-center">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        Rango de Fechas
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label className="text-white/60 text-sm">Fecha Inicio</Label>
                            <Input
                                type="date"
                                value={filters.startDate || ''}
                                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                className="bg-white/5 border-white/20 text-white"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-white/60 text-sm">Fecha Fin</Label>
                            <Input
                                type="date"
                                value={filters.endDate || ''}
                                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                className="bg-white/5 border-white/20 text-white"
                            />
                        </div>
                    </div>
                </div>

                {/* Amount Range */}
                <div className="space-y-2">
                    <Label className="text-white/80 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Rango de Montos
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label className="text-white/60 text-sm">Monto Mínimo</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={filters.minAmount || ''}
                                onChange={(e) => handleFilterChange('minAmount', parseFloat(e.target.value) || undefined)}
                                placeholder="0.00"
                                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label className="text-white/60 text-sm">Monto Máximo</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={filters.maxAmount || ''}
                                onChange={(e) => handleFilterChange('maxAmount', parseFloat(e.target.value) || undefined)}
                                placeholder="999999.99"
                                className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
                            />
                        </div>
                    </div>
                </div>

                {/* Sorting */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Ordenar por</Label>
                        <select
                            value={filters.sortBy || 'createdAt'}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/20 text-white"
                        >
                            <option value="createdAt" className="bg-gray-800">Fecha de Creación</option>
                            <option value="amount" className="bg-gray-800">Monto</option>
                            <option value="customerName" className="bg-gray-800">Nombre del Cliente</option>
                            <option value="currency" className="bg-gray-800">Moneda</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white/80">Orden</Label>
                        <select
                            value={filters.sortOrder || 'desc'}
                            onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/20 text-white"
                        >
                            <option value="desc" className="bg-gray-800">Descendente</option>
                            <option value="asc" className="bg-gray-800">Ascendente</option>
                        </select>
                    </div>
                </div>

                {/* Pagination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-white/80">Resultados por página</Label>
                        <select
                            value={filters.limit || 10}
                            onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                            className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/20 text-white"
                        >
                            <option value="5" className="bg-gray-800">5</option>
                            <option value="10" className="bg-gray-800">10</option>
                            <option value="25" className="bg-gray-800">25</option>
                            <option value="50" className="bg-gray-800">50</option>
                            <option value="100" className="bg-gray-800">100</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-white/80">Página</Label>
                        <Input
                            type="number"
                            min="1"
                            value={filters.page || 1}
                            onChange={(e) => handleFilterChange('page', parseInt(e.target.value) || 1)}
                            className="bg-white/5 border-white/20 text-white"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <Button
                        onClick={applyFilters}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Aplicar Filtros
                    </Button>
                    <Button
                        onClick={clearFilters}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                    >
                        Limpiar
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}