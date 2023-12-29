const express = require("express");
// const router = express.Router();

const Commune = require("../../../model/urban/commune.model");

const Ville = require("../../../model/urban/commune.model");

// Méthode pour créer un nouveau pays.
exports.createCommune = async (req, res) => {
  try {
    const newCommune = new Commune(req.body);
    await newCommune.save();

    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: newCommune,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création du Commune",
      details: error.message,
    });
  }
};

// Méthode pour obtenir un Commune par son ID.
exports.getCommuneById = async (req, res) => {
  try {
    const commune = await Commune.findById(req.params.id);
    if (!commune) {
      res.status(404).json("Commune non trouvé");
    }

    res.status(200).json({ success: true, data: commune });
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération du commune : ${error.message}`
    );
  }
};

// Méthode pour mettre à jour un commune par son ID.
exports.updateCommune = async (req, res) => {
  try {
    const commune = await Commune.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!commune) {
      return res.status(404).json({ message: "Commune non trouvée" });
    }
    res
      .status(200)
      .json({ message: "Commune mise à jour avec succès", commune });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du commune",
      details: error.message,
    });
  }
};

// Méthode pour supprimer un commune par son ID.
exports.deleteCommune = async (req, res) => {
  try {
    const commune = await Commune.findByIdAndDelete(req.params.id);
    if (!commune) {
      return res.status(404).json({ message: "Commune non trouvée" });
    }
    res.status(200).json({ message: "Commune supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du commune",
      details: error.message,
    });
  }
};

// Méthode pour récupérer tous les commune.
exports.getAllCommunes = async (req, res) => {
  try {
    const CommuneList = await Commune.find();

    res.status(200).json({
      success: true,
      message: "récupération succès",
      nbr: CommuneList.length,
      data: CommuneList,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de tous les commune",
      details: error.message,
    });
  }
};
