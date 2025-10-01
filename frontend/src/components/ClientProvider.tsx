'use client'

import { Provider } from 'react-redux'
import { store } from '../store'
import AuthHydrator from './AuthHydrator'

interface ClientProviderProps {
    children: React.ReactNode
}

export default function ClientProvider({ children }: ClientProviderProps) {
    return (
        <Provider store={store}>
            <AuthHydrator>
                {children}
            </AuthHydrator>
        </Provider>
    )
}