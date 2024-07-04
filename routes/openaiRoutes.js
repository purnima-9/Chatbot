const express = require("express");
const {
  summaryController,
  paragraphController,
  chatbotController,
  JsConverterController,
  scifiImageController,
} = require("../controllers/openiaController");

const router = express.Router();

//route
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", JsConverterController);
router.post("/scifi-image", scifiImageController);

module.exports = router;