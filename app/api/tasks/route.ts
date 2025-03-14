import { NextResponse } from "next/server"
import { connectToDatabase } from "../../../lib/db"
import { Task } from "../../../models/task"
import { getUserFromToken } from "../../../lib/auth"
import { corsHeaders } from "../../../lib/cors"

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET all tasks for the authenticated user
export async function GET(request: Request) {
  try {
    // ✅ Connect to database BEFORE querying Task model
    await connectToDatabase();

    // Authenticate user from token in Authorization header
    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    // Fetch user tasks
    const tasks = await Task.find({ userId: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(tasks, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}

// CREATE a new task
export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const user = await getUserFromToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders });
    }

    // Parse request body
    const { title, description, dueDate, priority, status } = await request.json();

    if (!title || !dueDate) {
      return NextResponse.json({ message: "Title and due date are required" }, { status: 400, headers: corsHeaders });
    }

    // ✅ Convert dueDate to a valid Date object
    const formattedDueDate = new Date(dueDate);
    if (isNaN(formattedDueDate.getTime())) {
      return NextResponse.json({ message: "Invalid date format. Use YYYY-MM-DD" }, { status: 400, headers: corsHeaders });
    }

    // Create new task
    const newTask = new Task({
      title,
      description,
      dueDate: formattedDueDate, // Save as Date object
      priority: priority || "Medium",
      status: status || "Pending",
      userId: user._id,
    });

    await newTask.save();
    return NextResponse.json(newTask, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders });
  }
}