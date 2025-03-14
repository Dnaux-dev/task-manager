export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
        <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6">TaskFlow API</h1>
          <p className="text-gray-600 mb-6 text-center">
            A RESTful API for task management built with Next.js and MongoDB
          </p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Authentication Endpoints</h2>
            <ul className="space-y-2 pl-5 list-disc">
              <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/signup</code> - Register a new user</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/login</code> - Login a user</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/logout</code> - Logout a user</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/auth/change-password</code> - Change user's Password</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Task Endpoints</h2>
            <ul className="space-y-2 pl-5 list-disc">
              <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/tasks</code> - Get all tasks</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">POST /api/tasks</code> - Create a new task</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">GET /api/tasks/:id</code> - Get a task by ID</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">PUT /api/tasks/:id</code> - Update a task</li>
              <li><code className="bg-gray-100 px-2 py-1 rounded">DELETE /api/tasks/:id</code> - Delete a task</li>
            </ul>
          </div>
          
          <div className="text-center text-gray-500 text-sm">
            See README.md for complete API documentation
          </div>
        </div>
      </div>
    )
  }
  