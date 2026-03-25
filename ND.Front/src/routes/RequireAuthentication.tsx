import { Navigate, Outlet } from 'react-router-dom';

import { useAppSettings } from '../state/AppSettingsContext';

export function RequireAuthentication() {
  const { isAuthenticated } = useAppSettings();

  if (!isAuthenticated) {
    return <Navigate replace to="/access-pending" />;
  }

  return <Outlet />;
}
