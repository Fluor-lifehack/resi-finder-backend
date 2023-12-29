const mongoose = require("mongoose");

const villeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  sousPrefecture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SousPrefecture",
  },
  communes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commune",
    },
  ],
  quartiers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quartier",
    },
  ],
  description: String,
  image: String,
});

module.exports = mongoose.model("Ville", villeSchema);
