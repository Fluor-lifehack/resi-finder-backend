const express = require("express");
const departement = require("./departement.controller");
const auth = require("../../../middelwares/auth");

const router = express.Router();

router.get("/", departement.getAllDepartements);
router.post("/add", departement.createDepartement);
router.get("/view/:id", departement.getDepartementById);
router.put("/edit/:id", departement.updateDepartement);
router.delete("/delete/:id", departement.deleteDepartement);

module.exports = router;
