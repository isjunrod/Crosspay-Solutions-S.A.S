'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { hydrateAuth } from '../store/authActions'

interface AuthHydratorProps {
    children: React.ReactNode
}

const AuthHydrator: React.FC<AuthHydratorProps> = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Hidrate auth state from localStorage on client side only
        dispatch(hydrateAuth() as any)
    }, [dispatch])

    return <>{children}</>
}

export default AuthHydrator