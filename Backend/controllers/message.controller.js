import Conversation from '../models/conversation.model.js';
import Message from "../models/message.model.js";
export const sendMessage = async(req,res) => {
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id; 

        let conversation = await Conversation.findOne({
            // this gives conversation between these two users.
            participants : { $all : [senderId,receiverId]},
        });
        // if there is no conversation we create one.
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId,receiverId], 
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        
        // await conversation.save();
        // await newMessage.save();

        /**
         * The code snippet you provided uses Promise.all() to concurrently execute two asynchronous operations: conversation.save() and newMessage.save(). Here's a breakdown of what this code does:

conversation.save(): Presumably, this method is responsible for saving or updating a conversation object in a database. This operation is asynchronous, meaning it doesn't block the execution of other code while it's processing.

newMessage.save(): Similarly, this method saves or updates a new message object in a database. Like conversation.save(), this operation is also asynchronous.
         */
        // here both of them will run at the same time.

        // SOCKET IO Functionality. 
        await Promise.all([conversation.save(),newMessage.save()]); 
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ",error);
        res.status(500).json({error : "Internal server error "});
    }
}

export const getMessages = async(req,res)=>{
    try {
         const {id:userToChatId} = req.params;
         const senderId = req.user._id;

         // why using populate because inside the array dont give us messages array , but also give the messages.
         const conversation = await Conversation.findOne({
            participants : {$all :[senderId,userToChatId]},
         }).populate("messages"); // NOT REFRENCE BUT MESSAGE ITSELF
        
         if(!conversation) return res.status(200).json([]);
         const messages = conversation.messages;
         res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessage controller: ",error.message);
        res.status(500).json({error : "Internal server error "});
    }
}