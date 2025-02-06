const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const consoleLogin = async(reqBody)=>{
    try{        
        const checkConsoleLogin = await prisma.user.findUnique({where:{email:reqBody.email}});

        return checkConsoleLogin;
    }catch(error){
        console.log("Error in console",error);
        throw new Error(error);
    }
}

module.exports = {
    consoleLogin
}