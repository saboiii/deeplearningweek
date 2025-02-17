import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  username: { type: String, ref: "User", required: true },
  projectileCoordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  playerCoordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
  },
  minDistance: { type: Number, required: true },
});

const Data = mongoose.models.Data || mongoose.model('Data', DataSchema);
module.exports = Data;