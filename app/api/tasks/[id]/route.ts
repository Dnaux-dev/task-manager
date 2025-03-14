import { NextResponse } from "next/server"
import { getUserFromToken } from "../../../../lib/auth"
import { corsHeaders } from "../../../../lib/cors"
import { connectToDatabase } from "../../../../lib/db"
import { Task } from "../../../../models/task"

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

// GET a single task by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Authenticate user from token in Authorization header
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders })
    }

    const taskId = params.id

    // Connect to database
    await connectToDatabase()
    

    // Find task by ID and user ID
    const task = await Task.findOne({ _id: taskId, userId: user._id })

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404, headers: corsHeaders })
    }

    return NextResponse.json(task, { headers: corsHeaders })
  } catch (error) {
    console.error("Error fetching task:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}

// UPDATE a task by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Authenticate user from token in Authorization header
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders })
    }

    const taskId = params.id
    const updates = await request.json()

    // Connect to database
    await connectToDatabase()
    
    // Get the Task model

    // Find task by ID and user ID
    const task = await Task.findOne({ _id: taskId, userId: user._id })

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404, headers: corsHeaders })
    }

    // Format date if provided
    if (updates.dueDate) {
      try {
        // Check if date is in DD/MM/YYYY format
        if (updates.dueDate.includes('/')) {
          const [day, month, year] = updates.dueDate.split('/');
          updates.dueDate = new Date(`${year}-${month}-${day}`);
        } else {
          // Assume ISO format or other valid date format
          updates.dueDate = new Date(updates.dueDate);
        }
        
        // Check if date is valid
        if (isNaN(updates.dueDate.getTime())) {
          throw new Error('Invalid date');
        }
      } catch (error) {
        return NextResponse.json(
          { message: "Invalid date format. Please use YYYY-MM-DD format (e.g., 2025-03-13)" },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Normalize status value if provided
    if (updates.status) {
      updates.status = updates.status.charAt(0).toUpperCase() + updates.status.slice(1).toLowerCase();
      
      // Validate status
      if (updates.status !== "Pending" && updates.status !== "Completed") {
        return NextResponse.json(
          { message: "Status must be either 'Pending' or 'Completed'" },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Normalize priority value if provided
    if (updates.priority) {
      updates.priority = updates.priority.charAt(0).toUpperCase() + updates.priority.slice(1).toLowerCase();
      
      // Validate priority
      if (updates.priority !== "Low" && updates.priority !== "Medium" && updates.priority !== "High") {
        return NextResponse.json(
          { message: "Priority must be either 'Low', 'Medium', or 'High'" },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Update task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { ...updates, userId: user._id },
      { new: true, runValidators: true },
    )

    return NextResponse.json(updatedTask, { headers: corsHeaders })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ 
      message: "Internal server error", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500, headers: corsHeaders })
  }
}

// DELETE a task by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Authenticate user from token in Authorization header
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders })
    }

    const taskId = params.id

    // Connect to database
    await connectToDatabase()
    
    // Find task by ID and user ID
    const task = await Task.findOne({ _id: taskId, userId: user._id })

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404, headers: corsHeaders })
    }

    // Delete task
    await Task.findByIdAndDelete(taskId)

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200, headers: corsHeaders })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}