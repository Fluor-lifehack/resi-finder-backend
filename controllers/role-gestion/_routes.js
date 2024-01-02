const express = require("express");
const user = require("./user.controller");
const authJwt = require("../../middelwares/authJwt");

const router = express.Router();

router.get("/admin", [authJwt.isUser, authJwt.isAdmin], user.adminAreAccess);
router.get("/user", authJwt.isUser, user.UserAreAccess);
router.get("/agence", authJwt.isAgence, user.agenceAreAccess);
router.get("/agent", authJwt.isAgent, user.agentAreAccess);

// router.get("/admin", user.adminAreAccess);
// router.get("/user", user.UserAreAccess);
// router.get("/agence", user.agenceAreAccess);
// router.get("/agent", user.agentAreAccess);

module.exports = router;
