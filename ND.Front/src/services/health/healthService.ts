import type { HealthStatus } from '../../types/app';
import { apiClient } from '../http/apiClient';

export function getHealthStatus(signal?: AbortSignal) {
  return apiClient<HealthStatus>('api/health', {
    method: 'GET',
    signal,
  });
}
