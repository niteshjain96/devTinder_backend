const express=require('express');
const dotenv=require('dotenv')
const connectDB=require('./config/database')
const User=require('./models/User');
const app=express();
dotenv.config();
const {adminAuth}=require('./middlewares/auth');

// app.use('/admin',adminAuth);

// app.get('/admin/getAllData',(req,res)=>{
//     res.send('Get all data');
// })

// app.get('/admin/deleteUser',(req,res)=>{
//     res.send('Deleted user');
// })

// app.use('/',(req,res)=>{
//     res.send('Hii from Server');
// })

// app.get('/user',(req,res)=>{
//     res.send('User Route');
// })

// app.get('/about/team',(req,res)=>{
//     res.send('About Team Route');
// })

// app.get('/useradd',(req,res)=>{
//     res.send({firstname:"Nitesh"})
// })

// app.post('/user',(req,res)=>{
//     res.send('data successfully saved');
// })

// app.delete('/user',(req,res)=>{
//     res.send('User deleted')
// })


// URL Based

// app.get(/ab?c/,(req,res)=>{
//     res.send('ab?c');
// })

// app.get(/ab+c/,(req,res)=>{
//     res.send('Can be any number of b')
// })

// app.get('/user/:userId/:name/:password',(req,res)=>{
//     res.send(req.params);
//     console.log(req.params);
// })

// app.use('/user',(req,res)=>{

// })

// app.use('/user',(req,res,next)=>{
// console.log('1st route hndler');
// next();
// },(req,res,next)=>{
//     console.log('2md route hmandkler');
// })

// let x=(req,res,next)=>{
//     console.log('X');
//     next();
// }
// let y=(req,res,next)=>{
//     console.log('Y');
//     res.send('End')
// }
// app.use('/user',[x,y])

// app.get('/admin/getAllData',(req,res)=>{
//     const token='helloworld';
//     const isAdmin=token==='helloworld';
//     if(isAdmin){
//         res.send('All data set');
//     }
//     else{
//         res.status(401).send('aunkjhgf')
//     }
// })

connectDB().then(()=>{
    console.log('Connection Established');
    app.listen(3000,(req,res)=>{
    console.log('Server started');
})
})


app.post('/signup',async(req,res)=>{
    const user=new User({
        firstName:'Nitesh',
        lastName:'Jain',
        emailId:'nitesh@gmail.com',
        password:'nitesh12345'
    })
    await user.save();
    res.send('User Addedd successfully')
})
