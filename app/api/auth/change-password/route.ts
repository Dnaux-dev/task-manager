import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "../../../../lib/db"
import { User } from "../../../../models/user"
import { getUserFromToken } from "../../../../lib/auth"
import { corsHeaders } from "../../../../lib/cors"

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  try {
    // Authenticate user from token
    const user = await getUserFromToken(request)
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: corsHeaders })
    }

    // Parse request body
    const { currentPassword, newPassword } = await request.json()

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Current password and new password are required" },
        { status: 400, headers: corsHeaders },
      )
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return NextResponse.json(
        { message: "New password must be at least 6 characters long" },
        { status: 400, headers: corsHeaders },
      )
    }

    // Connect to database
    await connectToDatabase()

    // Get user with password
    const userWithPassword = await User.findById(user._id)
    if (!userWithPassword) {
      return NextResponse.json({ message: "User not found" }, { status: 404, headers: corsHeaders })
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, userWithPassword.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 401, headers: corsHeaders })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update user's password
    await User.findByIdAndUpdate(user._id, { password: hashedPassword })

    return NextResponse.json({ message: "Password updated successfully" }, { headers: corsHeaders })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}

