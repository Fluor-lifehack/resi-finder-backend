const mongoose = require("mongoose");

const quartierSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  ville: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ville",
  },

  commune: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commune",
  },
});

module.exports = mongoose.model("Quartier", quartierSchema);
