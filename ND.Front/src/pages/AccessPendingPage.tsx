import { useAppTranslation } from '../hooks/useAppTranslation';

export function AccessPendingPage() {
  const { t } = useAppTranslation();

  return (
    <section className="panel centered-panel">
      <h2>{t('access.title')}</h2>
      <p>{t('access.description')}</p>
    </section>
  );
}
