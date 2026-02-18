import { Link, useLocation } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  const location = useLocation();

  return (
    <main className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.desc}>
          No route matched{' '}
          <code className={styles.path}>{location.pathname}</code>
        </p>
        <div className={styles.links}>
          <Link to="/" className={styles.homeBtn}>← Back to Home</Link>
          <Link to="/blog" className={styles.blogBtn}>Browse Blog</Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
