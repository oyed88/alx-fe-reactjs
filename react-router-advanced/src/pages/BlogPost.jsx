import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './BlogPost.module.css';

// Post data store — keyed by dynamic :id segment
const POSTS = {
  'react-router-nested-routes': {
    id: 'react-router-nested-routes',
    title: 'Mastering Nested Routes in React Router v6',
    tag: 'Routing',
    readTime: '6 min',
    date: 'Feb 10, 2026',
    author: 'The RouteX Team',
    content: [
      {
        heading: 'What Are Nested Routes?',
        body: `Nested routes allow you to render child components inside a parent layout component. The parent renders an <Outlet /> where child routes appear, letting you share navigation, headers, and sidebars across multiple sub-pages without repeating markup.`,
      },
      {
        heading: 'Setting Up the Parent Route',
        body: `In React Router v6, you define nested routes by placing <Route> elements inside a parent <Route>. The parent's element renders an <Outlet /> where matched children will appear. This makes layout composition extremely clean and declarative.`,
      },
      {
        heading: 'Index Routes',
        body: `An index route is the default child shown when no sub-path is matched. You define it with <Route index element={<Component />} />. In this project, ProfileDetails serves as the index route for /profile, while ProfileSettings renders at /profile/settings.`,
      },
      {
        heading: 'NavLink Active States',
        body: `React Router's NavLink component accepts a className function that receives { isActive } — making it trivial to style active navigation items without managing state yourself. Combined with the end prop, you can ensure exact-match highlighting.`,
      },
    ],
  },
  'protected-routes-auth': {
    id: 'protected-routes-auth',
    title: 'Implementing Protected Routes with Authentication',
    tag: 'Security',
    readTime: '8 min',
    date: 'Feb 5, 2026',
    author: 'The RouteX Team',
    content: [
      {
        heading: 'The Problem with Open Routes',
        body: `Without route protection, any user can navigate directly to sensitive pages like dashboards or settings. We need a mechanism to check authentication status before rendering a page, and redirect unauthorized users gracefully.`,
      },
      {
        heading: 'Building the ProtectedRoute Component',
        body: `The ProtectedRoute wrapper checks isAuthenticated from our AuthContext. If the user is not logged in, it renders a <Navigate> component pointing to /login, passing the current location in state so we know where to redirect post-login.`,
      },
      {
        heading: 'Post-Login Redirect',
        body: `After a successful login, we read location.state?.from?.pathname to find out where the user was trying to go. We then call navigate(from, { replace: true }) to redirect them to their original destination — seamless UX with no lost context.`,
      },
      {
        heading: 'Context vs. Local State',
        body: `Using React Context for authentication state makes it accessible anywhere in the tree without prop drilling. The useAuth hook provides a clean interface — { user, login, logout, isAuthenticated } — consumed by both ProtectedRoute and UI components.`,
      },
    ],
  },
  'dynamic-routing-patterns': {
    id: 'dynamic-routing-patterns',
    title: 'Dynamic Routing Patterns for Real-World Apps',
    tag: 'Patterns',
    readTime: '5 min',
    date: 'Jan 28, 2026',
    author: 'The RouteX Team',
    content: [
      {
        heading: 'URL Parameters with useParams',
        body: `Dynamic route segments (e.g., :id) are extracted at runtime using the useParams hook. This lets you render any content based on the URL — blog posts, user profiles, product pages — without hardcoding paths or using query strings.`,
      },
      {
        heading: 'Pattern: Resource Pages',
        body: `The most common pattern is /resource/:id — a list page at /resource and a detail page at /resource/:id. The list links to details; details link back to the list. Navigation state can pass extra data between them to avoid redundant API calls.`,
      },
      {
        heading: 'Handling 404s for Dynamic Segments',
        body: `When a :id doesn't match any known resource, you should render a NotFound state inline rather than redirecting. This preserves the URL context and gives better UX than a blank or generic 404 page.`,
      },
      {
        heading: 'Optional Segments and Multiple Params',
        body: `React Router v6 supports multiple dynamic segments in one path — e.g., /users/:userId/posts/:id. Each segment is available via useParams. Complex nesting is better handled via nested routes than deeply parameterized paths.`,
      },
    ],
  },
  'react-router-v6-guide': {
    id: 'react-router-v6-guide',
    title: 'React Router v6 — What Changed and Why It Matters',
    tag: 'Guide',
    readTime: '10 min',
    date: 'Jan 20, 2026',
    author: 'The RouteX Team',
    content: [
      {
        heading: 'From Switch to Routes',
        body: `v6 replaces <Switch> with <Routes>, which is smarter about matching. All <Route> children are evaluated and the best match wins — no more ordering concerns. The element prop accepts JSX directly, replacing the component prop.`,
      },
      {
        heading: 'Relative Links and Paths',
        body: `v6 makes all links and paths relative by default. A <Link to="settings"> inside a /profile route resolves to /profile/settings without any absolute path gymnastics. This dramatically simplifies nested navigation code.`,
      },
      {
        heading: 'Goodbye Render Props',
        body: `The old render and children prop patterns on Route are gone. Everything is done through hooks — useParams, useNavigate, useLocation, and useMatch. This is more consistent with the React Hooks model and easier to test.`,
      },
      {
        heading: 'Data Routers (v6.4+)',
        body: `React Router v6.4 introduced data routers with loaders and actions, bringing server-style data fetching patterns to the client. Routes can declare data dependencies and loaders run before the component renders, eliminating loading flicker.`,
      },
    ],
  },
};

/**
 * BlogPost — dynamic route component.
 * Reads the :id URL parameter via useParams to determine which post to render.
 */
const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = POSTS[id];

  // Handle unknown id
  if (!post) {
    return (
      <main className={`${styles.page} page-enter`}>
        <div className={styles.inner}>
          <div className={styles.notFound}>
            <span className={styles.notFoundCode}>404</span>
            <h1 className={styles.notFoundTitle}>Post not found</h1>
            <p className={styles.notFoundDesc}>
              No post exists for <code className={styles.code}>/blog/{id}</code>
            </p>
            <Link to="/blog" className={styles.backBtn}>← Back to Blog</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`${styles.page} page-enter`}>
      <div className={styles.inner}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link to="/blog" className={styles.breadcrumbLink}>Blog</Link>
          <span className={styles.sep}>/</span>
          <span className={styles.breadcrumbCurrent}>{post.tag}</span>
        </nav>

        {/* Post header */}
        <header className={styles.header}>
          <div className={styles.metaRow}>
            <span className={styles.tag}>{post.tag}</span>
            <span className={styles.meta}>{post.date} · {post.readTime} read</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.paramBadge}>
            <span className={styles.paramLabel}>useParams() →</span>
            <code className={styles.paramValue}>id: "{id}"</code>
          </div>
        </header>

        {/* Content sections */}
        <article className={styles.article}>
          {post.content.map((section, i) => (
            <section key={i} className={styles.section}>
              <h2 className={styles.sectionHeading}>{section.heading}</h2>
              <p className={styles.sectionBody}>{section.body}</p>
            </section>
          ))}
        </article>

        {/* Footer nav */}
        <footer className={styles.footer}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            ← Back
          </button>
          <Link to="/blog" className={styles.allBtn}>All posts →</Link>
        </footer>
      </div>
    </main>
  );
};

export default BlogPost;