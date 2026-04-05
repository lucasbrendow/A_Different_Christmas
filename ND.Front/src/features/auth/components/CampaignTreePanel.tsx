import { useMemo } from 'react';

import { useAppTranslation } from '../../../hooks/useAppTranslation';
import { useAppSettings } from '../../../state/AppSettingsContext';
import type { AsyncDataState, CampaignImpactSummary } from '../../../types/app';

interface CampaignTreePanelProps {
  state: AsyncDataState<CampaignImpactSummary>;
  onRetry: () => void;
}

export function CampaignTreePanel({ state, onRetry }: CampaignTreePanelProps) {
  const { t } = useAppTranslation();
  const { language } = useAppSettings();

  const numberFormatter = useMemo(() => new Intl.NumberFormat(language), [language]);
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(language, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    [language],
  );

  const supportedChildren = state.data ? numberFormatter.format(state.data.supportedChildren) : '...';
  const collectedGifts = state.data ? numberFormatter.format(state.data.collectedGifts) : '...';
  const participatingGuardians = state.data ? numberFormatter.format(state.data.participatingGuardians) : '...';
  const completionRate = state.data ? `${state.data.completionRate}%` : '...';
  const updatedAt = state.data ? dateFormatter.format(new Date(state.data.lastUpdatedUtc)) : null;

  return (
    <section className="tree-panel">
      <div className="tree-panel__header">
        <div>
          <p className="eyebrow">{t('auth.eyebrow')}</p>
          <h2>{t('auth.heroTitle')}</h2>
        </div>

        <p>{t('auth.heroDescription')}</p>
        <p>{t('auth.heroSupport')}</p>
      </div>

      <div className="tree-scene">
        <div className="tree-ornament tree-ornament--children">
          <strong>{supportedChildren}</strong>
          <span>{t('auth.metricChildren')}</span>
        </div>

        <div className="tree-ornament tree-ornament--gifts">
          <strong>{collectedGifts}</strong>
          <span>{t('auth.metricGifts')}</span>
        </div>

        <div className="tree-ornament tree-ornament--guardians">
          <strong>{participatingGuardians}</strong>
          <span>{t('auth.metricGuardians')}</span>
        </div>
      </div>

      <div className="tree-metrics" aria-label={t('auth.impactTitle')}>
        <article className="tree-stat">
          <span className="tree-stat__label">{t('auth.metricChildren')}</span>
          <h3 className="tree-stat__value">{supportedChildren}</h3>
        </article>

        <article className="tree-stat">
          <span className="tree-stat__label">{t('auth.metricGifts')}</span>
          <h3 className="tree-stat__value">{collectedGifts}</h3>
        </article>

        <article className="tree-stat">
          <span className="tree-stat__label">{t('auth.metricGuardians')}</span>
          <h3 className="tree-stat__value">{participatingGuardians}</h3>
        </article>
      </div>

      <div className="tree-meta">
        {state.status === 'loading' ? <p>{t('auth.impactLoading')}</p> : null}
        {state.status === 'error' ? (
          <>
            <p>{t(state.error ?? 'auth.impactError')}</p>
            <button className="button button--secondary" type="button" onClick={onRetry}>
              {t('common.retry')}
            </button>
          </>
        ) : null}
        {state.status === 'success' ? (
          <>
            <p>
              {t('auth.impactCompletion')}: <strong>{completionRate}</strong>
            </p>
            {updatedAt ? (
              <time dateTime={state.data?.lastUpdatedUtc}>
                {t('auth.impactUpdatedAt')}: {updatedAt}
              </time>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}