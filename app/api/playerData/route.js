import connectDB from '@/lib/db';
import Data from "@/models/data"
import { auth } from '@clerk/nextjs/server';

export async function POST(request) {
  const { userId } = auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  try {
    const data = await request.json();
    const { playerData, username } = data;

    if (!playerData || !username) {
      return new Response(
        JSON.stringify({ error: "Missing playerData or username" }),
        { status: 400 }
      );
    }

    await connectDB();

    const formattedData = Object.values(playerData).map((entry) => ({
      username,
      projectileCoordinates: {
        x: parseFloat(entry.projectileCoords.x),
        y: parseFloat(entry.projectileCoords.y),
      },
      playerCoordinates: {
        x: parseFloat(entry.playerCoords.x),
        y: parseFloat(entry.playerCoords.y),
      },
      minDistance: entry.minDistance,
    }));

    await Data.insertMany(formattedData);

    return new Response(
      JSON.stringify({ message: "Player data saved successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving player data:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save player data" }),
      { status: 500 }
    );
  }
}
