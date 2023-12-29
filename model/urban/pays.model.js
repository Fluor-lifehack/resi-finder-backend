const mongoose = require("mongoose");

const paysSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    unique: true,
  },
  regions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
    },
  ],
});

module.exports = mongoose.model("Pays", paysSchema);
