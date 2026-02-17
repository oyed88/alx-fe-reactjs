import { useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';

// ─── API Fetcher ──────────────────────────────────────────────────────────────
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// ─── Main Component ───────────────────────────────────────────────────────────
function PostsComponent() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // ── useQuery hook ─────────────────────────────────────────────────────────
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    error,
    dataUpdatedAt,
    status,
    refetch,
  } = useQuery(
    'posts',           // Query key - uniquely identifies this query in the cache
    fetchPosts,        // Fetcher function
    {
      staleTime: 30000,         // Data fresh for 30s
      cacheTime: 300000,        // Cache persists 5 min after unmount
      retry: 2,                 // Retry 2x on failure
      refetchOnWindowFocus: true, // Refetch when tab regains focus
      onSuccess: (data) => {
        console.log(`✅ Posts loaded: ${data.length} items`);
      },
      onError: (err) => {
        console.error('❌ Failed to fetch posts:', err.message);
      },
    }
  );

  // ── Derived state ─────────────────────────────────────────────────────────
  const filteredPosts = posts
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleRefetch = () => {
    // Invalidate the cache and trigger a fresh fetch
    queryClient.invalidateQueries('posts');
  };

  const handleManualRefetch = () => {
    // Directly trigger refetch without invalidating
    refetch();
  };

  // ── Loading State ──────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="posts-container">
        <div className="loading-state">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <h2>Fetching Posts...</h2>
          <p>Loading data from JSONPlaceholder API</p>
          <div className="loading-bar">
            <div className="loading-bar-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="posts-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h2>Failed to Load Posts</h2>
          <p className="error-message">{error.message}</p>
          <div className="error-actions">
            <button className="btn-primary" onClick={handleManualRefetch}>
              Try Again
            </button>
            <button
              className="btn-secondary"
              onClick={() => queryClient.removeQueries('posts')}
            >
              Clear Cache & Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Success State ──────────────────────────────────────────────────────────
  return (
    <div className="posts-container">
      {/* Status Bar */}
      <div className="status-bar">
        <div className="status-badges">
          <span className={`status-badge ${status === 'success' ? 'success' : ''}`}>
            {status === 'success' ? '✓ Loaded' : status}
          </span>
          {isFetching && (
            <span className="status-badge fetching">
              <span className="pulse-dot"></span> Syncing...
            </span>
          )}
          <span className="status-badge info">
            {posts?.length} posts total
          </span>
        </div>
        <div className="last-updated">
          Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search posts by title or content..."
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => { setSearchTerm(''); setCurrentPage(1); }}>
              ✕
            </button>
          )}
        </div>

        <div className="toolbar-actions">
          <button
            className="btn-refetch"
            onClick={handleManualRefetch}
            disabled={isFetching}
            title="Trigger a direct refetch"
          >
            {isFetching ? '⟳ Fetching...' : '⟳ Refetch'}
          </button>
          <button
            className="btn-invalidate"
            onClick={handleRefetch}
            disabled={isFetching}
            title="Invalidate cache and refetch"
          >
            🗑 Invalidate Cache
          </button>
        </div>
      </div>

      {/* Results info */}
      {searchTerm && (
        <div className="results-info">
          Found <strong>{filteredPosts.length}</strong> posts matching "
          <em>{searchTerm}</em>"
        </div>
      )}

      {/* Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="posts-grid">
          {paginatedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isSelected={selectedPost?.id === post.id}
              onClick={() =>
                setSelectedPost(selectedPost?.id === post.id ? null : post)
              }
            />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <span>🔎</span>
          <p>No posts found for "{searchTerm}"</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <div className="page-numbers">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNum;
              if (totalPages <= 7) {
                pageNum = i + 1;
              } else if (currentPage <= 4) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pageNum = totalPages - 6 + i;
              } else {
                pageNum = currentPage - 3 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            className="page-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

// ─── PostCard Component ───────────────────────────────────────────────────────
function PostCard({ post, isSelected, onClick }) {
  return (
    <article
      className={`post-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="post-number">#{post.id}</div>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <div className="post-footer">
        <span className="post-user">User {post.userId}</span>
        <span className="read-more">{isSelected ? 'Click to collapse ↑' : 'Click to expand ↓'}</span>
      </div>
    </article>
  );
}

// ─── PostModal Component ──────────────────────────────────────────────────────
function PostModal({ post, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-post-id">Post #{post.id}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <h2 className="modal-title">{post.title}</h2>
        <div className="modal-meta">
          <span className="modal-user">👤 User {post.userId}</span>
          <span className="modal-cached">⚡ Served from React Query cache</span>
        </div>
        <p className="modal-body">{post.body}</p>
        <div className="modal-query-info">
          <h4>React Query Info</h4>
          <p>This post detail is rendered from the <code>'posts'</code> query cache —
          no additional API call was needed to open this modal.</p>
        </div>
      </div>
    </div>
  );
}

export default PostsComponent;
