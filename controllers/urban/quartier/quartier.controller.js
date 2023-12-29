const express = require("express");
const Quartier = require("../../../model/urban/quartier.model");

// Méthode pour créer un nouveau pays.
exports.createQuartier = async (req, res) => {
  try {
    const newQuartier = new Quartier(req.body);
    await newQuartier.save();

    res.status(201).json({
      success: true,
      message: "Quartier créée avec succès",
      data: newQuartier,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création du Quartier",
      details: error.message,
    });
  }
};

// Méthode pour obtenir un Quartier par son ID.
exports.getQuartierById = async (req, res) => {
  try {
    const quartier = await Quartier.findById(req.params.id);
    if (!quartier) {
      res.status(404).json("Quartier non trouvé");
    }

    res.status(200).json({ success: true, data: quartier });
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération du quartier : ${error.message}`
    );
  }
};

// Méthode pour mettre à jour un quartier par son ID.
exports.updateQuartier = async (req, res) => {
  try {
    const quartier = await Quartier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quartier) {
      return res.status(404).json({ message: "Quartier non trouvée" });
    }
    res
      .status(200)
      .json({ message: "Quartier mise à jour avec succès", quartier });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du quartier",
      details: error.message,
    });
  }
};

// Méthode pour supprimer un quartier par son ID.
exports.deleteQuartier = async (req, res) => {
  try {
    const quartier = await Quartier.findByIdAndDelete(req.params.id);
    if (!quartier) {
      return res.status(404).json({ message: "Quartier non trouvée" });
    }
    res.status(200).json({ message: "Quartier supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du quartier",
      details: error.message,
    });
  }
};

// Méthode pour récupérer tous les quartier.
exports.getAllQuartiers = async (req, res) => {
  try {
    const QuartierList = await Quartier.find();

    res.status(200).json({
      success: true,
      message: "récupération succès",
      nbr: QuartierList.length,
      data: QuartierList,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de tous les quartier",
      details: error.message,
    });
  }
};
