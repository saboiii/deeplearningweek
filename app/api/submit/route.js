import Participant from '@/models/participant';
import connectDB from '@/lib/db';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();

    const sendConfirmationEmail = async (email, toName) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: 'deeplearningweek@gmail.com',
        to: email,
        subject: 'Confirmation of Your Deep Learning Week Participation',
        html: `
          <p>Dear ${toName},</p>
          <p>We are thrilled to welcome you to <b>Deep Learning Week 2025</b>!</p>
          
          <p><b>Here are the event details you need to know:</b></p>
          <ul>
            <li>📅 <b>Opening Ceremony:</b> 28th February</li>
            <li>📍 <b>Venue:</b> LT 1A, NTU</li>
            <li>⏰ <b>Time:</b> 4:30 PM (Registration and Networking)</li>
          </ul>
      
          <p>This year, our sponsors are bringing exclusive workshops and learning opportunities designed to help you sharpen your expertise, no matter your experience level.</p>
      
          <p>No matter your background, this is the perfect time to build a tech portfolio that speaks volumes. Whether you're innovating in <b>Finance, Healthcare, Education, Media, or Sustainability</b>, Deep Learning Week is where we develop groundbreaking solutions to real-world problems.</p>
      
          <p><b>We'll be sharing information about event tracks and prizes soon, so stay tuned!</b></p>
      
          <p><b>Important:</b> Join our official Telegram channel for the latest updates and announcements: <a href="https://t.me/deeplearningweek2025">https://t.me/deeplearningweek2025</a></p>
      
          <p>If you have any questions or need assistance, don't hesitate to reach out. Our team is here to help! You can contact us via Telegram:</p>
          <ul>
            <li>@Abhiram_Kadaba</li>
            <li>@nitinnn17</li>
            <li>@ARJUN022</li>
            <li>@Ninadd07</li>
          </ul>
      
          <p>We can't wait to see you at the event!</p>
      
          <p>Best regards,<br>
          <b>The Deep Learning Week Team</b><br>
          <i>MLDA@EEE</i></p>
        `,
      };


      try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }
    };

    const checkIfRegistered = async (email) => {
      const existingSolo = await Participant.findOne({ 'solo.email': email });
      const existingTeam = await Participant.findOne({ 'members.email': email });
      return existingSolo || existingTeam;
    };

    if (data.team && data.team.teamName && data.team.members && Array.isArray(data.team.members)) {
      const membersArray = Object.values(data.team.members);
      for (const member of membersArray) {
        if (await checkIfRegistered(member.email)) {
          return new Response(
            JSON.stringify({ error: `Registration failed: ${member.email} has already registered.` }),
            { status: 400 }
          );
        }
      }

      const teamParticipant = new Participant({
        teamName: data.team.teamName,
        members: membersArray,
      });

      const savedTeam = await teamParticipant.save();

      for (const member of membersArray) {
        await sendConfirmationEmail(member.email, member.name);
      }

      return new Response(JSON.stringify(savedTeam), { status: 201 });

    } else if (data.solo) {
      const soloEmail = data.solo.email;

      if (await checkIfRegistered(soloEmail)) {
        return new Response(
          JSON.stringify({ error: `Registration failed: ${soloEmail} has already registered.` }),
          { status: 400 }
        );
      }

      const soloParticipant = new Participant({
        solo: data.solo,
      });

      const savedSolo = await soloParticipant.save();

      await sendConfirmationEmail(soloEmail, data.solo.name);

      return new Response(JSON.stringify(savedSolo), { status: 201 });

    } else {
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
