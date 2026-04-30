const adminAuth=(req,res,next)=>{
    console.log('AUth check');

    const token='Hellonitesh';
    const isAdmin=token==='Hellonitesh';
    if(!isAdmin){
        res.status(401).send('Unauthprized');
    }
    else{
        next();
    }
}

module.exports={
    adminAuth
}