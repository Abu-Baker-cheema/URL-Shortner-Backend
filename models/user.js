const mongoose=require("mongoose");
const UserScheema=new mongoose.Schema({
Name:{
    type:String,
    required:true
},
Email:{
    type:String,
    unique:true,
    required:true
},
Password:{
    type:String,
    required:true,
}

});
const User=mongoose.model('user',UserScheema);
module.exports=User;