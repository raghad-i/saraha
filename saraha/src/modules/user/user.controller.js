import userModel from "../../../DB/models/user.model.js";

export const profile= async(req,res)=>{
    
    const users = await userModel.findById(req.user._id);
    return res.json({message:"succees",users});
}
export const getUsers= async(req,res)=>{
    
    const users = await userModel.findById(req.query._id);
    return res.json({message:"succees",users});
}

export const deleteuser= async(req,res)=>{
 
    const users = await userModel.deleteOne({_id:req.userId});
    return res.json({message:"succees",users});
}
export const updateuser= async(req,res)=>{
    try{  
    const id=req.userId;
    const{email}=req.body;
    const users = await userModel.findByIdAndUpdate({_id:id},{email},{new:true});

    return res.json({message:"succees",users});
    }catch(error){

    return res.json({message:"error",error:error.stack});

    }

}