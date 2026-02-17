# react-query-demo

Advanced data fetching and management with **React Query** (TanStack Query v3), built as part of the `alx-fe-reactjs` curriculum.

---

## 📋 Project Overview

This application demonstrates production-level patterns for data fetching, caching, and synchronization using React Query. It fetches posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts) and showcases how React Query handles:

- Intelligent caching to reduce redundant API calls
- Loading and error state management
- Manual refetching and cache invalidation
- Background data synchronization

---

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm 7+

### Installation

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/alx-fe-reactjs.git
cd alx-fe-reactjs/react-query-demo

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## 🏗️ Project Structure

```
react-query-demo/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # React root, no changes needed
    ├── App.jsx               # QueryClientProvider + App shell + CacheInfoView
    ├── App.css               # All application styles
    ├── index.css             # Global resets & CSS variables
    └── components/
        └── PostsComponent.jsx  # Main data-fetching component
```

---

## ⚙️ React Query Setup (Step 1)

**`src/App.jsx`** sets up the global query client and wraps the app:

```jsx
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,          // Data stays "fresh" for 30 seconds
      cacheTime: 300000,         // Cache persists 5 min after component unmounts
      retry: 2,                  // Auto-retry failed requests twice
      refetchOnWindowFocus: true, // Refetch when tab regains focus
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* App content */}
    </QueryClientProvider>
  );
}
```

---

## 🔄 Data Fetching Component (Step 2)

**`src/components/PostsComponent.jsx`** uses the `useQuery` hook:

```jsx
import { useQuery, useQueryClient } from 'react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error(`Network error: ${response.status}`);
  return response.json();
};

function PostsComponent() {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,    // true on first load (no cache)
    isFetching,   // true whenever a request is in-flight (incl. background)
    isError,
    error,
    dataUpdatedAt,
    status,
    refetch,
  } = useQuery('posts', fetchPosts, {
    staleTime: 30000,
    cacheTime: 300000,
    retry: 2,
    refetchOnWindowFocus: true,
    onSuccess: (data) => console.log(`✅ Loaded ${data.length} posts`),
    onError: (err) => console.error('❌ Error:', err.message),
  });

  if (isLoading) return <LoadingUI />;
  if (isError) return <ErrorUI error={error} />;

  return <PostsGrid posts={posts} />;
}
```

### Key `useQuery` Return Values

| Property | Description |
|---|---|
| `data` | The fetched data (undefined while loading) |
| `isLoading` | `true` only on first load with no cached data |
| `isFetching` | `true` whenever any request is in flight |
| `isError` | `true` if the query failed |
| `error` | The Error object if `isError` is true |
| `status` | `'loading' \| 'error' \| 'success'` |
| `dataUpdatedAt` | Timestamp of the last successful update |
| `refetch` | Function to manually trigger a refetch |

---

## 🗄️ Caching & Updating (Step 3)

### Observing Cache Behavior

1. Load the app → Posts are fetched from the network
2. Click **"Cache Info"** in the nav to navigate away (PostsComponent unmounts)
3. Click **"Posts Feed"** to return → Posts load **instantly** from cache

Open **DevTools → Network** to verify: no network request is made on the second visit (within the 30s `staleTime` window).

### Manual Refetch

```jsx
// Option 1: Direct refetch (bypasses staleTime, keeps cache)
const { refetch } = useQuery(/* ... */);
refetch();

// Option 2: Invalidate & refetch (marks cache as stale, triggers refetch)
const queryClient = useQueryClient();
queryClient.invalidateQueries('posts');
```

Both buttons are available in the **Toolbar** of the Posts view.

### Cache Lifecycle

```
Data fetched → Fresh (0–30s)
             → Stale (30s+) [shown immediately, refetch in background]
             → Garbage collected (5min after unmount)
```

---

## 🧪 Testing & Evaluation (Step 4)

### Manual Testing Steps

1. **Initial Load**: Open the app. Watch DevTools Network for one `GET /posts` request.
2. **Cache Hit**: Navigate to Cache Info → return to Posts. Confirm no new network request.
3. **Stale Refetch**: Wait 30+ seconds. Return to Posts. Observe data shown instantly + background refetch in Network tab.
4. **Manual Refetch**: Click **⟳ Refetch** → see `isFetching` indicator animate + new network request.
5. **Cache Invalidation**: Click **🗑 Invalidate Cache** → same as refetch but marks data stale first.
6. **Error Handling**: Disable network in DevTools → click Refetch → see error state with retry button.
7. **Search & Filter**: Type in the search box → posts filter client-side with no API call.
8. **Window Focus**: Switch tabs and return → background refetch triggers (per `refetchOnWindowFocus: true`).

### React Developer Tools

Install the [React DevTools](https://react.dev/learn/react-developer-tools) browser extension. Use the **Components** tab to inspect the `PostsComponent` state, and look for the React Query devtools (available in development mode with `ReactQueryDevtools` if added).

---

## 🎨 Features

- **Search/Filter**: Real-time client-side filtering across title and body
- **Pagination**: 10 posts per page with smart page number display
- **Post Modal**: Click any card to see full details (served from cache, no extra request)
- **Status Bar**: Live status badges showing query state + last updated timestamp
- **Loading State**: Animated triple-ring spinner with progress bar
- **Error State**: Error message display with retry and cache-clear actions
- **Responsive**: Grid layout adapts from 1–4 columns

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.2.0 | UI framework |
| `react-dom` | ^18.2.0 | DOM rendering |
| `react-query` | ^3.39.3 | Data fetching & caching |
| `vite` | ^4.4.5 | Build tool & dev server |

---

## 📁 Repository

**GitHub**: `alx-fe-reactjs`  
**Directory**: `react-query-demo`
