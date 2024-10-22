const mongoose=require("mongoose")
const URLScheema=new mongoose.Schema({
    ShortId:{
        type:String,
        required:true,
        unique:true
    },
    RedirectURL:{
        type:String,
        required:true,
    },
    VisitHistory:[{timestamp:{type:Number}}],
},
{timestamps:true}
);
const URL=mongoose.model('url',URLScheema);
module.exports=URL;