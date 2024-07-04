exports.sendToken=(user,statusCode,res)=>{





const token=user.getSignedToken(res);
res.status(statusCode).json({
    success:true,
    token,
});
};
//register

exports.registerController=async(req,res,next)=>{
    try{
        const{username,email,password}=req.body;
        const existingEmail=await userModel.findOne({email})
        if(existingEmail) {
            return next(new errorResponse('Email is already in use',500))
        }
        const user=await userModel.create({username,email,password})
        this.sendToken(user,201,res)

    } catch(error){
        console.log(error)
        next(error);
    }
};
exports.loginController=async(req,res,next)=>{
    try{
          const{email,password}=req.body
          if(!email || !password){
            return next(new errorResponse('Please provide a valid email'))
          }
          const user=await userModel.findOne({email})
            if(!user){
                return  next(new errorResponse('Invalid email',401))
            }
            const isMatch=await userModel.matchPassword(password)
            if(!isMatch){
                return next(new errorHandler('Invalid password',401))
            }
            this.sendToken(user,200,res)
    }catch(error){
        console.log(error)
        next(error);
    }

};
//Logout


exports.logoutController=async()=>{
    res.clearCookie('refreshToken')
    return res.status(200),json({
        success:true,
        message:"Logout successfully",
    });
};
