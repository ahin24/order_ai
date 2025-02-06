const {sign} = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateToken = async(user,type,expiry)=>{
    try{
        const payload = {
            sub: user.id,
            exp: expiry.unix(),
            type
        }
        const createToken = await sign(payload,process.env.JWT_SECRET);

        if(type === 'refresh'){
            await prisma.token.create({
                data:{
                    refresh_token : createToken,
                    user_id: user.id
                }
            });
        }

        return createToken;
    }catch(error){
        throw new Error(error)
    }
}

module.exports = {
    generateToken
}