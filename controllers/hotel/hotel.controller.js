const Hotel = require("../../model/hotel/hotel");

// Controller pour créer un nouvel hôtel
exports.createHotel = async (req, res) => {
  try {
    const newHotel = await Hotel.create(req.body);
    res.status(201).json({
      success: true,
      data: newHotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controller pour récupérer tous les hôtels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controller pour récupérer un hôtel par ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: "Hotel not found",
      });
    }
    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controller pour mettre à jour un hôtel
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: hotel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Controller pour supprimer un hôtel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        error: "Hotel not found",
      });
    }
    await hotel.remove();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
