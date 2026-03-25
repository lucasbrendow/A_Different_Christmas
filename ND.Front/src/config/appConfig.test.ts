import { createAppConfig } from './appConfig';

describe('createAppConfig', () => {
  it('uses the provided supported language when valid', () => {
    const config = createAppConfig({
      VITE_API_BASE_URL: 'https://localhost:7158',
      VITE_DEFAULT_LANGUAGE: 'en-US',
      VITE_ENABLE_MOCK_AUTH: 'false',
    });

    expect(config.defaultLanguage).toBe('en-US');
    expect(config.enableMockAuth).toBe(false);
  });

  it('falls back to project defaults when values are missing or invalid', () => {
    const config = createAppConfig({
      VITE_API_BASE_URL: '',
      VITE_DEFAULT_LANGUAGE: 'es-ES',
      VITE_ENABLE_MOCK_AUTH: 'invalid',
    });

    expect(config.apiBaseUrl).toBe('https://localhost:7158');
    expect(config.defaultLanguage).toBe('pt-BR');
    expect(config.enableMockAuth).toBe(true);
  });
});
