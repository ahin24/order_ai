const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashSync,compareSync } = require('bcryptjs');
const { getUserByMail } = require('./../services/common.service');
const {generateToken} = require('./token.service');
const dayjs = require('dayjs');

/**
 * Create user
 * @param {object} reqBody 
 * @param {object} res 
 * @returns created user
 */
const createUser = async (reqBody, res) => {
    try {
        console.log("Req Body ====>", reqBody);
        const checkUserExists = await getUserByMail(reqBody.email);
        console.log('checkUserExists', checkUserExists);

        if (checkUserExists) {
            res.status(409).send({
                code: 409,
                message: 'Hold up! 🚦 You are already part of us!',
                meta_info: {
                    details: 'Looks like you’re trying to sign up again, but you’re already a valued member. No need to double dip! 🍪'
                }
            });
        }

        const createNewUser = await prisma.user.create({
            data: {
                email: reqBody?.email,
                password: hashSync(reqBody?.password, 10),
                name: reqBody?.name
            }
        });

        return reqBody;
    } catch (error) {
        throw new Error(error);
    }
}
/**
 * Sign in user
 * @param {object} reqBody 
 * @param {object} res 
 * @returns get user
 */
const signIn = async (reqBody, res) => {
    try {
        const getUser = await getUserByMail(reqBody.email);

        /*** If user not found for our application */
        if (!getUser) {
            res.status(400).send({
                code: 400,
                message: 'Oops! 🕵️‍♂️ We couldn’t find that user. They must’ve vanished into thin air! ✨',
                meta_info: {
                    details: 'Double-check the details or try again. They might be hiding somewhere... 👀'
                }
            });
        }

        //*** Compare password */
        if(!compareSync(reqBody.password,getUser.password)){
            res.status(400).send({
                code: 400,
                message: 'Sorry password not matched!',
                meta_info: {
                    details: 'Double-check the details or try again. They might be hiding somewhere... 👀'
                }
            });
        }

        /*** Create access token */
        const accessTokenExpires = dayjs().add(process.env.ACCESS_TOKEN_EXPIRES,'minutes');
        const accessToken = await generateToken(getUser,'access',accessTokenExpires);
        
        /*** Create refresh token */
        const refreshTokenExpires = dayjs().add(process.env.ACCESS_TOKEN_EXPIRES,'day');
        const refreshToken = await generateToken(getUser,'refresh',refreshTokenExpires);

        delete getUser.password;

        return {userDetails:getUser,accessToken,refreshToken};
    } catch (error) {        
        throw new Error(error);
    }
}
module.exports = {
    createUser,
    signIn
}