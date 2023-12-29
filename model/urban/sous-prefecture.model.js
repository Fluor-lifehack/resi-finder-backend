const mongoose = require("mongoose");

const sousPrefectureSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  departement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Departement",
  },
  villes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ville",
    },
  ],
});

module.exports = mongoose.model("SousPrefecture", sousPrefectureSchema);
