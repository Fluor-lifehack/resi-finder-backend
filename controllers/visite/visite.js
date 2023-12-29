const express = require("express");
// const router = express.Router();
const Visite = require("../../model/schema/visite");

// Créer une nouvelle Visite.
const add = async (req, res) => {
  try {
    console.log(req.body);
    // Assurez-vous que le paiement est effectué (5000 FCFA dans cet exemple).
    if (req.body.paymentAmount !== 5000) {
      return res
        .status(400)
        .json({ message: "Le paiement doit être de 5000 FCFA" });
    }

    const visite = new Visite(req.body);

    console.log(visite);
    visite.paymentStatus = "confirmed";
    await visite.save();

    res.status(201).json(visite);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création de la visite",
      error: error.message,
    });
  }
};

// Obtenir la liste des Visites.
const index = async (req, res) => {
  try {
    const visites = await Visite.find();
    res.status(200).json(visites);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des Visites",
      error: error.message,
    });
  }
};

// Obtenir les détails d'une Visite spécifique.
const view = async (req, res) => {
  try {
    const visite = await Visite.findById(req.params.id);
    if (!visite) {
      return res.status(404).json({ message: "Visite non trouvée" });
    }
    res.status(200).json(visite);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la Visite",
      error: error.message,
    });
  }
};

const edite = async (req, res) => {
  try {
    // Assurez-vous que le paiement est effectué avant d'assigner un agent.
    const visite = await Visite.findById(req.params.id);
    if (!visite) {
      return res.status(404).json({ message: "Visite non trouvée" });
    }

    if (visite.paymentStatus !== "confirmed") {
      return res.status(400).json({
        message: "La Visite doit être payée pour assigner un agent",
      });
    }

    // Assigner un agent.
    visite.assignedAgent = req.body.assignedAgent;
    await visite.save();

    res.status(200).json(visite);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la Visite",
      error: error.message,
    });
  }
};

// Supprimer une Visite.
const deleteData = async (req, res) => {
  try {
    const visite = await Visite.findByIdAndDelete(req.params.id);
    if (!visite) {
      return res.status(404).json({ message: "Visite non trouvée" });
    }
    res.status(200).json({ message: "Visite supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de la Visite",
      error: error.message,
    });
  }
};

module.exports = {
  index,
  add,
  view,
  edite,
  deleteData,
};
