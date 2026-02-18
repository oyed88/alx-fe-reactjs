import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Home.module.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: '⬡',
      title: 'Nested Routes',
      desc: 'Profile sub-pages (Details & Settings) rendered within a shared layout using React Router's outlet system.',
      path: isAuthenticated ? '/profile' : null,
    },
    {
      icon: '◈',
      title: 'Dynamic Routing',
      desc: 'Blog posts resolved by variable URL segments — /blog/:postId loads any post without hardcoding paths.',
      path: '/blog',
    },
    {
      icon: '⬛',
      title: 'Protected Routes',
      desc: 'Route guards redirect unauthenticated users to /login, then restore their destination after sign-in.',
      path: isAuthenticated ? '/profile' : '/login',
    },
  ];

  return (
    <main className={`${styles.home} page-enter`}>
      {/* Hero */}
      <section className={`${styles.hero} grid-bg`}>
        <div className={styles.heroInner}>
          <div className={styles.badge}>React Router v6</div>
          <h1 className={styles.title}>
            Advanced<br />
            <span className={styles.accent}>Routing</span><br />
            Patterns
          </h1>
          <p className={styles.subtitle}>
            Nested routes, protected pages, and dynamic URL segments —
            the full playbook for React Router in production apps.
          </p>
          <div className={styles.cta}>
            <Link to="/blog" className={styles.ctaPrimary}>
              Explore Blog →
            </Link>
            {!isAuthenticated && (
              <Link to="/login" className={styles.ctaSecondary}>
                Sign in to see Profile
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/profile" className={styles.ctaSecondary}>
                View Profile
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <p className={styles.sectionLabel}>// What's implemented</p>
        <div className={styles.grid}>
          {features.map((f) => (
            <div key={f.title} className={styles.card}>
              <span className={styles.cardIcon}>{f.icon}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              {f.path && (
                <Link to={f.path} className={styles.cardLink}>
                  Try it →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Route map */}
      <section className={styles.routeMap}>
        <p className={styles.sectionLabel}>// Route structure</p>
        <div className={styles.codeBlock}>
          <pre>{`<Routes>
  <Route path="/"         element={<Home />} />
  <Route path="/login"    element={<Login />} />
  <Route path="/blog"     element={<BlogList />} />
  <Route path="/blog/:postId" element={<BlogPost />} />

  {/* Protected — requires auth */}
  <Route path="/profile" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }>
    <Route index          element={<ProfileDetails />} />
    <Route path="settings" element={<ProfileSettings />} />
  </Route>

  <Route path="*"         element={<NotFound />} />
</Routes>`}</pre>
        </div>
      </section>
    </main>
  );
};

export default Home;
