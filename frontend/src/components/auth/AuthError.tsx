import React from 'react';
import { Alert } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

interface AuthErrorProps {
    error: string | null;
}

export const AuthError: React.FC<AuthErrorProps> = ({ error }) => {
    if (!error) return null;

    return (
        <Alert className="bg-red-500/10 border-red-500/20 text-red-300 mb-4">
            <AlertCircle className="h-4 w-4" />
            <span className="ml-2">{error}</span>
        </Alert>
    );
};