import { appConfig } from '../../config/appConfig';
import type { LoginCredentials } from '../../types/app';

export interface AuthenticationResult {
  success: boolean;
  errorKey?: 'auth.loginUnavailable' | 'auth.genericError';
}

function wait(delayInMilliseconds: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayInMilliseconds);
  });
}

export async function authenticate(credentials: LoginCredentials): Promise<AuthenticationResult> {
  await wait(450);

  if (!appConfig.enableMockAuth) {
    return {
      success: false,
      errorKey: 'auth.loginUnavailable',
    };
  }

  if (!credentials.email.trim() || !credentials.password.trim()) {
    return {
      success: false,
      errorKey: 'auth.genericError',
    };
  }

  return {
    success: true,
  };
}