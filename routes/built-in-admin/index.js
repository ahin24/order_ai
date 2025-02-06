const express = require('express');
const builtInAuthRoute = require('../built-in-admin/builtInAuth.route');
const productsRoute = require('./products.route');
const router = express.Router();

router.use('/auth',builtInAuthRoute);
router.use('/products',productsRoute);
module.exports = router;