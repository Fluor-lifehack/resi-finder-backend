const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  pays: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pays",
  },
  departements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departement",
    },
  ],
});

module.exports = mongoose.model("Region", regionSchema);
