/**
 * This JavaScript code snippet is using the `jsonwebtoken` library to generate a JSON Web Token (JWT) and set it as a cookie in an HTTP response. Here's how it works:

1. **Importing jwt**: The code starts by importing the `jsonwebtoken` library. This library is commonly used to generate and verify JWTs in Node.js applications.

2. **generateTokenAndSetCookie function**: This function takes two parameters:
   - `userId`: This is the identifier for the user for whom the JWT is being generated.
   - `res`: This is the HTTP response object.

3. **JWT Generation**:
   - `jwt.sign`: This function generates a new JWT using the provided payload (`{ userId }`), a secret key (`process.env.JWT_SECRET`), and options (`{ expiresIn: "15d" }`).
     - `{ userId }`: This is the payload of the JWT, typically containing user information. In this case, it's the `userId`.
     - `process.env.JWT_SECRET`: This is the secret key used to sign the JWT. It's important to keep this key secret and not expose it in your codebase.
     - `{ expiresIn: "15d" }`: This specifies that the JWT will expire in 15 days.

4. **Setting Cookie**:
   - `res.cookie`: This method is used to set a cookie in the HTTP response.
     - `"jwt"`: This is the name of the cookie.
     - `token`: This is the JWT generated earlier.
     - `maxAge: 15 * 24 * 60 * 60 * 1000`: This sets the expiration time of the cookie in milliseconds, which is calculated to be 15 days.
     - `httpOnly: true`: This option ensures that the cookie is only accessible through HTTP(S) requests and cannot be accessed by JavaScript on the client side, helping to prevent XSS attacks (cross-site scripting attacks).
     - `sameSite: "strict"`: This option sets the SameSite attribute of the cookie to "strict," which provides protection against CSRF attacks (cross-site request forgery attacks) by ensuring that the cookie is only sent in first-party context.

5. **Exporting the function**:
   - `export default generateTokenAndSetCookie;`: This line exports the `generateTokenAndSetCookie` function, making it available for use in other parts of the codebase.

Overall, this code generates a JWT with a 15-day expiration time, signs it with a secret key, and sets it as an HTTP-only cookie with strict SameSite policy in the HTTP response. This is a common pattern used for authentication and session management in web applications.
 */
import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // Converting into milliseconds
    httpOnly: true, // Prevents XSS attacks cross-sites scripting attacks
    sameSite: "strict", //CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
