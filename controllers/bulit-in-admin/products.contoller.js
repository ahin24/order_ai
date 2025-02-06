const {consoleService,productServiceFrConsole} = require('./../../services')

const showProductsListPage = async (req, res) => {
    res.render('products', { error: null })
}

const showProductsCategoryListPage = async(req, res)=>{
    res.render('productsCategoryList', { error: null })
}
const showProductsCategoryAddPage = async(req, res)=>{
    res.render('productsCategoryAdd', { error: null })
}


const addProductCategory = async(req, res)=>{
    try{
        const createCategory = await productServiceFrConsole.addProductCategory();
    }catch(error){
        console.log("Error",error);        
    }
}
module.exports = {
    showProductsListPage,
    showProductsCategoryListPage,
    showProductsCategoryAddPage,
    addProductCategory
}