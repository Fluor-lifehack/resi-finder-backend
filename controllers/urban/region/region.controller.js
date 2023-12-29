const express = require("express");

const Region = require("../../../model/urban/region.model");

// Méthode pour créer un nouveau pays.
exports.createRegion = async (req, res) => {
  try {
    const newRegion = new Region(req.body);
    await newRegion.save();

    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: newRegion,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création du Region",
      details: error.message,
    });
  }
};

// Méthode pour obtenir un Region par son ID.
exports.getRegionById = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (!region) {
      res.status(404).json("Region non trouvé");
    }

    res.status(200).json({ success: true, data: region });
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération du region : ${error.message}`
    );
  }
};

// Méthode pour mettre à jour un region par son ID.
exports.updateRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!region) {
      return res.status(404).json({ message: "Region non trouvée" });
    }
    res.status(200).json({ message: "Region mise à jour avec succès", region });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du region",
      details: error.message,
    });
  }
};

// Méthode pour supprimer un region par son ID.
exports.deleteRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndDelete(req.params.id);
    if (!region) {
      return res.status(404).json({ message: "Region non trouvée" });
    }
    res.status(200).json({ message: "Region supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du region",
      details: error.message,
    });
  }
};

// Méthode pour récupérer tous les region.
exports.getAllRegions = async (req, res) => {
  try {
    const regionList = await Region.find();

    res.status(200).json({ success: true, data: regionList });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de tous les region",
      details: error.message,
    });
  }
};
