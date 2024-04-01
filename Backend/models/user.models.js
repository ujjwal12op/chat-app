import mongoose from "mongoose";
/**
 *
 * case 1 : In this part, you're defining a Mongoose schema called userSchema for storing user data. The schema defines the structure of the user documents in the MongoDB collection. Each field in the schema corresponds to a property in the MongoDB document, and you can specify the data type (type), validation rules (required, unique, minlength, enum, etc.), and default values (default) for each field
 * 
 * 
 * 2) const User = mongoose.model("User",userSchema);
export default User;
After defining the schema, you create a Mongoose model using mongoose.model(). The model represents a collection in the MongoDB database and provides an interface for CRUD operations and other database-related tasks. The first argument to mongoose.model() is the name of the collection (in this case, "User"), and the second argument is the schema (userSchema) that defines the structure of the documents in that collection.
 * 
 */
const userSchema = new mongoose.Schema({
    fullName : {
        type :String,
        required : true,
    },

    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
    },
    gender : {
        type : String,
        required : true,
        enum : ["male","female"],
    },
    profilePic : {
        type : String,
        default : "",
    },
},{timestamps:true});

// Now we will create the model for the schema .

const User = mongoose.model("User",userSchema);
export default User;