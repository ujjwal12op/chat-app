import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    senderId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message: {
        type : String,
        required : true
    }
    // we are trying to create the timestamps when was the message created and updated at.
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema);
export default Message;
