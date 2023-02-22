const express = require('express');
const router = express.Router();
// Require the controllers WHICH WE DID NOT CREATE YET!!
const userController = require('../Controller/user.controller');
const passport = require('passport');
const passportAuth = passport.authenticate("usersAuth", { session: false });
// a simple test url to check that all of our files are communicating correctly.
router
.route('/add')
.post(passportAuth,userController.createUser);

router.route('/login').post(userController.login);

router.route('/addReview').post(passportAuth,userController.addReview);
router.route('/addToCart').post(passportAuth,userController.addToCart);
router.route('/getUserCart').get(passportAuth,userController.getUserCart);
router.route('/buyNow').post(passportAuth,userController.buyNow);
module.exports = router;