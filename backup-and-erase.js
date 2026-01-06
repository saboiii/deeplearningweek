const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uni: { type: String, required: true },
  matricNo: {
    type: String,
    required: function () {
      return this.uni === 'Nanyang Technological University';
    },
  },
  ntuEmail: {
    type: String,
    required: function () {
      return this.uni === 'Nanyang Technological University';
    },
  },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  tele: { type: String, required: true },
  course: { type: String, required: true },
  diet: { type: String },
  size: { type: String, required: true },
  night: { type: Boolean, required: true },
});

const participantSchema = new mongoose.Schema({
  teamName: { type: String, default: null },
  members: { type: [memberSchema], default: undefined },
  solo: { type: memberSchema, default: undefined },
});

const Participant = mongoose.models.Participant || mongoose.model('Participant', participantSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.toLowerCase());
    });
  });
}

async function main() {
  try {
    await connectDB();

    const answer1 = await askQuestion('Are you sure you want to backup and erase all participant data? (yes/no): ');
    if (answer1 !== 'yes') {
      console.log('Operation cancelled.');
      rl.close();
      return;
    }

    console.log('Fetching participant data...');
    const participants = await Participant.find({});

    console.log(`Found ${participants.length} participants.`);

    const backupDir = path.join(__dirname, 'backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const backupFile = path.join(backupDir, 'participants_backup.json');
    fs.writeFileSync(backupFile, JSON.stringify(participants, null, 2));
    console.log(`Data backed up to ${backupFile}`);

    const answer2 = await askQuestion('Data backed up. Are you sure you want to erase all participant data from the database? (yes/no): ');
    if (answer2 !== 'yes') {
      console.log('Erase operation cancelled. Data remains in database.');
      rl.close();
      return;
    }

    console.log('Erasing data...');
    const result = await Participant.deleteMany({});
    console.log(`Deleted ${result.deletedCount} documents.`);

    console.log('Operation completed.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
    mongoose.connection.close();
  }
}

main();