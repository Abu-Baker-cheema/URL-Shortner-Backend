const express=require('express');
const urlcontroller=require('../controller/url');
const route=express.Router();

route.post('/',urlcontroller.generatenewurl)
.get('/',(req,res)=>{
    res.send("hi");
})
route.get('/:shortID',urlcontroller.UpdateHistory);
route.get('/analytics/:shortid',urlcontroller.handleAnalutics);
module.exports=route;