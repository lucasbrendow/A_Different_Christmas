import { useAppTranslation } from '../hooks/useAppTranslation';

export function DashboardPage() {
  const { t } = useAppTranslation();

  return (
    <main className="maintenance-page">
      <p className="maintenance-page__message">{t('maintenance.message')}</p>
    </main>
  );
}
