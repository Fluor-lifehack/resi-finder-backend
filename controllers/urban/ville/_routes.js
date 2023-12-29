const express = require("express");
const ville = require("./ville.controller");
const auth = require("../../../middelwares/auth");

const router = express.Router();

router.get("/", auth, ville.getAllVilles);
router.post("/add", auth, ville.createVille);
router.get("/view/:id", auth, ville.getVilleById);
router.put("/edit/:id", auth, ville.updateVille);
router.delete("/delete/:id", auth, ville.deleteVille);

module.exports = router;
