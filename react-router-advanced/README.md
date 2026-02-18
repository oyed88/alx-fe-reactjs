# react-router-advanced

Advanced React Router v6 patterns: nested routes, protected routes, and dynamic routing.

## Quick Start

```bash
npm install
npm run dev
```

---

## Route Structure

```
/                      Public — Home page
/login                 Public — Login (simulated auth)
/blog                  Public — Blog post list
/blog/:postId          Public — Dynamic blog post (useParams)
/profile               Protected — ProfileDetails (index nested route)
/profile/settings      Protected — ProfileSettings (nested route)
*                      Catch-all — 404 NotFound
```

---

## Features Implemented

### 1. Nested Routes (`/profile` + `/profile/settings`)

`Profile.jsx` is the parent route element. It renders a sidebar layout and an `<Outlet />` — a placeholder where child routes are injected.

```jsx
// App.jsx
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
  <Route index element={<ProfileDetails />} />
  <Route path="settings" element={<ProfileSettings />} />
</Route>
```

```jsx
// Profile.jsx — parent renders Outlet
import { Outlet } from 'react-router-dom';

const Profile = () => (
  <div>
    <Sidebar />
    <Outlet /> {/* child route renders here */}
  </div>
);
```

- `/profile` → renders `ProfileDetails` (index route)
- `/profile/settings` → renders `ProfileSettings`
- Navigation between sub-pages via `NavLink` with `isActive` styling

---

### 2. Dynamic Routing (`/blog/:postId`)

The `:postId` segment is a URL parameter resolved at runtime via `useParams()`.

```jsx
// App.jsx
<Route path="/blog/:postId" element={<BlogPost />} />
```

```jsx
// BlogPost.jsx
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams(); // e.g. "react-router-nested-routes"
  const post = POSTS[postId];

  if (!post) return <NotFoundState />;
  return <article>...</article>;
};
```

- Any `/blog/<slug>` renders the matching post without hardcoded routes
- Unknown slugs show an inline 404 state with the attempted URL

---

### 3. Protected Routes

`ProtectedRoute` is a wrapper component that checks `isAuthenticated` from `AuthContext`. If not authenticated, it redirects to `/login` while storing the intended path in `location.state.from` for post-login redirect.

```jsx
// ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
```

```jsx
// Login.jsx — post-login redirect
const from = location.state?.from?.pathname || '/profile';
navigate(from, { replace: true });
```

---

### 4. Authentication Context

`AuthContext` provides global auth state via React Context.

```jsx
const { user, login, logout, isAuthenticated } = useAuth();

// login() accepts any non-empty credentials in demo mode
const result = login('alex', 'password');
// { success: true } → sets user object
// { success: false, error: '...' } → invalid
```

---

## File Structure

```
src/
├── App.jsx                     # Router config — all routes defined here
├── main.jsx
├── index.css
├── context/
│   └── AuthContext.jsx         # Auth state + useAuth hook
├── components/
│   ├── Navbar.jsx              # Global nav with NavLink active states
│   ├── Navbar.module.css
│   ├── ProtectedRoute.jsx      # Route guard component
├── pages/
│   ├── Home.jsx / .module.css
│   ├── Login.jsx / .module.css
│   ├── BlogList.jsx / .module.css
│   ├── BlogPost.jsx / .module.css    # Dynamic — uses useParams
│   ├── Profile.jsx / .module.css     # Nested parent — renders <Outlet />
│   ├── ProfileDetails.jsx / .module.css  # Index nested route
│   ├── ProfileSettings.jsx / .module.css # /profile/settings
│   └── NotFound.jsx / .module.css
```

---

## Testing Checklist

| Scenario | Expected |
|---|---|
| Visit `/profile` (not logged in) | Redirect to `/login` |
| Log in with any credentials | Redirect back to `/profile` |
| Visit `/blog` | Show post list |
| Click a post | Navigate to `/blog/:postId` |
| Visit `/blog/unknown-slug` | Inline 404 state |
| Visit `/profile/settings` | Render Settings inside Profile layout |
| Click "Sign out" | Redirect to home, Profile link disappears |
| Visit `/anything-else` | 404 NotFound page |

---

## Key React Router v6 APIs Used

| API | Usage |
|---|---|
| `<BrowserRouter>` | Wraps app with routing context |
| `<Routes>` + `<Route>` | Declares route tree |
| `<Outlet />` | Renders matched child route in parent |
| `<Navigate>` | Programmatic redirect via JSX |
| `<NavLink>` | Nav links with `isActive` callback |
| `<Link>` | Declarative navigation |
| `useParams()` | Reads dynamic URL segments |
| `useNavigate()` | Programmatic navigation |
| `useLocation()` | Reads current location + state |
