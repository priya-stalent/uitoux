const express = require('express');
const router = express.Router();
const passport = require('passport');
// const auth = require('../Middleware/auth');
// Require the controllers WHICH WE DID NOT CREATE YET!!
const productController = require('../Controller/product.controller');
const passportAuth = passport.authenticate("usersAuth", { session: false });

// a simple test url to check that all of our files are communicating correctly.
router
.route('/create')
.post(passportAuth, productController.createProduct);

router.route('/list').get(passportAuth, productController.getProduct);
router.route('/topRated').get(passportAuth, productController.getTopRated);

module.exports = router;