const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
    required: true,
  }, // Relation avec une agence.
  availability: {
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    reason: { type: String }, // Raison de l'indisponibilité.
    unavailableUntil: { type: Date }, // Date/heure jusqu'à laquelle l'agent est indisponible.
  },
  // ... autres champs selon vos besoins.
});

module.exports = mongoose.model("Agent", agentSchema);
