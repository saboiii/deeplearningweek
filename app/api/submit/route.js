import Participant from "@/models/participant";
import connectDB from "@/lib/db";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export async function POST(request) {
  const version = process.env.NEXT_PUBLIC_VERSION;
  if (version !== "1.0.0") {
    return new Response(JSON.stringify({ error: "Registrations closed." }), {
      status: 400,
    });
  } else {
    try {
      console.log("submit:validate");
      await connectDB();
      const data = await request.json();

      const validateMember = (member) => {
        const errors = [];
        const participantType =
          member.participantType || (member.uni ? "uni" : "");
        const isUni = participantType === "uni";
        const isPreUni = participantType === "preuni";

        const calculateAge = (dob) => {
          if (!dob) return null;
          const birthDate = new Date(dob);
          if (Number.isNaN(birthDate.getTime())) return null;

          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age -= 1;
          }
          return age;
        };

        const age = calculateAge(member.dateOfBirth);
        const isUnder18 = age !== null && age < 18;

        const requiredFields = [
          "name",
          "participantType",
          "email",
          "gender",
          "tele",
          "course",
          "nationality",
          "diet",
          "size",
        ];
        for (const field of requiredFields) {
          if (
            !member[field] ||
            (typeof member[field] === "string" && member[field].trim() === "")
          ) {
            errors.push(`${field} is required.`);
          }
        }

        if (isUni) {
          if (!member.uni || member.uni.trim() === "") {
            errors.push("University is required for university students.");
          }
          if (!member.degreeType || member.degreeType.trim() === "") {
            errors.push("Degree type is required for university students.");
          }
          if (!member.year || member.year.trim() === "") {
            errors.push("Year is required for university students.");
          }
        }

        if (isPreUni) {
          if (!member.institutionName || member.institutionName.trim() === "") {
            errors.push(
              "Institution name is required for pre-university students.",
            );
          }
          if (!member.preUniCategory || member.preUniCategory.trim() === "") {
            errors.push(
              "Pre-uni category is required for pre-university students.",
            );
          }
          if (
            !member.expectedGradYear ||
            member.expectedGradYear.toString().trim() === ""
          ) {
            errors.push(
              "Expected graduation year is required for pre-university students.",
            );
          }
          if (!member.dateOfBirth || member.dateOfBirth.trim() === "") {
            errors.push(
              "Date of birth is required for pre-university students.",
            );
          }
          if (!member.indemnityMsFormConfirmed) {
            errors.push(
              "Signed indemnity form must be uploaded via the Microsoft Form for pre-university students.",
            );
          }
        }

        if (isUnder18) {
          if (!member.guardianName || member.guardianName.trim() === "") {
            errors.push(
              "Parent/Guardian name is required for participants under 18.",
            );
          }
          if (!member.guardianEmail || member.guardianEmail.trim() === "") {
            errors.push(
              "Parent/Guardian email is required for participants under 18.",
            );
          }
          if (!member.guardianPhone || member.guardianPhone.trim() === "") {
            errors.push(
              "Parent/Guardian phone is required for participants under 18.",
            );
          }
          if (!member.guardianConsent) {
            errors.push(
              "Parent/Guardian consent is required for participants under 18.",
            );
          }
        }

        if (isUni && member.uni === "Nanyang Technological University") {
          if (!member.matricNo || member.matricNo.trim() === "") {
            errors.push("Matriculation number is required for NTU students.");
          }
          if (!member.ntuEmail || member.ntuEmail.trim() === "") {
            errors.push("NTU email is required for NTU students.");
          }
          if (!member.school || member.school.trim() === "") {
            errors.push("School is required for NTU students.");
          }
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (member.email && !emailRegex.test(member.email)) {
          errors.push("Invalid email format.");
        }
        if (member.ntuEmail && !emailRegex.test(member.ntuEmail)) {
          errors.push("Invalid NTU email format.");
        }
        if (member.guardianEmail && !emailRegex.test(member.guardianEmail)) {
          errors.push("Invalid parent/guardian email format.");
        }
        const teleRegex = /^[a-zA-Z0-9_]{5,}$/;
        if (member.tele && !teleRegex.test(member.tele)) {
          errors.push("Invalid Telegram handle.");
        }
        const guardianPhoneRegex = /^[+0-9()\-\s]{7,20}$/;
        if (
          member.guardianPhone &&
          !guardianPhoneRegex.test(member.guardianPhone)
        ) {
          errors.push("Invalid parent/guardian phone format.");
        }

        if (isUni && !member.institutionName && member.uni) {
          member.institutionName = member.uni;
        }
        return errors;
      };

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      const htmlPath = path.join(
        process.cwd(),
        "app",
        "api",
        "submit",
        "dlw-confirmation-2026.html",
      );
      let baseHtmlContent = "";
      try {
        baseHtmlContent = fs.readFileSync(htmlPath, "utf8");
      } catch (err) {
        console.error("Error reading HTML template:", err);
      }

      if (baseHtmlContent) {
        const imageUrl = "https://www.dlweek.com/images/banner-conf-email.png";
        baseHtmlContent = baseHtmlContent.replace(
          /<img([^>]+)src="data:image\/png;base64,[^"]+"/g,
          `<img$1src="${imageUrl}"`,
        );
      }

      const sendConfirmationEmail = async (email, toName) => {
        if (!baseHtmlContent) {
          return;
        }

        const htmlContent = baseHtmlContent.replace(/\$\{toName\}/g, toName);
        const mailOptions = {
          from: "deeplearningweek@gmail.com",
          to: email,
          subject: "you’re in. dlw 2026 registration confirmed",
          html: htmlContent,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`Confirmation email sent to ${email}`);
        } catch (error) {
          console.error("Error sending confirmation email:", error);
        }
      };

      const checkIfRegistered = async (email) => {
        const existingSolo = await Participant.findOne({ "solo.email": email });
        const existingTeam = await Participant.findOne({
          "members.email": email,
        });
        return existingSolo || existingTeam;
      };

      if (
        data.team &&
        data.team.teamName &&
        data.team.members &&
        Array.isArray(data.team.members)
      ) {
        const membersArray = Object.values(data.team.members);
        for (const member of membersArray) {
          const errors = validateMember(member);
          if (errors.length > 0) {
            return new Response(
              JSON.stringify({
                error: `Validation failed: ${errors.join(" ")}`,
              }),
              { status: 400 },
            );
          }
          if (await checkIfRegistered(member.email)) {
            return new Response(
              JSON.stringify({
                error: `Registration failed: ${member.email} has already registered.`,
              }),
              { status: 400 },
            );
          }
        }

        console.log("submit:save");
        const teamParticipant = new Participant({
          teamName: data.team.teamName,
          members: membersArray,
        });

        const savedTeam = await teamParticipant.save();

        console.log("submit:email");
        // Send all confirmation emails in parallel to avoid timeout
        const emailPromises = [];
        for (const member of membersArray) {
          emailPromises.push(sendConfirmationEmail(member.email, member.name));
          if (
            member.participantType === "uni" &&
            member.ntuEmail &&
            member.ntuEmail !== member.email
          ) {
            emailPromises.push(
              sendConfirmationEmail(member.ntuEmail, member.name),
            );
          }
        }
        try {
          await Promise.all(emailPromises);
          console.log("All confirmation emails sent.");
        } catch (err) {
          console.error("Error sending some confirmation emails:", err);
        }

        console.log("submit:respond");
        return new Response(
          JSON.stringify({ ok: true, id: savedTeam._id?.toString() || null }),
          { status: 201 },
        );
      } else if (data.solo) {
        const errors = validateMember(data.solo);
        if (errors.length > 0) {
          return new Response(
            JSON.stringify({ error: `Validation failed: ${errors.join(" ")}` }),
            { status: 400 },
          );
        }
        const soloEmail = data.solo.email;

        if (await checkIfRegistered(soloEmail)) {
          return new Response(
            JSON.stringify({
              error: `${soloEmail} has already registered. Please contact @sabb_exe to re-register.`,
            }),
            { status: 400 },
          );
        }

        console.log("submit:save");
        const soloParticipant = new Participant({
          solo: data.solo,
        });

        const savedSolo = await soloParticipant.save();

        console.log("submit:email");
        const soloEmailPromises = [
          sendConfirmationEmail(soloEmail, data.solo.name),
        ];
        if (
          data.solo.participantType === "uni" &&
          data.solo.ntuEmail &&
          data.solo.ntuEmail !== soloEmail
        ) {
          soloEmailPromises.push(
            sendConfirmationEmail(data.solo.ntuEmail, data.solo.name),
          );
        }
        try {
          await Promise.all(soloEmailPromises);
          console.log("Solo confirmation emails sent.");
        } catch (err) {
          console.error("Error sending solo confirmation emails:", err);
        }

        console.log("submit:respond");
        return new Response(
          JSON.stringify({ ok: true, id: savedSolo._id?.toString() || null }),
          { status: 201 },
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid data structure." }),
          { status: 400 },
        );
      }
    } catch (error) {
      console.error("Error saving participant:", error.message);
      return new Response(
        JSON.stringify({
          error: "Error saving participant.",
          details: error.message,
        }),
        { status: 500 },
      );
    }
  }
}
