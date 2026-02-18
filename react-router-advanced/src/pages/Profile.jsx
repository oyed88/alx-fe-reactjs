import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Profile.module.css';

/**
 * Profile — parent route component.
 * Renders a sidebar nav + <Outlet /> for nested child routes:
 *   /profile         → ProfileDetails (index)
 *   /profile/settings → ProfileSettings
 */
const Profile = () => {
  const { user } = useAuth();

  return (
    <main className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* User card */}
          <div className={styles.userCard}>
            <div className={styles.avatar}>{user.avatar}</div>
            <div>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userRole}>{user.role}</p>
            </div>
          </div>

          {/* Nested route nav */}
          <nav className={styles.nav}>
            <p className={styles.navLabel}>// sections</p>
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navActive : ''}`
              }
            >
              <span className={styles.navIcon}>◉</span>
              Details
            </NavLink>
            <NavLink
              to="/profile/settings"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navActive : ''}`
              }
            >
              <span className={styles.navIcon}>◈</span>
              Settings
            </NavLink>
          </nav>
        </aside>

        {/* Child route content */}
        <section className={styles.content}>
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default Profile;
