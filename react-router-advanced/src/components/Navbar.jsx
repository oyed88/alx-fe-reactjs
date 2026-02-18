import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        {/* Logo */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoMark}>▲</span>
          <span className={styles.logoText}>RouteX</span>
        </NavLink>

        {/* Nav Links */}
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              Blog
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                Profile
              </NavLink>
            </li>
          )}
        </ul>

        {/* Auth Actions */}
        <div className={styles.authArea}>
          {isAuthenticated ? (
            <div className={styles.userBlock}>
              <div className={styles.avatar}>{user.avatar}</div>
              <span className={styles.userName}>{user.name}</span>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                Sign out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={styles.loginBtn}>
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
