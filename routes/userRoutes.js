const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const apiFeatures = require('../utils/apiFeatures');

// Internal feature for testing purpose
router.route('/')
  .get(apiFeatures.protect, userController.getAllUsers);

router.route('/contact')
  .post(apiFeatures.protect, userController.addContacts);
  
module.exports = router;
