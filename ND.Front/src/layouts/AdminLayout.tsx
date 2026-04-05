import { NavLink, Outlet } from 'react-router-dom';

import { useAppTranslation } from '../hooks/useAppTranslation';
import { useAppSettings } from '../state/AppSettingsContext';

export function AdminLayout() {
  const { t } = useAppTranslation();
  const { language, signOut, supportedLanguages, setLanguage } = useAppSettings();

  return (
    <div className="app-shell">
      <div className="background-orb background-orb--left" />
      <div className="background-orb background-orb--right" />

      <header className="topbar">
        <div>
          <p className="eyebrow">{t('app.adminArea')}</p>
          <h1>{t('app.title')}</h1>
          <p>{t('app.subtitle')}</p>
        </div>

        <div className="topbar__actions">
          <span className="topbar__language-label">{t('app.language')}</span>
          <div className="language-toggle" role="group" aria-label={t('app.language')}>
            {supportedLanguages.map((supportedLanguage) => (
              <button
                key={supportedLanguage}
                className={supportedLanguage === language ? 'button button--primary' : 'button button--ghost'}
                type="button"
                onClick={() => setLanguage(supportedLanguage)}
              >
                {supportedLanguage}
              </button>
            ))}
          </div>
          <button className="button button--secondary" type="button" onClick={signOut}>
            {t('app.signOut')}
          </button>
        </div>
      </header>

      <nav className="navigation">
        <NavLink className="navigation__link" to="/dashboard">
          {t('navigation.dashboard')}
        </NavLink>
      </nav>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}
