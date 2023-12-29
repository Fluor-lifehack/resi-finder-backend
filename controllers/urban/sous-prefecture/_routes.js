const express = require("express");
const sousPrefecture = require("./sous-prefecture.controller");
const auth = require("../../../middelwares/auth");

const router = express.Router();

router.get("/", auth, sousPrefecture.getAllSousPrefectures);
router.post("/add", auth, sousPrefecture.createSousPrefecture);
router.get("/view/:id", auth, sousPrefecture.getSousPrefectureById);
router.put("/edit/:id", auth, sousPrefecture.updateSousPrefecture);
router.delete("/delete/:id", auth, sousPrefecture.deleteSousPrefecture);

module.exports = router;
