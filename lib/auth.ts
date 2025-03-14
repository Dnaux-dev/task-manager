import jwt from "jsonwebtoken";
import { connectToDatabase } from "./db";
import { User } from "../models/user";

export async function getUserFromToken(request: Request) {
  try {

    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      console.log(" No Authorization header found.");
      return null;
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.log("Authorization header does not start with 'Bearer'. Received:", authHeader);
      return null;
    }


    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log(" Token not found after 'Bearer'.");
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret") as { userId: string };
    if (!decoded || !decoded.userId) {
      console.log(" Token verification failed or userId missing in token.");
      return null;
    }
    console.log("Token successfully decoded:", decoded);

    await connectToDatabase();

    const user = await User.findById(decoded.userId).select("-password"); // Exclude password

    if (!user) {
      console.log(" No user found with this ID:", decoded.userId);
      return null;
    }

    console.log(" Authenticated User:", user);
    return user;
  } catch (error) {
    console.error("Authentication Error:", error);
    return null;
  }
}
