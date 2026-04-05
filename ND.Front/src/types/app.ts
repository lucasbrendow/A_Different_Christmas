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

export interface CampaignImpactSummary {
  supportedChildren: number;
  collectedGifts: number;
  participatingGuardians: number;
  completionRate: number;
  lastUpdatedUtc: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}
