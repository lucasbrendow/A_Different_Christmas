import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { LoginForm } from '../features/auth/components/LoginForm';
import loginPageImage from '../images/login_page_image.png';
import { authenticate } from '../services/auth/authService';
import { useAppSettings } from '../state/AppSettingsContext';
import type { LoginCredentials } from '../types/app';

export function LoginPage() {
  const { isAuthenticated, signIn } = useAppSettings();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const backgroundStyle = {
    '--login-background-image': `url(${loginPageImage})`,
  } as CSSProperties;

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }

  async function handleLogin(values: LoginCredentials) {
    setIsSubmitting(true);
    setErrorKey(null);

    try {
      const result = await authenticate(values);

      if (!result.success) {
        setErrorKey(result.errorKey ?? 'auth.genericError');

        if (result.errorKey === 'auth.loginUnavailable') {
          navigate('/access-pending');
        }

        return;
      }

      signIn(values.rememberMe);
      navigate('/dashboard', { replace: true });
    } catch {
      setErrorKey('auth.genericError');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page" style={backgroundStyle}>
      <div className="login-shell">
        <div className="background-orb background-orb--left" />
        <div className="background-orb background-orb--right" />

        <main className="login-grid login-grid--solo">
          <LoginForm errorMessage={errorKey ?? undefined} isSubmitting={isSubmitting} onSubmit={handleLogin} />
        </main>
      </div>
    </div>
  );
}