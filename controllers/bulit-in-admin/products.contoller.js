const { consoleService, productServiceFrConsole } = require('./../../services')

const showProductsListPage = async (req, res) => {
    res.render('products', { error: null })
}

const showProductsCategoryListPage = async (req, res) => {
    req.body.limit = req?.body.limit ? req?.body.limit : 100;
    req.body.currentPage = req?.body.currentPage ? req?.body.currentPage : 0;

    const data = await productServiceFrConsole.productCategoryList(req?.body);

    res.render('productsCategoryList', { data, error: null })
}
const showProductsCategoryAddPage = async (req, res) => {
    res.render('productsCategoryAdd', { error: null })
}


const addProductCategory = async (req, res) => {
    try {
        const createCategory = await productServiceFrConsole.addProductCategory(req.body);

        res.render('productsCategoryList', { data: createCategory, error: null })
    } catch (error) {
        console.log("Error", error);
    }
}
module.exports = {
    showProductsListPage,
    showProductsCategoryListPage,
    showProductsCategoryAddPage,
    addProductCategory
}