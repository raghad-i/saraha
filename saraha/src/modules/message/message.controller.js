import massageModel from "../../../DB/models/message.model.js";

export const getMassage= async(req,res)=>{
    
    const massages = await massageModel.findById(req.query._id);
    return res.json({message:"succees",massages});
    }
    export const sendMassage= async(req,res)=>{
        const {receiverId} = req.params;
        const {message} = req.body;
        const user = await userModel.findById(receiverId);
        if(!user){  
          return res.status(404).json({message:"user not found"});
        }
        const createMessage = await messageModel.create({content:message, receiverId});
        return res.status(201).json({message:"success", createMessage});
    };