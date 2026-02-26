// src/App.tsx
import { useUsersList } from './hooks/api/useDashboardApi'; // adjust path if needed

function App() {
  const {
    data: users = [],
    isPending,
    isError,
    error,
    isFetching,
  } = useUsersList({
    // optional: you can override defaults here if needed
    staleTime: 1000 * 60 * 3, // 3 minutes
  });

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl font-medium text-gray-700">Loading users...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-red-600">
          Error loading users: {error?.message || 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            React + TypeScript + Vite
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Welcome to your new dashboard project!
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Users ({users.length})
          </h2>
          {isFetching && (
            <span className="text-sm text-gray-500">Refreshing...</span>
          )}
        </div>

        {users.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No users found
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users.map((user) => (
              <div
                key={user.id}
                className={`rounded-lg border shadow-sm p-6 transition-all hover:shadow-md ${
                  user.status === 'active'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-300 opacity-85'
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {user.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600 truncate">
                  {user.email}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium text-xs ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {user.status}
                  </span>

                  <span className="text-gray-500">
                    Joined:{' '}
                    {new Date(user.joinDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;