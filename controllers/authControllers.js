const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
// register
const registerController = async(req,res) =>{
    try{
       const {userName, email,password,phone,address} = req.body
    //    validation
    if(!userName || !email || !password || !address || !phone){
        return res.status(500).send({
            success:false,
            message:'please provide all field'
        })
    }
    // check user
    const existing = await userModel.findOne({email})
    if(existing){
        return res.status(500).send({
            success:false,
            message:'email already register please login'
        })
    }
    // hasting password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    // create new user
    const user = await userModel.create({userName,email,password:hashedPassword,address,phone})
    res.status(201).send({
        success:true,
        message:'successfully register'
    })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in register api', error
        })
    }
};
// login
const loginController = async(req,res) => {
    try{
       const {email,password} = req.body
    //    validation
    if(!email || password){
        return res.status(500).send({
            success:false,
            message:'please provide email and password'
        })
    }

    // check user 
    
    const user = await userModel.findOne({email:email, password:password})
    if(!user){
        return res.status(400).send({
            success:false,
            message:"user not found password not match"
        })
    }
    // check userpassword compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(500).send({
            sucess:false,
            message:"invalid credentials",
        })
    }
    // token
    const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
        expiresIn:'7d',
    })
    user.password = undefined;
    res.status(200).send({
        success:true,
        message:'login successfully',
        token,
         user,
    });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login api',error
        })
    }
}


module.exports = { registerController, loginController}