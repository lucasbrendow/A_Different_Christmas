import { useAppTranslation } from '../hooks/useAppTranslation';

export function NotFoundPage() {
  const { t } = useAppTranslation();

  return (
    <section className="panel centered-panel">
      <h2>{t('notFound.title')}</h2>
      <p>{t('notFound.description')}</p>
    </section>
  );
}
