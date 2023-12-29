const express = require("express");
const pays = require("./pays.controller");
const auth = require("../../../middelwares/auth");

const router = express.Router();

router.get("/", pays.getAllPays);
router.post("/add", pays.createPays);
router.get("/view/:id", pays.getPaysById);
router.put("/edit/:id", pays.updatePays);
router.delete("/delete/:id", pays.deletePays);

module.exports = router;
