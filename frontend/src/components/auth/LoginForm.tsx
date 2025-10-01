import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Eye, EyeOff, LogIn } from 'lucide-react';

interface LoginFormProps {
    formData: {
        email: string;
        password: string;
    };
    formErrors: { [key: string]: string };
    showPassword: boolean;
    loading: boolean;
    onFormChange: (field: string, value: string) => void;
    onTogglePassword: () => void;
    onSubmit: (e: React.FormEvent) => void;
    onModeChange: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    formData,
    formErrors,
    showPassword,
    loading,
    onFormChange,
    onTogglePassword,
    onSubmit,
    onModeChange
}) => {
    return (
        <Card className="w-full max-w-md mx-auto bg-white/5 backdrop-blur-lg border border-gray-200/20 shadow-2xl">
            <CardHeader className="text-center">
                <h2 className="text-2xl font-bold text-white">Iniciar Sesión</h2>
                <p className="text-gray-300">Accede a tu cuenta de CrossPay</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => onFormChange('email', e.target.value)}
                            className="bg-white/10 border-gray-300/30 text-white placeholder-gray-400"
                            placeholder="tu@email.com"
                        />
                        {formErrors.email && (
                            <p className="text-red-400 text-sm">{formErrors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">
                            Contraseña
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => onFormChange('password', e.target.value)}
                                className="bg-white/10 border-gray-300/30 text-white placeholder-gray-400 pr-10"
                                placeholder="Tu contraseña"
                            />
                            <button
                                type="button"
                                onClick={onTogglePassword}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {formErrors.password && (
                            <p className="text-red-400 text-sm">{formErrors.password}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Iniciando sesión...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <LogIn className="mr-2" size={20} />
                                Iniciar Sesión
                            </div>
                        )}
                    </Button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={onModeChange}
                            className="text-purple-300 hover:text-purple-200 underline transition-colors"
                        >
                            ¿No tienes cuenta? Regístrate aquí
                        </button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};