import Participant from '@/models/participant';
import connectDB from '@/lib/db';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  const version = process.env.NEXT_PUBLIC_VERSION;
  if (version !== "1.0.0") {
    return new Response(
      JSON.stringify({ error: 'Registrations closed.' }),
      { status: 400 }
    );
  } else {
    try {
      await connectDB();
      const data = await request.json();

      const validateMember = (member) => {
        const errors = [];
        // Only require 'school' for NTU students
        const requiredFields = ['name', 'uni', 'email', 'gender', 'tele', 'course', 'degreeType', 'year', 'nationality', 'diet', 'size'];
        for (const field of requiredFields) {
          if (!member[field] || (typeof member[field] === 'string' && member[field].trim() === '')) {
            errors.push(`${field} is required.`);
          }
        }
        if (member.uni === 'Nanyang Technological University') {
          if (!member.matricNo || member.matricNo.trim() === '') {
            errors.push('Matriculation number is required for NTU students.');
          }
          if (!member.ntuEmail || member.ntuEmail.trim() === '') {
            errors.push('NTU email is required for NTU students.');
          }
          if (!member.school || member.school.trim() === '') {
            errors.push('School is required for NTU students.');
          }
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (member.email && !emailRegex.test(member.email)) {
          errors.push('Invalid email format.');
        }
        if (member.ntuEmail && !emailRegex.test(member.ntuEmail)) {
          errors.push('Invalid NTU email format.');
        }
        const teleRegex = /^[a-zA-Z0-9_]{5,}$/;
        if (member.tele && !teleRegex.test(member.tele)) {
          errors.push('Invalid Telegram handle.');
        }
        return errors;
      };

      const sendConfirmationEmail = async (email, toName) => {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
          },
        });

        const htmlPath = path.join(process.cwd(), 'app', 'api', 'submit', 'dlw-confirmation-2026.html');
        let htmlContent = '';
        try {
          htmlContent = fs.readFileSync(htmlPath, 'utf8');
        } catch (err) {
          console.error('Error reading HTML template:', err);
          return;
        }

        htmlContent = htmlContent.replace(/\$\{toName\}/g, toName);

        const imageUrl = 'https://www.dlweek.com/images/banner-conf-email.png';
        htmlContent = htmlContent.replace(/<img([^>]+)src="data:image\/png;base64,[^"]+"/g, `<img$1src="${imageUrl}"`);

        const mailOptions = {
          from: 'deeplearningweek@gmail.com',
          to: email,
          subject: 'you’re in. dlw 2026 registration confirmed',
          html: htmlContent,
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
          const errors = validateMember(member);
          if (errors.length > 0) {
            return new Response(
              JSON.stringify({ error: `Validation failed: ${errors.join(' ')}` }),
              { status: 400 }
            );
          }
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


        // Send all confirmation emails in parallel to avoid timeout
        const emailPromises = [];
        for (const member of membersArray) {
          emailPromises.push(sendConfirmationEmail(member.email, member.name));
          if (member.ntuEmail && member.ntuEmail !== member.email) {
            emailPromises.push(sendConfirmationEmail(member.ntuEmail, member.name));
          }
        }
        Promise.all(emailPromises).then(() => {
          console.log('All confirmation emails sent.');
        }).catch((err) => {
          console.error('Error sending some confirmation emails:', err);
        });

        return new Response(JSON.stringify(savedTeam), { status: 201 });

      } else if (data.solo) {
        const errors = validateMember(data.solo);
        if (errors.length > 0) {
          return new Response(
            JSON.stringify({ error: `Validation failed: ${errors.join(' ')}` }),
            { status: 400 }
          );
        }
        const soloEmail = data.solo.email;

        if (await checkIfRegistered(soloEmail)) {
          return new Response(
            JSON.stringify({ error: `${soloEmail} has already registered. Please contact @nitinnn17 to re-register.` }),
            { status: 400 }
          );
        }

        const soloParticipant = new Participant({
          solo: data.solo,
        });

        const savedSolo = await soloParticipant.save();


        // Send solo confirmation emails in parallel to avoid timeout
        const soloEmailPromises = [sendConfirmationEmail(soloEmail, data.solo.name)];
        if (data.solo.ntuEmail && data.solo.ntuEmail !== soloEmail) {
          soloEmailPromises.push(sendConfirmationEmail(data.solo.ntuEmail, data.solo.name));
        }
        Promise.all(soloEmailPromises).then(() => {
          console.log('Solo confirmation emails sent.');
        }).catch((err) => {
          console.error('Error sending solo confirmation emails:', err);
        });

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
}
