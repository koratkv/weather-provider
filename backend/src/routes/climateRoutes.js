const express = require("express");
const climateAPIController = require("../controllers/climateApiController");

const router = express.Router();

router.get("/get-data", climateAPIController.climateRouter);

module.exports = router;