export const supportedLanguages = ['pt-BR', 'en-US'] as const;

export type AppLanguage = (typeof supportedLanguages)[number];

export interface HealthStatus {
  service: string;
  status: string;
  checkedAtUtc: string;
}

export interface DashboardFilters {
  guardianName: string;
  neighborhood: string;
  deliveryStatus: 'all' | 'pendingGift' | 'receivedGift' | 'delivered';
}

export interface AsyncDataState<TData> {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: TData | null;
  error: string | null;
}
