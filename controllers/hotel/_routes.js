const express = require("express");
const hotel = require("./hotel.controller");
// const reservation = require("./reservation.controller");
// const chambre = require("./chambre.controller");
// const paiement = require("./paiement.controller");
// const auth = require("../../middelwares/auth");

const router = express.Router();

// hotel
router.get("/", hotel.getHotels);
router.post("/add", hotel.createHotel);
router.get("/view/:id", hotel.getHotelById);
router.put("/edit/:id", hotel.updateHotel);
router.delete("/delete/:id", hotel.deleteHotel);

// // reservation
// router.get("/", auth, reservation.index);FUNC
// router.post("/add", auth, reservation.add);
// router.get("/view/:id", auth, reservation.view);
// router.put("/edit/:id", auth, reservation.edite);
// router.delete("/delete/:id", auth, reservation.deleteData);

// // chambre

// router.get("/", auth, chambre.index);
// router.post("/add", auth, chambre.add);
// router.get("/view/:id", auth, chambre.view);
// router.put("/edit/:id", auth, chambre.edite);
// router.delete("/delete/:id", auth, chambre.deleteData);

// // paiement
// router.get("/", auth, paiement.index);
// router.post("/add", auth, paiement.add);
// router.get("/view/:id", auth, paiement.view);
// router.put("/edit/:id", auth, paiement.edite);
// router.delete("/delete/:id", auth, paiement.deleteData);

module.exports = router;
