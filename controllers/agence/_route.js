const express = require("express");
const agence = require("./agence.controller");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.get("/", agence.index);
router.post("/register", agence.registerAgence);
router.get("/login", agence.loginAgence);
router.put("/edit/:id", agence.editAgence);
// router.delete("/delete/:id", agence.deleteData);

module.exports = router;
