import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '../layouts/AdminLayout';
import { AccessPendingPage } from '../pages/AccessPendingPage';
import { DashboardPage } from '../pages/DashboardPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { RequireAuthentication } from './RequireAuthentication';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/access-pending" element={<AccessPendingPage />} />
          <Route element={<RequireAuthentication />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
