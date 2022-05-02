const express = require('express');
const authController = require('../controllers/authController');
const userController=  require('../controllers/userController');
const { grantAccess } = require('../permissions/grantAccess');
const { isLoggedIn } = require('../permissions/isLoggedIn');
const router = express.Router();
const urlencodedParser = express.urlencoded({ extended: true });

// AUTH ROUTES
router.get('/login', urlencodedParser, authController.getLoginPage);
router.get('/signup', urlencodedParser, authController.getSignupPage);
router.post('/login', authController.loginUser);
router.post('/signup', authController.createUser);
router.get('/logout', isLoggedIn, authController.logoutUser);

// USER ROUTES
router.get('/user/:id', isLoggedIn, userController.getUser);
router.get('/users', isLoggedIn, grantAccess('readAny', 'profile'), userController.getUsers);
router.patch('/user/:id', isLoggedIn, grantAccess('updateAny', 'profile'), userController.updateUser);
router.delete('/user/:id', isLoggedIn, grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;