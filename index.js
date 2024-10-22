const express=require('express');
const urlrouter=require('./routes/url');
const userRouter=require("./routes/user")
const app=express()
const connect=require('./connect')
app.use(express.json()); 
app.use(express.urlencoded({extended:false}));
connect('mongodb://127.0.0.1:27017/short-url');
const PORT=8001;
app.use('/url',urlrouter);
app.use('/api/user',userRouter);
app.listen(PORT,()=>{
console.log("Server started at:"+PORT)
});