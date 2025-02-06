const express = require('express');
const router = express.Router();
const productsController = require('./../../controllers/bulit-in-admin/products.contoller');

/*** Views Route */
router.get('/',productsController.showProductsListPage);
router.get('/category-list',productsController.showProductsCategoryListPage);
router.get('/category-add',productsController.showProductsCategoryAddPage)

/*** Functionailty Route */
router.get('/add-product-category',productsController.addProductCategory)

module.exports = router;