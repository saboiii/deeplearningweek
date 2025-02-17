import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  highScore: { type: Number, default: 0 },
});

const Player = mongoose.models.Player || mongoose.model('Player', PlayerSchema);

module.exports = Player;
