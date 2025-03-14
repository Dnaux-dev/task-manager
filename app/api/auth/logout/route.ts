import { NextResponse } from "next/server"
import { corsHeaders } from "../../../../lib/cors"

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST() {
  try {
    // For a pure API, we don't need to clear cookies
    // The client will be responsible for removing the token
    return NextResponse.json({ message: "Logged out successfully" }, { headers: corsHeaders })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500, headers: corsHeaders })
  }
}

