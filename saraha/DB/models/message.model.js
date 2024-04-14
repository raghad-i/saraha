import { Schema, Types, model } from 'mongoose';
const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    receiverId: {
        type: Types.ObjectId,
        required:true,
    }
    },{
    timestamps: true,
});
const massageModel = model('message', messageSchema);
export default massageModel;