const User = require("../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = class UserApi {
  static async userSignup(req, res) {
    console.log("in signup");
    try {
      const { firstName, lastName, email, password } = req.body;

      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
          message: "Please fill all the fields",
        });
      }
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        res.status(409).json({ message: "User already exists" });
      }else{
        let encryptedPassword = await bcrypt.hash(password, 10);
        console.log("+1111111", encryptedPassword)
        let obj = {
          firstName,
          lastName,
          email: email.toLowerCase(),
          password: encryptedPassword,
        };  
        console.log("obj",obj)
        const user = await User.create(obj);
        console.log("user",user)  
        const token = jwt.sign({id:user._id,email  }, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });
          console.log("TOken", token)
        user.token = token
        console.log("After user token", user)
          
      res
        .status(201)
        .json({ message: "User created successfully", user, success: true });
      }

      
    } catch (err) {
      console.log("in signup catch block", err);
      res.status(500).send({ message: err });
    }
  }

  static async loginUser(req, res) {
    console.log("in login route", req.body)
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ email:email.toLowerCase() }).maxTimeMS(20000);
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        console.log("after login",user);
        // user
        res.json({message: "login success",user});
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  }
};
