const express=require('express');
const app=express();

app.use('/',(req,res)=>{
    res.send('Hii from Server');
})
app.listen(3000,(req,res)=>{
    console.log('Server started');
})