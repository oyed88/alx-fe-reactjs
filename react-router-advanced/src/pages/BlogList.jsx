import { Link } from 'react-router-dom';
import styles from './BlogList.module.css';

// Static blog post data — in a real app, fetched from an API
const POSTS = [
  {
    id: 'react-router-nested-routes',
    title: 'Mastering Nested Routes in React Router v6',
    excerpt: 'Learn how to compose complex UI layouts using nested routes and the Outlet component for seamless parent-child rendering.',
    tag: 'Routing',
    readTime: '6 min',
    date: 'Feb 10, 2026',
  },
  {
    id: 'protected-routes-auth',
    title: 'Implementing Protected Routes with Authentication',
    excerpt: 'A complete guide to building route guards that redirect unauthenticated users and restore their intended destination after login.',
    tag: 'Security',
    readTime: '8 min',
    date: 'Feb 5, 2026',
  },
  {
    id: 'dynamic-routing-patterns',
    title: 'Dynamic Routing Patterns for Real-World Apps',
    excerpt: 'Explore useParams, dynamic segments, and how to build scalable URL structures for user profiles, blog posts, and product pages.',
    tag: 'Patterns',
    readTime: '5 min',
    date: 'Jan 28, 2026',
  },
  {
    id: 'react-router-v6-guide',
    title: 'React Router v6 — What Changed and Why It Matters',
    excerpt: 'A deep dive into the API changes from v5 to v6, including the new Routes component, relative links, and loader patterns.',
    tag: 'Guide',
    readTime: '10 min',
    date: 'Jan 20, 2026',
  },
];

const BlogList = () => {
  return (
    <main className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        {/* Header */}
        <header className={styles.header}>
          <span className={styles.tag}>Dynamic routing — /blog/:postId</span>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Each post link demonstrates dynamic routing — variable{' '}
            <code className={styles.code}>:postId</code> segments resolved at runtime.
          </p>
        </header>

        {/* Post list */}
        <div className={styles.list}>
          {POSTS.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span className={styles.postTag}>{post.tag}</span>
                <span className={styles.meta}>
                  {post.date} · {post.readTime} read
                </span>
              </div>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              <span className={styles.readMore}>Read post →</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogList;
