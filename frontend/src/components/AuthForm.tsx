'use client';

import React from 'react';
import { useAuthForm } from '../hooks/useAuthForm';
import { LoginForm } from './auth/LoginForm';
import { RegisterForm } from './auth/RegisterForm';
import { AuthError } from './auth/AuthError';

const AuthForm = () => {
    const {
        isLogin,
        showPassword,
        showConfirmPassword,
        formErrors,
        loginForm,
        registerForm,
        loading,
        error,
        setShowPassword,
        setShowConfirmPassword,
        setLoginForm,
        setRegisterForm,
        handleLogin,
        handleRegister,
        toggleMode
    } = useAuthForm();

    const handleLoginFormChange = (field: string, value: string) => {
        setLoginForm({ ...loginForm, [field]: value });
    };

    const handleRegisterFormChange = (field: string, value: string) => {
        setRegisterForm({ ...registerForm, [field]: value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo y título principal */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-2">
                        <img src="/logo.svg" alt="CrossPay" className="w-50 h-14" />
                    </div>
                    <p className="text-white/60 text-sm">Soluciones de pago de vanguardia</p>
                </div>

                <AuthError error={error} />

                <div className="w-full">
                    <div className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-lg rounded-lg p-1 mb-6">
                        <button
                            onClick={() => isLogin ? null : toggleMode()}
                            className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${isLogin
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={() => !isLogin ? null : toggleMode()}
                            className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${!isLogin
                                ? 'bg-white/20 text-white'
                                : 'text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Registrarse
                        </button>
                    </div>

                    {isLogin ? (
                        <LoginForm
                            formData={loginForm}
                            formErrors={formErrors}
                            showPassword={showPassword}
                            loading={loading}
                            onFormChange={handleLoginFormChange}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onSubmit={handleLogin}
                            onModeChange={toggleMode}
                        />
                    ) : (
                        <RegisterForm
                            formData={registerForm}
                            formErrors={formErrors}
                            showPassword={showPassword}
                            showConfirmPassword={showConfirmPassword}
                            loading={loading}
                            onFormChange={handleRegisterFormChange}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                            onSubmit={handleRegister}
                            onModeChange={toggleMode}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthForm;