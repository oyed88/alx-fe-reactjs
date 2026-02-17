import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import PostsComponent from './components/PostsComponent';
import './App.css';

// Create a QueryClient with custom default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data remains "fresh" for 30 seconds before a refetch is triggered
      staleTime: 30000,
      // Cached data is kept for 5 minutes after all observers unmount
      cacheTime: 300000,
      // Retry failed requests up to 2 times
      retry: 2,
      // Refetch data when the browser window regains focus
      refetchOnWindowFocus: true,
    },
  },
});

function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <div className="logo-area">
              <div className="logo-icon">
                <span className="logo-q">Q</span>
              </div>
              <div className="logo-text">
                <h1>React Query Demo</h1>
                <p className="logo-sub">Advanced Data Fetching & Caching</p>
              </div>
            </div>
            <nav className="header-nav">
              <button
                className={`nav-btn ${showPosts ? 'active' : ''}`}
                onClick={() => setShowPosts(true)}
              >
                Posts Feed
              </button>
              <button
                className={`nav-btn ${!showPosts ? 'active' : ''}`}
                onClick={() => setShowPosts(false)}
              >
                Cache Info
              </button>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="app-main">
          {showPosts ? (
            <PostsComponent />
          ) : (
            <CacheInfoView onNavigateBack={() => setShowPosts(true)} />
          )}
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            Built with <strong>React Query v3</strong> &amp; JSONPlaceholder API
          </p>
          <p className="footer-hint">
            💡 Navigate away and back to observe cache behavior
          </p>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

// Cache Info educational view
function CacheInfoView({ onNavigateBack }) {
  return (
    <div className="cache-info-view">
      <div className="cache-info-header">
        <h2>How React Query Caching Works</h2>
        <p>Navigate back to Posts to see cached data load instantly</p>
      </div>

      <div className="cache-cards">
        <div className="cache-card">
          <div className="cache-card-icon">⚡</div>
          <h3>Instant Cache Hits</h3>
          <p>
            When you navigate back to the Posts view, React Query serves data
            from its in-memory cache instead of making a new network request —
            as long as the data is still "fresh" (within <code>staleTime</code>).
          </p>
        </div>

        <div className="cache-card">
          <div className="cache-card-icon">🔄</div>
          <h3>Background Refetching</h3>
          <p>
            After <code>staleTime</code> (30s in this demo), React Query marks
            data as stale. On the next visit, it shows stale data immediately
            and refetches in the background, then updates the UI seamlessly.
          </p>
        </div>

        <div className="cache-card">
          <div className="cache-card-icon">🗑️</div>
          <h3>Cache Garbage Collection</h3>
          <p>
            After <code>cacheTime</code> (5 min in this demo) with no active
            observers, React Query removes the data from cache to free memory.
            A fresh fetch will occur on the next visit.
          </p>
        </div>

        <div className="cache-card">
          <div className="cache-card-icon">🎯</div>
          <h3>Manual Invalidation</h3>
          <p>
            The <strong>Refetch Posts</strong> button on the Posts view triggers
            manual refetching via <code>queryClient.invalidateQueries()</code>,
            forcing fresh data regardless of cache state.
          </p>
        </div>

        <div className="cache-card config-card">
          <div className="cache-card-icon">⚙️</div>
          <h3>This Demo's Config</h3>
          <div className="config-table">
            <div className="config-row">
              <span className="config-key">staleTime</span>
              <span className="config-val">30,000ms (30s)</span>
            </div>
            <div className="config-row">
              <span className="config-key">cacheTime</span>
              <span className="config-val">300,000ms (5min)</span>
            </div>
            <div className="config-row">
              <span className="config-key">retry</span>
              <span className="config-val">2 attempts</span>
            </div>
            <div className="config-row">
              <span className="config-key">refetchOnWindowFocus</span>
              <span className="config-val">true</span>
            </div>
          </div>
        </div>
      </div>

      <button className="back-btn" onClick={onNavigateBack}>
        ← Back to Posts (Watch Cache!)
      </button>
    </div>
  );
}

export default App;
