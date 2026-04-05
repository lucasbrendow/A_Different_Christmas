import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '../layouts/AdminLayout';
import { AccessPendingPage } from '../pages/AccessPendingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RequireAuthentication } from './RequireAuthentication';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/access-pending" element={<AccessPendingPage />} />
        <Route element={<RequireAuthentication />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
