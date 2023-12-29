const express = require("express");
const commune = require("./commune.controller");
const auth = require("../../../middelwares/auth");

const router = express.Router();

router.get("/", auth, commune.getAllCommunes);
router.post("/add", auth, commune.createCommune);
router.get("/view/:id", auth, commune.getCommuneById);
router.put("/edit/:id", auth, commune.updateCommune);
router.delete("/delete/:id", auth, commune.deleteCommune);

module.exports = router;
