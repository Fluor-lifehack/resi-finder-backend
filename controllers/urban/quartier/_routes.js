const express = require("express");
const quartier = require("./quartier.controller");
const auth = require("../../../middelwares/auth");

const router = express.Router();

router.get("/", auth, quartier.getAllQuartiers);
router.post("/add", auth, quartier.createQuartier);
router.get("/view/:id", auth, quartier.getQuartierById);
router.put("/edit/:id", auth, quartier.updateQuartier);
router.delete("/delete/:id", auth, quartier.deleteQuartier);

module.exports = router;
