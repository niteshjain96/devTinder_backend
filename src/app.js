const express=require('express');
const dotenv=require('dotenv')
const cors = require('cors');
const bcrypt=require('bcrypt');
const connectDB=require('./config/database')
const User=require('./models/User');
const app=express();
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true                
}));
app.use(express.json());
dotenv.config();
const {adminAuth}=require('./middlewares/auth');
const { ValidateSignUpData } = require('./utils/validation');

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


// app.post('/signup',async(req,res)=>{
//     const user=new User({
//         firstName:'Nitesh',
//         lastName:'Jain',
//         emailId:'nitesh@gmail.com',
//         password:'nitesh12345'
//     })
//     await user.save();
//     res.send('User Addedd successfully')
// })

// app.post('/signup',(req,res)=>{
//     console.log(req.body);
// })

//signup
app.post('/signup',async(req,res)=>{
    // const user=new User(req.body)
    try {
        ValidateSignUpData(req);
        const {firstName,lastName,emailId,password}=req.body;
        // Encrypt password
        // console.log(password);
        const passwordHash=await bcrypt.hash(password,10);
        // console.log(passwordHash);
        // await user.save();
        const user=new User({firstName,lastName,emailId,password:passwordHash});
        await user.save();
        res.send('User Addedd successfully')
        
    } catch (error) {
        res.send(error.message);        
    }
})

// get user
app.get('/user',async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.find({emailId:userEmail});
        if(users.length==0){
            res.status(404).send('User Not found')
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send('Something went wrong');
    }

})

// feed api

app.get('/feed',async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }
    catch(err){ 
        res.status(400).send('somethign went wrong')
    }
})

app.delete('/user',async(req,res)=>{
    const emailId=req.body.emailId;
    try{
        const users=await User.findOneAndDelete({emailId});
        if(!users){
            res.status(200).send('No User found');
        }
        res.send('User Delete Successfully')
    }
    catch(err){
        res.status(400).send('Something qwent wrong');
    }
})

// update data of user
app.patch('/user/:userId',async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;
    
    try {
        const allowed_Updates=["photoUrl","gender","about","age","skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>allowed_Updates.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Upate not allowed");
        }
        if(data?.skills && data.skills.length > 10){
            throw new Error("Skills cannot be more than 10");
        }
        const user=await User.findByIdAndUpdate({_id:userId},data,{ runValidators: true });
        res.send('User Updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
})


// login user
app.post('/login', async (req, res) => {
    const { emailId, password } = req.body;
    try {
        // 1. Check if user exists
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const ispasswordValid=await bcrypt.compare(password,user.password);
        // 2. Compare password

        // if (user.password !== password) {
        //     return res.status(401).json({ message: 'Invalid credentials' });
        // }
        if(ispasswordValid){
            res.send('Login successful');
        }

        // 3. Send response
        // res.status(200).json({ message: 'Login successful', user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});