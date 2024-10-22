const mongoose=require('mongoose');
async function connectToDb(url){
    return mongoose.connect(url).then(()=>{
        console.log("Connected to Data Base");
    }).catch((e)=>{
        {
            console.log('print'+e)
        };
    })
} 
module.exports=connectToDb;