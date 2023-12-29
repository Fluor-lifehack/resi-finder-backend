const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
  // Autres détails comme les préférences spéciales, commentaires, etc.
});

module.exports = mongoose.model("Reservation", reservationSchema);
