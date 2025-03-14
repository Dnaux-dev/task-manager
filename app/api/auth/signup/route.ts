import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "../../../../lib/db"
import { User } from "../../../../models/user"
import { corsHeaders } from "../../../../lib/cors"

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    // Apply CORS headers
    const response = NextResponse.next()
    Object.entries(corsHeaders).forEach(([key, value]) => {
      response.headers.set(key, value)
    })

    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400, headers: corsHeaders })
    }

    // Connect to database
    await connectToDatabase()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409, headers: corsHeaders },
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    // Return success response (without password)
    return NextResponse.json(
      {
        status: "success",
        message: "User created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201, headers: corsHeaders },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}

