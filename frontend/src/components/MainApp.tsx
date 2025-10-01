'use client'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter, usePathname } from 'next/navigation'
import { RootState } from '../store'
import AuthForm from './AuthForm'
import Dashboard from './Dashboard'
import PaymentForm from './PaymentForm'
import { Loader2, Zap } from 'lucide-react'

export default function MainApp() {
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Redirect logic based on authentication
        if (!loading) {
            if (!isAuthenticated && (pathname === '/dashboard' || pathname === '/payments')) {
                router.push('/')
            } else if (isAuthenticated && pathname === '/') {
                router.push('/dashboard')
            }
        }
    }, [isAuthenticated, loading, pathname, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/40 to-violet-900/60">
                <div className="text-center space-y-6">
                    <div className="relative">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <Loader2 className="absolute inset-0 w-16 h-16 animate-spin text-white/50" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">CrossPay Elite</h2>
                        <p className="text-white/70">Iniciando sistema de pagos...</p>
                    </div>
                </div>
            </div>
        )
    }

    // Render different components based on pathname and authentication
    if (pathname === '/') {
        return <AuthForm />
    }

    if (pathname === '/dashboard') {
        return isAuthenticated ? <Dashboard /> : <AuthForm />
    }

    if (pathname === '/payments') {
        return isAuthenticated ? <PaymentForm /> : <AuthForm />
    }

    // Default fallback
    return <AuthForm />
}