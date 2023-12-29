const express = require("express");

const Ville = require("../../../model/urban/ville.model");

// Méthode pour créer un nouveau pays.
exports.createVille = async (req, res) => {
  try {
    const newVille = new Ville(req.body);
    await newVille.save();

    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: newVille,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création du Ville",
      details: error.message,
    });
  }
};

// Méthode pour obtenir un Ville par son ID.
exports.getVilleById = async (req, res) => {
  try {
    const ville = await Ville.findById(req.params.id);
    if (!ville) {
      res.status(404).json("Ville non trouvé");
    }

    res.status(200).json({ success: true, data: ville });
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération du ville : ${error.message}`
    );
  }
};

// Méthode pour mettre à jour un ville par son ID.
exports.updateVille = async (req, res) => {
  try {
    const ville = await Ville.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ville) {
      return res.status(404).json({ message: "Ville non trouvée" });
    }
    res.status(200).json({ message: "Ville mise à jour avec succès", ville });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du ville",
      details: error.message,
    });
  }
};

// Méthode pour supprimer un ville par son ID.
exports.deleteVille = async (req, res) => {
  try {
    const ville = await Ville.findByIdAndDelete(req.params.id);
    if (!ville) {
      return res.status(404).json({ message: "Ville non trouvée" });
    }
    res.status(200).json({ message: "Ville supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du ville",
      details: error.message,
    });
  }
};

// Méthode pour récupérer tous les ville.
exports.getAllVilles = async (req, res) => {
  try {
    const villeList = await Ville.find();

    res
      .status(200)
      .json({
        success: true,
        message: "récupération succès",
        nbr: villeList.length,
        data: villeList,
      });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de tous les ville",
      details: error.message,
    });
  }
};
