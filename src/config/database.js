const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();


const connectDB=async()=>{
    await mongoose.connect(process.env.database_url).then(() => console.log('✅ Success: Connected to MongoDB'))
  .catch(err => {
    console.error('❌ Connection Failed!');
    console.error('Error Name:', err.name);
    console.error('Error Code:', err.code);
    console.error('Error Message:', err.message);
    
    if (err.message.includes('OP_QUERY')) {
        console.log('👉 Tip: Your Node.js version might be too old for this Mongoose version.');
    }
  });}


  module.exports=connectDB;