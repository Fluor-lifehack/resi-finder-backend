const express = require("express");
const SousPrefecture = require("../../../model/urban/sous-prefecture.model");

// Créer une nouvelle SousPrefecture
exports.createSousPrefecture = async (data) => {
  return await SousPrefecture.create(data);
};

// Récupérer une SousPrefecture par son ID
exports.getSousPrefectureById = async (id) => {
  return await SousPrefecture.findById(id);
};

// Mettre à jour une SousPrefecture par son ID
exports.updateSousPrefecture = async (id, data) => {
  return await SousPrefecture.findByIdAndUpdate(id, data, { new: true });
};

// Supprimer une SousPrefecture par son ID
exports.deleteSousPrefecture = async (id) => {
  return await SousPrefecture.findByIdAndDelete(id);
};

// Récupérer toutes les SousPrefectures
exports.getAllSousPrefectures = async () => {
  return await SousPrefecture.find();
};
