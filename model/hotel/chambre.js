const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomNumber: { type: String, required: true },
  type: { type: String, enum: ["Single", "Double", "Suite"], required: true },
  pricePerNight: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  type: String, // "ventilé" ou "climatisé"
  pricing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pricing",
  },
  // Autres détails comme les équipements de la chambre, capacité, etc.
});

module.exports = mongoose.model("Room", roomSchema);
