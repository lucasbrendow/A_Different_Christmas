import type { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';

import { AppProviders } from '../app/providers/AppProviders';

function Wrapper({ children }: PropsWithChildren) {
  return <AppProviders>{children}</AppProviders>;
}

export function renderWithProviders(component: ReactElement) {
  return render(component, { wrapper: Wrapper });
}
