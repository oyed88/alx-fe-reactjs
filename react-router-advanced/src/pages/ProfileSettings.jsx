import { useState } from 'react';
import styles from './ProfileSettings.module.css';

/**
 * ProfileSettings — nested route rendered at /profile/settings
 * Shown inside Profile's <Outlet />
 */
const ProfileSettings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    digest: true,
  });

  const [theme, setTheme] = useState('dark');
  const [saved, setSaved] = useState(false);

  const handleToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className={styles.settings}>
      <header className={styles.header}>
        <span className={styles.tag}>Nested Route — /profile/settings</span>
        <h2 className={styles.title}>Settings</h2>
      </header>

      {/* Notifications */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Notifications</h3>
        <div className={styles.toggleList}>
          {Object.entries(notifications).map(([key, val]) => (
            <div key={key} className={styles.toggleRow}>
              <div>
                <p className={styles.toggleLabel}>
                  {key === 'email' ? 'Email notifications' :
                   key === 'push' ? 'Push notifications' :
                   'Weekly digest'}
                </p>
                <p className={styles.toggleDesc}>
                  {key === 'email' ? 'Receive updates via email' :
                   key === 'push' ? 'Browser push notifications' :
                   'Summary of weekly activity'}
                </p>
              </div>
              <button
                onClick={() => handleToggle(key)}
                className={`${styles.toggle} ${val ? styles.on : ''}`}
                aria-checked={val}
                role="switch"
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Theme */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Appearance</h3>
        <div className={styles.themeGroup}>
          {['dark', 'light', 'system'].map((t) => (
            <button
              key={t}
              onClick={() => { setTheme(t); setSaved(false); }}
              className={`${styles.themeBtn} ${theme === t ? styles.themeActive : ''}`}
            >
              {t === 'dark' ? '◼' : t === 'light' ? '◻' : '◈'}{' '}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Save */}
      <div className={styles.footer}>
        {saved && (
          <span className={styles.savedMsg}>✓ Settings saved</span>
        )}
        <button onClick={handleSave} className={styles.saveBtn}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
