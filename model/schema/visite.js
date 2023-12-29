const mongoose = require("mongoose");

const visiteSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  // agencyId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Agency",
  //   required: true,
  // },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  visitDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "in review", "confirmed", "completed", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending",
  },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  paymentAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("visite", visiteSchema);
