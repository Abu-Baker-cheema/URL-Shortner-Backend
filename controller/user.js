const { exists } = require("../models/url");
const User=require("../models/user")
const {v4:uuidv4}=require('uuid')
const authServices=require("../services/auth_service")
const fs=require("fs")
async function handleSignUp(req,res) {
   try{
    const body =req.body;
    if(!body.Name||!body.Email||!body.Password){
        return res.status(400).json({ message: 'Bad request' });
    }
    const user=await User.create({Name:body.Name,
        Email:body.Email,
        Password:body.Password});
        if(!user){
            return res.status(500).json({ message: 'Server error' });0
        }
      
        return res.status(200).json({Name:user.Name,Email:user.Email,Password:user.Password});
   }
   catch(e){
    return res.status(400).json({ message: 'BadEmail already exists' });
   }
}

async function handleLogin(req,res) {
    try{
        const body=req.body;
        if(!body){
            return res.status(400).json({ message: 'Bad request' });
        }
        const user=await User.findOne({Email:body.Email,Password:body.Password});
        if(!user){
            return res.status(404).json({ message: 'No user found' });
        }
        const session=uuidv4();
        authServices.setUser(session,user);

        return res.status(200).json({exist:"yes",sessionId:session});
    }
    catch(e){
        return res.status(404).json({ message: 'Server Error' });
    }
   
}


async function handleAuth(req, res) {
    try {
        const authHeader = req.headers['authorization']; // Change to lowercase

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const authSessionId = authHeader.split(' ')[1];
            
            const user = authServices.getUser(authSessionId);

            // Logging
            try {
                fs.appendFileSync("log.txt", `${Date.now()} : ${req.ip} : ${req.method} : ${req.path} : ${authSessionId}\n`);
            } catch (logError) {
                console.error("Logging error: ", logError);
            }
            
            if (user) {
                res.json({ message: 'Access granted', user });
            } else {
                res.status(401).json({ message: 'Invalid session' });
            }
        } else {
            res.status(401).json({ message: 'Authorization header missing or invalid' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports={
    handleSignUp,
    handleLogin,
    handleAuth,
}