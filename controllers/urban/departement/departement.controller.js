const Departement = require("../../../model/urban/departement.model");
const express = require("express");
const Region = require("../../../model/urban/region.model");

// Méthode pour créer un nouveau departement.
exports.createDepartement = async (req, res) => {
  try {
    const newDepartement = new Departement(req.body);
    await newDepartement.save();

    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: newDepartement,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création du departement",
      details: error.message,
    });
  }
};

exports.getDepartementById = async (req, res) => {
  try {
    // Récupérer le departement par ID
    const departement = await Departement.findById(req.params.id);

    if (!departement) {
      return res
        .status(404)
        .json({ success: false, message: "Departement non trouvé" });
    }

    // Récupérer les détails des régions associées à ce departement
    // const regions = await Region.find({ departement: req.params.id });

    res.status(200).json({
      success: true,
      data: {
        _id: departement._id,
        nom: departement.nom,
        // regions: regions, // Ici, nous incluons les détails des régions
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Erreur lors de la récupération du departement",
      details: error.message,
    });
  }
};

// Méthode pour mettre à jour un departement par son ID.
exports.updateDepartement = async (req, res) => {
  try {
    const departement = await Departement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!departement) {
      return res.status(404).json({ message: "Departement non trouvée" });
    }
    res
      .status(200)
      .json({ message: "Departement mise à jour avec succès", departement });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du departement",
      details: error.message,
    });
  }
};

// Méthode pour supprimer un departement par son ID.
exports.deleteDepartement = async (req, res) => {
  try {
    const departement = await Departement.findByIdAndDelete(req.params.id);
    if (!departement) {
      return res.status(404).json({ message: "Departement non trouvée" });
    }
    res.status(200).json({ message: "Departement supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du departement",
      details: error.message,
    });
  }
};

// // Méthode pour récupérer tous les departement.
exports.getAllDepartements = async (req, res) => {
  try {
    const departementList = await Departement.find();

    res.status(200).json({ success: true, data: departementList });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de tous les departement",
      details: error.message,
    });
  }
};
