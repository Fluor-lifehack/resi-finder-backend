const express = require("express");
const Pays = require("../../../model/urban/pays.model");
const Region = require("../../../model/urban/region.model");

// Méthode pour créer un nouveau pays.
exports.createPays = async (req, res) => {
  try {
    const newPays = new Pays(req.body);
    await newPays.save();

    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: newPays,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création du pays",
      details: error.message,
    });
  }
};

exports.getPaysById = async (req, res) => {
  try {
    // Récupérer le pays par ID
    const pays = await Pays.findById(req.params.id);

    if (!pays) {
      return res
        .status(404)
        .json({ success: false, message: "Pays non trouvé" });
    }

    // Récupérer les détails des régions associées à ce pays
    const regions = await Region.find({ pays: req.params.id });

    res.status(200).json({
      success: true,
      data: {
        _id: pays._id,
        nom: pays.nom,
        regions: regions, // Ici, nous incluons les détails des régions
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération du pays",
      details: error.message,
    });
  }
};

// Méthode pour mettre à jour un pays par son ID.
exports.updatePays = async (req, res) => {
  try {
    const pays = await Pays.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pays) {
      return res.status(404).json({ message: "Pays non trouvée" });
    }
    res.status(200).json({ message: "Pays mise à jour avec succès", pays });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du pays",
      details: error.message,
    });
  }
};

// Méthode pour supprimer un pays par son ID.
exports.deletePays = async (req, res) => {
  try {
    const pays = await Pays.findByIdAndDelete(req.params.id);
    if (!pays) {
      return res.status(404).json({ message: "Pays non trouvée" });
    }
    res.status(200).json({ message: "Pays supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du pays",
      details: error.message,
    });
  }
};

// Méthode pour récupérer tous les pays.
exports.getAllPays = async (req, res) => {
  try {
    const paysList = await Pays.find();

    res.status(200).json({ success: true, data: paysList });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de tous les pays",
      details: error.message,
    });
  }
};
