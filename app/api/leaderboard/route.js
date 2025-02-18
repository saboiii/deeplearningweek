import connectDB from '@/lib/db';
import Player from "@/models/player";
import { auth } from '@clerk/nextjs/server'

export async function GET(request) {
  await auth.protect()
  try {
    await connectDB();
    const leaderboard = await Player.find()
      .select("username highScore -_id")
      .sort({ highScore: -1 })
      .limit(10)
      .lean();

    return new Response(JSON.stringify(leaderboard), { status: 200 });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching leaderboard" }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const { userId } = auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  try {
    const data = await request.json();
    const { username, highScore } = data;

    if (!username || highScore == null) {
      return new Response(
        JSON.stringify({ message: "Missing username or highScore" }),
        { status: 400 }
      );
    }

    await connectDB();

    const player = await Player.findOneAndUpdate(
      { username },
      { $max: { highScore: highScore } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const leaderboard = await Player.find()
      .select("username highScore -_id")
      .sort({ highScore: -1 })
      .limit(10)
      .lean();

    return new Response(JSON.stringify(leaderboard), { status: 200 });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    return new Response(
      JSON.stringify({ message: "Error updating leaderboard" }),
      { status: 500 }
    );
  }
}
