// models/agence.js

const mongoose = require("mongoose");

const agenceSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  slogan: {
    type: String,
    required: false,
  },

  nomAgence: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  imageUrl: String,
  situationGeographique: String,
  contactFix: String,
  contactWhatsapp: String,
  lienSiteWeb: String,
  liens: {
    facebook: String,
    twitter: String,
    tiktok: String,
    linkedin: String,
  },
  aPropos: String,
  role: {
    type: String,
    default: "agence",
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Agence", agenceSchema);
