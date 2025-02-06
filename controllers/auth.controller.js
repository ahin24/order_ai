const {authService} = require('./../services');

/**
 * Registering a member
 * @param {object} req 
 * @param {object} res 
 */
const signUp = async(req,res)=>{
    try{        
        const userCreate = await authService.createUser(req.body,res);

        res.status(201).send({
            code: 201,
            message:'You’ve just unlocked a whole new level of awesomeness! Welcome aboard, member! 🚀'
        });
    }catch(error){
        console.log('Sign Up Error ===>',error);
        res.status(500).send({
            code: 500,
            message:'Uh-oh, we’ve entered the glitchy zone 🌈.',
            meta_info:{
                details:'The request couldn’t be processed because of a little cosmic misalignment. We’re fixing it! ✨'
            }
        });
    }
}
/***
 * Sign in user
 * @param {object} req 
 * @param {object} res 
 */
const signIn = async(req,res)=>{
    try{
        const response = await authService.signIn(req.body,res)

        res.status(200).send({
            code: 200,
            message:'You’ve just unlocked a whole new level of awesomeness! Welcome aboard, member! 🚀',
            data:{
                userDetails: response.userDetails,
                accessToken:response.accessToken,
                refreshToken:response.refreshToken
            }
        });
    }catch(error){
        console.log('Sign In Error ===>',error);
        res.status(500).send({
            code: 500,
            message:'Uh-oh, we’ve entered the glitchy zone 🌈.',
            meta_info:{
                details:'The request couldn’t be processed because of a little cosmic misalignment. We’re fixing it! ✨'
            }
        });
    }
}
module.exports = {
    signUp,
    signIn
}