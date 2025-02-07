const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addProductCategory = async (reqBody) => {
    try {
        const createCategory = await prisma.productCategory.create({
            data: {
                name: reqBody.name
            }
        })
        console.log("createCategory", createCategory);

        return createCategory;
    } catch (error) {
        throw new Error(error);
    }
}

const productCategoryList = async (reqBody) => {
    try {
        const limit = reqBody?.limit;
        const currentPage = reqBody?.currentPage;

        const list = await prisma.productCategory.findMany({
            skip: currentPage,
            take: limit
        });

        const data = {
            list,
            limit: limit,
            page: currentPage,
            totalResults: list.length,
            totalPages: list.length / limit,
            dataRange: `${limit * (currentPage - 1) + 1}-${limit * currentPage > list.length
                ? list.length
                : limit * currentPage
                }`
        }
        console.log("data",data);
        
        return data;
    } catch (error) {
        throw new Error(error);
    }
}
module.exports = {
    addProductCategory,
    productCategoryList
}