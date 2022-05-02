const profileController = require('../controllers/profileController');
const { isLoggedIn } = require('../permissions/isLoggedIn');
const express = require('express');
const router = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

router.route('/profile')
  .get(isLoggedIn, profileController.getProfilePage)
  .post(isLoggedIn, urlencodedParser, profileController.createProfile);
router.route('/profile/:id')
  .get(isLoggedIn, profileController.getProfile)
  .patch(isLoggedIn, urlencodedParser, profileController.updateProfile);

module.exports = router;