const express = require("express");
const visite = require("./visite");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.get("/", auth, visite.index);
router.post("/add", auth, visite.add);
router.get("/view/:id", auth, visite.view);
router.put("/edit/:id", auth, visite.edite);
router.delete("/delete/:id", auth, visite.deleteData);

module.exports = router;
