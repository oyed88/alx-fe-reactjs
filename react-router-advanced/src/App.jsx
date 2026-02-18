import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Profile from './pages/Profile';
import ProfileDetails from './pages/ProfileDetails';
import ProfileSettings from './pages/ProfileSettings';
import NotFound from './pages/NotFound';

/**
 * App — root component.
 *
 * Route structure:
 *   /                     → Home
 *   /login                → Login
 *   /blog                 → BlogList
 *   /blog/:id             → BlogPost (dynamic routing)
 *   /profile              → Profile [protected] → ProfileDetails (index)
 *   /profile/settings     → Profile [protected] → ProfileSettings (nested)
 *   *                     → NotFound
 */
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Dynamic routing — blog posts */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />

          {/*
            Protected route with nested children.
            - ProtectedRoute checks auth, redirects to /login if not authenticated.
            - Profile renders <Outlet /> where child routes appear.
            - Index route renders ProfileDetails at /profile
            - /profile/settings renders ProfileSettings
          */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          {/* Catch-all — 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;