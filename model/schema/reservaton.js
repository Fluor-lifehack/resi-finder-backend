const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  datesReservation: {
    dateDebut: {
      type: Date,
      required: true,
    },
    dateFin: {
      type: Date,
      required: true,
    },
  },
  tarification: {
    type: {
      type: String,
      enum: ["parNuit", "locationMensuel"],
      required: true,
    },
    montantParNuit: {
      type: Number,
    },
    montantLocationMensuel: {
      type: Number,
    },
    montantTotalReservation: {
      type: Number,
      required: true,
    },
  },
  paiement: {
    montantAvance: {
      type: Number,
      required: true,
    },
    montantTotal: {
      type: Number,
      required: true,
    },
    statut: {
      type: String,
      enum: ["en attente", "payé", "annulé"],
      default: "en attente",
    },
  },
  agentAssigné: {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    disponibilité: {
      type: Boolean,
      default: true,
    },
    dateDisponibilité: {
      type: Date,
    },
  },
  statutReservation: {
    type: String,
    enum: ["en attente", "confirmé", "annulé"],
    default: "en attente",
  },
  notes: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("reservation", reservationSchema);

// {
//     "clientId": "6123456789abcdef12345678",  // Identifiant du client
//     "propertyId": "7123456789abcdef23456789",  // Identifiant de la propriété
//     "datesReservation": {
//       "dateDebut": "2024-01-01",
//       "dateFin": "2024-01-10"
//     },
//     "tarification": {
//       "type": "parNuit",
//       "montantParNuit": 10000,
//       "montantLocationMensuel": 250000,
//       "montantTotalReservation": 90000
//     },
//     "paiement": {
//       "montantAvance": 5000,
//       "montantTotal": 90000,
//       "statut": "en attente"
//     },
//     "agentAssigné": {
//       "agentId": "8123456789abcdef34567890",
//       "disponibilité": true,
//       "dateDisponibilité": "2024-01-05"
//     },
//     "statutReservation": "en attente",
//     "notes": "Le client souhaite une visite avant de confirmer la réservation."
//   }
