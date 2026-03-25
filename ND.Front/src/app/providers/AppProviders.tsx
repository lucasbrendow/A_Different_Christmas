import type { PropsWithChildren } from 'react';

import { AppSettingsProvider } from '../../state/AppSettingsContext';

export function AppProviders({ children }: PropsWithChildren) {
  return <AppSettingsProvider>{children}</AppSettingsProvider>;
}
