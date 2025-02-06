const express = require('express');
const router = express.Router();
const builtInAuthController = require('./../../controllers/bulit-in-admin/builtInAuth.controller');

/*** Views Route */
router.get('/',builtInAuthController.showSignInPage); //Landing sign in page
router.get('/dashboard',builtInAuthController.showConsoleDashboard); //Landing sign in page

/*** Functionailty Route */
router.post('/signin',builtInAuthController.adminSignIn);

module.exports = router;