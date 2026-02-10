const express = require("express");
const climateAPIController = require("../controllers/climateApiController");

const router = express.Router();

router.post("/get-data", climateAPIController.climateRouter);

module.exports = router;