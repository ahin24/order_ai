const {consoleService} = require('./../../services')

const showSignInPage = async (req, res) => {
    res.render('signIn', { error: null })
}

const adminSignIn = async(req,res)=>{
    try{
        console.log("****",req.body);

        const consoleLogin = await consoleService.consoleLogin(req.body);

        if(consoleLogin){
            res.redirect("/console/auth/dashboard");
        }else{
            res.render("signIn", { error: 'Credential mismatch' });
        }
    }catch(error){
        res.render("signIn", { error: error });
    }
}
const showConsoleDashboard = async(req,res)=>{
    res.render('dashboard', { error: null })
}
module.exports = {
    showSignInPage,
    adminSignIn,
    showConsoleDashboard
}