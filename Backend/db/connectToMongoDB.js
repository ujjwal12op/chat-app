/**
 * Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward way to model and interact with MongoDB databases using JavaScript objects and schemas. Mongoose simplifies the process of working with MongoDB by providing a higher-level abstraction and additional features on top of the native MongoDB driver.
 * 
 * In JavaScript, the await keyword is used within an async function to pause the execution of asynchronous code until a promise is resolved or rejected. When you use await, it waits for the promise to settle (either fulfill or reject) and then resumes the execution of the function.


Creating models for a database is an essential part of application development, especially when using Object-Relational Mapping (ORM) libraries like Mongoose for MongoDB or Sequelize for SQL databases. Here are several reasons why creating models is important:

Structure and Organization: Models help organize the structure of your data. They define the attributes (fields or columns) that make up a particular type of data entity (such as users, products, posts, etc.). By defining models, you establish a clear structure for how data is stored and retrieved from the database.
In your code snippet:
 */
import mongoose from 'mongoose';
const connectToMongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error in connecting to MongoDB",error.message);
    }
}

export default connectToMongoDB;