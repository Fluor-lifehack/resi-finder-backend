const mongoose = require("mongoose");

const communeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  ville: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ville",
  },
  quartiers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quartier",
    },
  ],
});

module.exports = mongoose.model("Commune", communeSchema);
