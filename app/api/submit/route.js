import Participant from '@/models/participant';
import connectDB from '@/lib/db';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    if (data.team && data.team.teamName && data.team.members && Array.isArray(data.team.members)) {
      const membersArray = Object.values(data.team.members);

      const teamParticipant = new Participant({
        teamName: data.team.teamName,
        members: membersArray,
      });

      const savedTeam = await teamParticipant.save();
      return new Response(JSON.stringify(savedTeam), { status: 201 });
    } 

    else if (data.solo) {
      const soloParticipant = new Participant({
        solo: data.solo,
      });

      const savedSolo = await soloParticipant.save();
      return new Response(JSON.stringify(savedSolo), { status: 201 });
    } 
    else {
      return new Response(
        JSON.stringify({ error: 'Invalid data structure.' }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error saving participant:', error.message);
    return new Response(
      JSON.stringify({ error: 'Error saving participant.', details: error.message }),
      { status: 500 }
    );
  }
}
