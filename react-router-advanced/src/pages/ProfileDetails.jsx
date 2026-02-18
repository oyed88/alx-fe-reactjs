import { useAuth } from '../context/AuthContext';
import styles from './ProfileDetails.module.css';

/**
 * ProfileDetails — index nested route rendered at /profile
 * Shown inside Profile's <Outlet />
 */
const ProfileDetails = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Posts published', value: '12' },
    { label: 'Comments', value: '48' },
    { label: 'Member since', value: user.joinDate },
  ];

  const info = [
    { field: 'Username', value: user.username },
    { field: 'Display name', value: user.name },
    { field: 'Role', value: user.role },
    { field: 'Email', value: `${user.username}@example.com` },
    { field: 'Status', value: 'Active' },
  ];

  return (
    <div className={styles.details}>
      <header className={styles.header}>
        <span className={styles.tag}>Nested Route — /profile (index)</span>
        <h2 className={styles.title}>Profile Details</h2>
      </header>

      {/* Stats */}
      <div className={styles.stats}>
        {stats.map((s) => (
          <div key={s.label} className={styles.stat}>
            <p className={styles.statValue}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Info table */}
      <div className={styles.table}>
        {info.map((row) => (
          <div key={row.field} className={styles.row}>
            <span className={styles.field}>{row.field}</span>
            <span className={styles.value}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDetails;
