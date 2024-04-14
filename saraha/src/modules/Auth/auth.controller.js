import userModel from "../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import SendEmail from './../../utils/sendEmail.js';

export const signUp= async(req,res)=>{
    const{userName,email,password}=req.body;
    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email already exists"});
    }
    const hashpassword=await bcrypt.hash(password,parseInt( process.env.SALTROUND));
    const newUser = await userModel.create({userName,email,password:hashpassword});
    if(!newUser){
        return res.json({message:"error while creating user"});
    }
    const html=`<div>
    <h2>hello ${userName}..</h2>
    <a href='http://localhost:3000/auth/confirmEmail/${token}'>confirm email</a>
   </div>`
    await SendEmail(email,'welcome',html);
    return res.status(201).json({message:"succees",newUser});
};

export const signIn= async(req,res)=>{
    const{email,password}=req.body;
    const user = await userModel.findOne({email}).select('userName password');
    if(!user){
        return res.json({message:"email not exist"});  
    }
    const match=await bcrypt.compare(password,user.password);
    if(!match){
        return res.json({message:"invalid password"});
      }
 const token =jwt.sign({id:user._id},process.env.LOGINSIG,{expiresIn:'1h'});  
 return res.json({message:"succees",token});
};
export const confirmEmail= async(req,res)=>{
    const {token}=req.params;
    const decode =jwt.verify(token,process.env.CONFIRMEMAIL )
    const user =await userModel.findByIdAndUpdate({email:decode.email},{confirmEmail:true},{new:true});
    if(user.modifiedCount>0){
        return res.redirect(process.env.FEURL)
    }
    return res.json({message:"succees",user});
 };