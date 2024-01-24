const express = require('express');
const router = express.Router();
const spamController = require('../controllers/spamController');
const apiFeatures = require('../utils/apiFeatures');

router
  .route('/')
  .post(apiFeatures.protect, spamController.spamPhoneNo)
  .get(apiFeatures.protect, spamController.getAllSpamPhoneNos);

router
  .route('/marked_spams')
  .get(apiFeatures.protect, spamController.getMarkedSpamPhoneNos);

router
  .route('/search')
  .get(apiFeatures.protect, spamController.findSpamList); //query param name

module.exports = router;
