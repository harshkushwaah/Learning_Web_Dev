const bcrypt = require('bcrypt')
const User = require("../models/User")
const jwt = require('jsonwebtoken')
require('dotenv').config();

//signup route handler
exports.signup = async (req, res) => {
    // Here we are not validating email, but that is also a step to be considered when using this stuff
    // Actually: Add to To-Do
  
    // As this is a POST call, first we fetch the required data
    const { name, email, password, role } = req.body;
    console.log(req.body);
  
    try {
      // Check if user already exists
      // DB interaction
  
      // Checking if there is an entry in the database with this email,
      // if it gets any entry, it returns the first one amongst them
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }
  
      // If this isn't true, then start the process for new user registration
      // Secure password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashed => ", hashedPassword);
  
      // Now create the user
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });
  
      await user.save();
      console.log("User created successfully!");
  
      res.status(200).json({
        success: true,
        message: "User created successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the user",
      });
    }
  };
  

exports.login = async(req,res) =>{
    try {
        //fetching the data
        const {email, password} = req.body;

        //1st valiadation : 
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "Please fill all the required details"
            })
        }

        //now checking if the given User has already Signed Up or not 

        let user = await User.findOne({email});

        //if not registered 
        if (!user) {
            return res.status(401).json({
                success : false,
                message : "Please Signup First"
            })
        }

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role
        }

        //verify password and generate a JWT Token
        if (await bcrypt.compare(password, user.password)) {
            //passwords matched,
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                {expiresIn : "2h"});
            //token created
            user = user.toObject();
            //Ye Kyu needed hai ? 
            user.token = token;
            //ye user ki field Db se nikaali thi and usmein ek token ki field banakar, ye insert kar diya
            //now we can send this user's data as a cookie, and use it for further authentication

            //but isse toh password bhi chala jayega
            // so we set the password as undefined
            user.password = undefined;
            //***This is only done for our local variable and not in the actual database */

            //creating a cookie and sending it in response
            const options = {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                //the expiration date is 3 days from now, and the time is in ms
                httpOnly : true
                //this means client side se ye cookie access nhi ho payegi
            }

            res.cookie("token", token, options).status(200).json({
                //cookie ka naam "token" rakha hai and uske andar sirf token hi insert kara hai
                success : true,
                token,
                user,
                message : "User Logged in successfully"
            })


        } else {
            //passwords do not match
            res.status(403).json({
                success : false,
                message : "Passwords do not match"
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(300).json({
            success : false,
            message : "Login Failure"
        })       
    }
}