const Reservation = require("../../model/schema/reservaton");
const Visite = require("../../model/schema/visite");

// Liste de toutes les réservations
const index = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    console.log(reservations);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de la liste des réservations",
      details: error.message,
    });
  }
};

// Création d'une réservation
const add = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res
      .status(201)
      .json({ message: "Réservation créée avec succès", reservation });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création de la réservation",
      details: error.message,
    });
  }
};

// Récupération d'une réservation par son ID
const view = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération de la réservation",
      details: error.message,
    });
  }
};

// Mise à jour d'une réservation par son ID
const edite = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res
      .status(200)
      .json({ message: "Réservation mise à jour avec succès", reservation });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour de la réservation",
      details: error.message,
    });
  }
};

// Suppression d'une réservation par son ID
const deleteData = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.status(200).json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression de la réservation",
      details: error.message,
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
