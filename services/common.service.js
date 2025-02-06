const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByMail = async(email)=>{
    try{
        console.log("email",email);
        
        return await prisma.user.findUnique({where:{email:email}});
    }catch(error){
        console.log("Error",error);
    }
}

const trackLog = async(reqBody)=>{
    return await prisma.proAuditLog.create({
        data:reqBody
    })
}

module.exports = {
    getUserByMail,
    trackLog
}