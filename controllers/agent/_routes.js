const express = require("express");
const agent = require("./agent");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.get("/", auth, agent.index);
router.post("/add", auth, agent.add);
router.get("/view/:id", auth, agent.view);
router.put("/edit/:id", auth, agent.edite);
router.delete("/delete/:id", auth, agent.deleteData);

module.exports = router;
