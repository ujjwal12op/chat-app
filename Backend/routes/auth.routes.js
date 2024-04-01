import express from "express"
const router = express.Router();
// We dont want to messup everything inside the same folder , that is why we will make the controllers
// folder , there we will update the routes.
// so import the auth.controller.js file also.
/**
 * 
In JavaScript, when you import named exports from a module using the import statement, you enclose the specific names of the exports within curly braces {}. This syntax is used to indicate that you want to import only those named exports from the module, rather than importing the entire module.
 */ 
import {signup} from '../controllers/auth.controller.js'
import {login} from '../controllers/auth.controller.js'
import {logout} from '../controllers/auth.controller.js'

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);


export default router;