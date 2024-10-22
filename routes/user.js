const express=require("express")
const userController=require('../controller/user')
const route=express.Router()
route.post('/Signup',userController.handleSignUp);
route.post('/Login',userController.handleLogin);
route.get('/protected',userController.handleAuth);
module.exports=route;