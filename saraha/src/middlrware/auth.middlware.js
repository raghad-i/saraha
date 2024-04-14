import jwt from 'jsonwebtoken';
import userModel from '../../DB/models/user.model.js';

const auth= async(req,res,next)=>{
    const{authorization}=req.headers;
    if(!authorization.startsWith(process.env.BERERTOKEN)){
        return res.json({message:"not auth user"});
    }
    const token =authorization.split(process.env.BERERTOKEN)[1];
    if(!token){
        return res.json({message:"not auth user"});
    }
    const decode = await jwt.verify(token,process.env.LOGINSIG);  
    const authUser = await userModel.findById(decode.id).select('userName');
    req.user= authUser;
    next();
};
export default auth;