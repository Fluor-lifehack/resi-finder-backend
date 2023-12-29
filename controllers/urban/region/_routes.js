const express = require("express");
const region = require("./region.controller");
const auth = require("../../../middelwares/auth");

const router = express.Router();

router.get("/", region.getAllRegions);
router.post("/add", region.createRegion);
router.get("/view/:id", region.getRegionById);
router.put("/edit/:id", region.updateRegion);
router.delete("/delete/:id", region.deleteRegion);

module.exports = router;
