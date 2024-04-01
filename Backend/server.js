// Express is a popular web application framework for Node.js. Its basic function is to simplify the process of building web applications and APIs by providing a set of robust features and utilities. Here are some of the key functions and features of Express:

// Routing: Express allows you to define routes for handling different HTTP requests (GET, POST, PUT, DELETE, etc.) to specific URLs or endpoints. This makes it easy to create a structured API or web application with different routes handling different functionalities.


/*
What is a server ? why do we need to create it.

We create a server in web development to handle client requests and serve web pages, resources, or data over the internet. A server is a computer program or hardware device that provides functionality and resources to other devices or programs, known as clients. In the context of web development, a server refers to a software application that listens for incoming HTTP requests from clients (such as web browsers) and responds to those requests by sending back the requested content or performing specified actions.


*/
// const express = require("express");


import express from "express";

import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
//Setting "type": "module" in your package.json file when working with Node.js signifies that your project is using ECMAScript Modules (ESM) syntax for importing and exporting modules instead of CommonJS syntax. 

// The purpose of a .env file in a Node.js application is to store environment variables that are used to configure the application. 

// The purpose of dotenv.config() in a Node.js application using Express is to load environment variables from a .env file into the Node.js process's process.env object.

// We will not hardcode the value of port instead we will just save it in a .env file.
// to get the port value from .env file
// It wont get the value automatically , we have to import the .dotenv package which we downloaded.
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config()

// app.get("/",(req,res)=>{
//     // root route http://localhost:5000/
//     res.send("Hello world!");
// });


// This is a middleware
/**
 * In simple terms, a middleware is a function or piece of code that runs between the client's request and the server's response in a web application. It sits in the middle (hence the name "middleware") and can perform various tasks such as modifying the request or response objects, executing additional logic, or controlling the flow of the request-response cycle.
 */



// this helps to extract the fields of the data from request.body
app.use(express.json());
app.use(cookieParser());

// before running any other routes we will first run the cookie parser
/**
 * 
 * Cookie parser is a middleware used in web development, especially in Node.js applications, to handle HTTP cookies. Cookies are small pieces of data sent by a website and stored in a user's web browser. They are commonly used for session management, user authentication, tracking user behavior, and storing user preferences.
 */
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes)

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`)});
