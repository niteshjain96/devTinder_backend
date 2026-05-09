const validator=require('validator');

const ValidateSignUpData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName){
        throw new Error('Name is not valid');
    }
    else if(!validator.isEmail(emailId)){
        throw new Error('Email is not valid');
    }
}

module.exports={ValidateSignUpData};