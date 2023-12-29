const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // par exemple: 'Credit Card', 'PayPal'
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  // Autres détails comme la date et l'heure du paiement, références de transaction, etc.
});

module.exports = mongoose.model("Payment", paymentSchema);
