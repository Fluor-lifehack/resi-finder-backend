const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema({
  time: String, // Exemple: "1h", "2h", "4h", "nuit"
  ventilatedRate: Number, // Tarif pour une chambre ventilée
  airConditionedRate: Number, // Tarif pour une chambre climatisée
  nightRate: Number, // Tarif pour une nuit
});

const Pricing = mongoose.model("Pricing", pricingSchema);
module.exports = Pricing;
