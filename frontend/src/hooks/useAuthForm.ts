import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../store';
import { loginUser, registerUser } from '../store/authActions';
import {
  validateLoginForm,
  validateRegisterForm,
} from '../utils/authValidation';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export const useAuthForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateLoginForm(loginForm);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const result = await dispatch(
        loginUser(loginForm.email, loginForm.password) as any
      );
      if (result) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateRegisterForm(registerForm);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    try {
      const result = await dispatch(
        registerUser(registerForm.email, registerForm.password) as any
      );
      if (result) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Register error:', err);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormErrors({});
    setLoginForm({ email: '', password: '' });
    setRegisterForm({ email: '', password: '', confirmPassword: '' });
  };

  return {
    // State
    isLogin,
    showPassword,
    showConfirmPassword,
    formErrors,
    loginForm,
    registerForm,
    loading,
    error,

    // Actions
    setShowPassword,
    setShowConfirmPassword,
    setLoginForm,
    setRegisterForm,
    handleLogin,
    handleRegister,
    toggleMode,
  };
};
