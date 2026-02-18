import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Where to redirect after login
  const from = location.state?.from?.pathname || '/profile';

  // Already logged in — redirect
  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate async auth delay
    await new Promise((r) => setTimeout(r, 600));

    const result = login(form.username, form.password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <main className={`${styles.page} page-enter`}>
      <div className={styles.card}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.lockIcon}>◈</span>
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.subtitle}>
            {location.state?.from
              ? `Authentication required to visit ${location.state.from.pathname}`
              : 'Access your protected profile dashboard'}
          </p>
        </div>

        {/* Demo hint */}
        <div className={styles.hint}>
          <span className={styles.hintIcon}>ℹ</span>
          <p>
            <strong>Demo mode:</strong> enter any username + password to sign in.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. alex"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Any non-empty value"
              className={styles.input}
              required
            />
          </div>

          {error && (
            <div className={styles.error}>
              <span>✕</span> {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              'Sign in →'
            )}
          </button>
        </form>

        <p className={styles.back}>
          <Link to="/" className={styles.backLink}>← Back to Home</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
