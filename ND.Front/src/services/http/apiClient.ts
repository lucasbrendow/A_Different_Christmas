import { appConfig } from '../../config/appConfig';

export class ApiClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiClientError';
  }
}

function buildUrl(path: string) {
  const baseUrl = appConfig.apiBaseUrl.endsWith('/') ? appConfig.apiBaseUrl : `${appConfig.apiBaseUrl}/`;

  return new URL(path.replace(/^\//, ''), baseUrl).toString();
}

export async function apiClient<TResponse>(
  path: string,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiClientError(`Request failed with status ${response.status}.`);
  }

  return (await response.json()) as TResponse;
}
