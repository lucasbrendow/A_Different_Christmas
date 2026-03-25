import { appConfig } from '../../../config/appConfig';
import { StatusBadge } from '../../../components/primitives/StatusBadge';
import { useAppTranslation } from '../../../hooks/useAppTranslation';
import type { AsyncDataState, DashboardFilters, HealthStatus } from '../../../types/app';

interface DashboardOverviewProps {
  filters: DashboardFilters;
  healthState: AsyncDataState<HealthStatus>;
  onRetryHealth: () => void;
}

export function DashboardOverview({ filters, healthState, onRetryHealth }: DashboardOverviewProps) {
  const { t } = useAppTranslation();

  const workflowCards = [
    {
      title: t('dashboard.workflowOneTitle'),
      text: t('dashboard.workflowOneText'),
    },
    {
      title: t('dashboard.workflowTwoTitle'),
      text: t('dashboard.workflowTwoText'),
    },
    {
      title: t('dashboard.workflowThreeTitle'),
      text: t('dashboard.workflowThreeText'),
    },
  ];

  const filterEntries = [
    filters.guardianName,
    filters.neighborhood,
    filters.deliveryStatus !== 'all' ? t(`dashboard.deliveryStatus${capitalize(filters.deliveryStatus)}`) : '',
  ].filter(Boolean);

  return (
    <div className="dashboard-stack">
      <section className="hero panel hero-panel">
        <div className="hero__content">
          <p className="eyebrow">{t('app.adminArea')}</p>
          <h1>{t('dashboard.headline')}</h1>
          <p>{t('dashboard.description')}</p>
        </div>

        <div className="hero__metrics">
          <article className="metric-card">
            <h2>{t('dashboard.metricChildren')}</h2>
            <p>{t('dashboard.metricChildrenText')}</p>
          </article>
          <article className="metric-card">
            <h2>{t('dashboard.metricGuardians')}</h2>
            <p>{t('dashboard.metricGuardiansText')}</p>
          </article>
          <article className="metric-card">
            <h2>{t('dashboard.metricSponsors')}</h2>
            <p>{t('dashboard.metricSponsorsText')}</p>
          </article>
          <article className="metric-card">
            <h2>{t('dashboard.metricLabels')}</h2>
            <p>{t('dashboard.metricLabelsText')}</p>
          </article>
        </div>
      </section>

      <section className="overview-grid">
        <article className="panel panel--tall">
          <div className="panel__header">
            <div>
              <p className="eyebrow">Integration</p>
              <h2>{t('dashboard.healthTitle')}</h2>
            </div>
            {healthState.status === 'success' ? (
              <StatusBadge tone="success">{t('common.online')}</StatusBadge>
            ) : (
              <StatusBadge tone="danger">{t('common.offline')}</StatusBadge>
            )}
          </div>

          <p>{t('dashboard.healthDescription')}</p>

          <dl className="definition-list">
            <div>
              <dt>{t('dashboard.endpointLabel')}</dt>
              <dd>{appConfig.apiBaseUrl}</dd>
            </div>
            <div>
              <dt>{t('dashboard.checkedAt')}</dt>
              <dd>
                {healthState.data?.checkedAtUtc
                  ? new Date(healthState.data.checkedAtUtc).toLocaleString()
                  : '—'}
              </dd>
            </div>
          </dl>

          {healthState.status === 'loading' ? <p>{t('common.loading')}...</p> : null}
          {healthState.status === 'success' && healthState.data ? (
            <p>
              {t('dashboard.healthy')}: {healthState.data.service} / {healthState.data.status}
            </p>
          ) : null}
          {healthState.status === 'error' ? (
            <div className="stack-gap-sm">
              <p>{t('dashboard.unhealthy')}</p>
              <p>{healthState.error}</p>
              <button className="button button--secondary" type="button" onClick={onRetryHealth}>
                {t('common.retry')}
              </button>
            </div>
          ) : null}
        </article>

        <article className="panel panel--tall">
          <div className="panel__header">
            <div>
              <p className="eyebrow">State</p>
              <h2>{t('dashboard.filtersSummary')}</h2>
            </div>
            <StatusBadge tone="neutral">{filterEntries.length.toString()}</StatusBadge>
          </div>

          {filterEntries.length > 0 ? (
            <div className="chip-list">
              {filterEntries.map((filterValue) => (
                <span className="chip" key={filterValue}>
                  {filterValue}
                </span>
              ))}
            </div>
          ) : (
            <p>{t('dashboard.filtersEmpty')}</p>
          )}

          <div className="workflow-list">
            <p className="eyebrow">Roadmap</p>
            <h3>{t('dashboard.workflowTitle')}</h3>
            {workflowCards.map((workflowCard) => (
              <article className="workflow-card" key={workflowCard.title}>
                <h4>{workflowCard.title}</h4>
                <p>{workflowCard.text}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
