import connectDB from '@/lib/db';
import Player from "@/models/player";
import { auth } from '@clerk/nextjs/server'

export async function GET(req, context) {
  const { params } = await context;
  const { username } = await params;
  await auth.protect()

  try {
    await connectDB();
    const player = await Player.findOne({ username });

    if (!player) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ highScore: player.highScore || 0 }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching high score:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching high score" }),
      { status: 500 }
    );
  }
}
