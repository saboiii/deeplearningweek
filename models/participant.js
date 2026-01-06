import mongoose from "mongoose";

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
  school: { type: String },
  degreeType: { type: String },
  year: { type: String },
  nationality: { type: String },
  diet: { type: String },
  size: { type: String, required: true },
  night: { type: Boolean, required: true },
});

const teamSchema = new mongoose.Schema({
  teamName: { type: String },
  members: {
    type: [memberSchema],
    validate: {
      validator: function (members) {
        return this.teamName ? members.length > 0 : true;
      },
      message: 'Teams must have at least one member.',
    },
  },
});

const participantSchema = new mongoose.Schema({
  teamName: { type: String, default: null },
  members: { type: [memberSchema], default: undefined },
  solo: { type: memberSchema, default: undefined },
});

participantSchema.pre('validate', function (next) {
  if (!this.solo && !this.members?.length) {
    return next(new Error('Each participant must be either a solo or part of a team.'));
  }
  if (this.solo && this.members?.length) {
    return next(new Error('A participant cannot be both solo and part of a team.'));
  }
  next();
});

const Participant = mongoose.models.Participant || mongoose.model('Participant', participantSchema);

export default Participant;
