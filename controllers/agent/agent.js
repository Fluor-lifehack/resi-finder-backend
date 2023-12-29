// agent.routes.js

const express = require("express");
// const router = express.Router();
const Agent = require("../../model/schema/agent");

// Créer un nouvel agent.
const add = async (req, res) => {
  console.log("HELLO");
  try {
    const agent = new Agent(req.body);
    await agent.save();
    res.status(201).json(agent);
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la création de l'agent",
      error: error.message,
    });
  }
};

// Obtenir la liste des agents.
const index = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des agents",
      error: error.message,
    });
  }
};

// Obtenir les détails d'un agent spécifique.
const view = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent non trouvé" });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération de l'agent",
      error: error.message,
    });
  }
};

// Mettre à jour les détails d'un agent.
const edite = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!agent) {
      return res.status(404).json({ message: "Agent non trouvé" });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'agent",
      error: error.message,
    });
  }
};

// Supprimer un agent.
const deleteData = async (req, res) => {
  try {
    const agent = await Agent.findByIdAndDelete(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent non trouvé" });
    }
    res.status(200).json({ message: "Agent supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression de l'agent",
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
