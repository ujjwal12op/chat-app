/**
 * In JavaScript, the async keyword is used to define an asynchronous function. An asynchronous function is a function that operates asynchronously, meaning it can perform tasks without blocking the execution of other code. Asynchronous functions are commonly used in scenarios where operations like fetching data from an API
 */

import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/genarateTokens.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // to be able to signup a user we have to create a database and create models and sign up that user in the database.

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords dont match" });
    }

    // find the user , if already present , return username already exists.
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password : we dont want anyone to see our password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // https://avatar-placeholder.iran.liara.run/ == avatar API
    /**
         * 
An API, or Application Programming Interface, is like a bridge that allows different software applications or systems to communicate and interact with each other. In simple words, it defines how different pieces of software can work together and share data or functionality.

Imagine you are at a restaurant. The menu is like an API. It provides a list of dishes (functions or operations) that you can order (use). You don't need to know how the chef prepares the dish or what ingredients are used; you just need to know what dishes are available and how to order them. Similarly, an API defines what operations a software system can perform and how to use those operations without needing to know the internal workings of the system
         */

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    // creating new user

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // genarate JWT token here
      /**
JWT stands for JSON Web Token. It is a compact and self-contained way to securely transmit information between parties as a JSON object. In web development and authentication, JWTs are commonly used for securely transmitting authentication credentials (such as user tokens) between the client (usually a web browser) and the server */
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data!" });
    }
  } catch (error) {
    console.log("Error in sign up controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in sign in controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
