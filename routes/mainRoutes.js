const { isLoggedIn } = require('../permissions/isLoggedIn');
const mainController = require('../controllers/mainController');
const express = require('express');
const router = express.Router();

router.get('/', mainController.getHomepage);
router.get('/dashboard', isLoggedIn, mainController.getDashboard);

module.exports = router;