import { NextResponse } from "next/server"
import { corsHeaders } from "../../lib/cors"

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET() {
  return NextResponse.json(
    {
      name: "TaskFlow API",
      version: "1.0.0",
      description: "A RESTful API for task management",
      documentation: "See README.md for API documentation",
      endpoints: {
        auth: [
          { method: "POST", path: "/api/auth/signup", description: "Register a new user" },
          { method: "POST", path: "/api/auth/login", description: "Login a user" },
          { method: "POST", path: "/api/auth/logout", description: "Logout a user" },
          { method: "POST", path: "/api/auth/change-password", description: "Change user's Password" },
        ],
        tasks: [
          { method: "GET", path: "/api/tasks", description: "Get all tasks" },
          { method: "POST", path: "/api/tasks", description: "Create a new task" },
          { method: "GET", path: "/api/tasks/:id", description: "Get a task by ID" },
          { method: "PUT", path: "/api/tasks/:id", description: "Update a task" },
          { method: "DELETE", path: "/api/tasks/:id", description: "Delete a task" },
        ],
      },
    },
    { headers: corsHeaders },
  )
}

