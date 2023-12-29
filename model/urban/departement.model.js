const mongoose = require("mongoose");

const departementSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  },
  sousPrefectures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SousPrefecture",
    },
  ],
});

module.exports = mongoose.model("Departement", departementSchema);
