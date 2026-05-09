const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Email is not valid");
        }
    }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
                {
                    throw new Error("gender not valid");
                }
        }
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default: "This is default about",

    },
    skills:{
        type:[String],
    }
},{timestamps:true})


module.exports=mongoose.model('user',userSchema);