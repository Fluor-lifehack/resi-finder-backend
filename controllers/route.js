const express = require("express");
const router = express.Router();

const contactRoute = require("./contact/_routes");
const propertyRoute = require("./property/_routes");
const leadRoute = require("./lead/_routes");
const taskRoute = require("./task/_routes");
const reportingRoute = require("./reporting/_routes");
const documentRoute = require("./document/_routes");
const userRoute = require("./user/_routes");

const emailRoute = require("./emailHistory/_routes");
const phoneCallRoute = require("./phoneCall/_routes");
const TextMsgRoute = require("./textMsg/_routes");
const meetingRoute = require("./meeting/_routes");
const paymentRoute = require("./payment/_routes");
const agentRoute = require("./agent/_routes");
const visiteRoute = require("./visite/_routes");
const reservationRoute = require("./reservation/_route");

const villeRoute = require("./urban/ville/_routes");
const paysRoute = require("./urban/pays/_routes");
const departementRoute = require("./urban/departement/_routes");
const sousPrefectureRoute = require("./urban/sous-prefecture/_routes");
const quartierRoute = require("./urban/quartier/_routes");
const regionRoute = require("./urban/region/_routes");
const communeRoute = require("./urban/commune/_routes");
const agenceRoute = require("./../controllers/agence/_route");
const hotelRoute = require("./../controllers/hotel/_routes");

//Api`s
router.use("/contact", contactRoute);
router.use("/property", propertyRoute);
router.use("/lead", leadRoute);
router.use("/task", taskRoute);
router.use("/document", documentRoute);
router.use("/reporting", reportingRoute);
router.use("/user", userRoute);
router.use("/payment", paymentRoute);

router.use("/email", emailRoute);
router.use("/phoneCall", phoneCallRoute);
router.use("/text-msg", TextMsgRoute);
router.use("/meeting", meetingRoute);

router.use("/agent", agentRoute);
router.use("/visite", visiteRoute);
router.use("/reservation", reservationRoute);

router.use("/commune", communeRoute);
router.use("/departement", departementRoute);
router.use("/pays", paysRoute);
router.use("/quartier", quartierRoute);
router.use("/region", regionRoute);
router.use("/sous-prefecture", sousPrefectureRoute);
router.use("/ville", villeRoute);
router.use("/agence", agenceRoute);

router.use("/hotel", hotelRoute);

module.exports = router;
