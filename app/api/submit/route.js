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
        text: `Dear ${toName},
      
We are thrilled to welcome you to Deep Learning Week 2025!
      
Here are the event details you need to know:
      
📅 Opening Ceremony: 28th February  
📍 Venue: LT 1A, NTU  
⏰ Time: 4:30 PM (Registration and Networking)
      
This year, our sponsors are bringing exclusive workshops and learning opportunities designed to help you sharpen your expertise, no matter your experience level. 

No matter your background, this is the perfect time to build a tech portfolio that speaks volumes. Whether you're innovating in Finance, Healthcare, Education, Media, or Sustainability, Deep Learning Week is where we develop groundbreaking solutions to real world problems. 
      
We'll be sharing information about event tracks and prizes soon, so stay tuned!
      
Important: Join our official Telegram channel for the latest updates and announcements:  
https://t.me/deeplearningweek2025
      
If you have any questions or need assistance, don't hesitate to reach out. Our team is here to help! You can contact us via Telegram:  
  - @Abhiram_Kadaba  
  - @nitinnn17  
  - @ARJUN022  
  - @Ninadd07
      
We can't wait to see you at the event!
      
Best regards,  
The Deep Learning Week Team  
MLDA@EEE`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }
    };

    if (data.team && data.team.teamName && data.team.members && Array.isArray(data.team.members)) {
      const membersArray = Object.values(data.team.members);

      const teamParticipant = new Participant({
        teamName: data.team.teamName,
        members: membersArray,
      });

      const savedTeam = await teamParticipant.save();

      // Send confirmation email to each member of the team
      for (const member of membersArray) {
        await sendConfirmationEmail(member.email, member.name);
      }

      return new Response(JSON.stringify(savedTeam), { status: 201 });
    } else if (data.solo) {
      const soloParticipant = new Participant({
        solo: data.solo,
      });

      const savedSolo = await soloParticipant.save();

      const soloEmail = data.solo.email;
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
