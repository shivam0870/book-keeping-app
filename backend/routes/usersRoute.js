const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const usersRoute = express.Router();

// usersRoute.post('/register', async (req,res) => {
//     try {
//         const {name , email , password} = req.body;
//         const user = await User.create({name,email,password});
//     console.log(user);
//     res.send(user);
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }

// })

usersRoute.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new Error("User Exists");
    }
    const userCreated = await User.create({ name, email, password });

    // res.send(userCreated);
    res.json({
        _id : userCreated._id,
        name : userCreated.name,
        password : userCreated.password,
        email : userCreated.email,
        token : generateToken(userCreated._id),
    })
  })
);

// usersRoute.post("/login", (req, res) => {
//   res.send("This is the login route");
// });

usersRoute.post(
  "/login",
  asyncHandler(async (req, res) => {
    const {email , password} = req.body;
    const user = await User.findOne({email});

if(user && await(user.isPasswordMatch(password))){
    // res.send(user);
    res.status(200);
    res.json({
        _id : user._id,
        name : user.name,
        password : user.password,
        email : user.email,
        token : generateToken(user._id),
    })
}
else{
    // res.send('User Not Found')
    res.status(401);
    throw new Error('Invalid Credentials')
}

  })
);

usersRoute.put("/update", (req, res) => {
  res.send("Update Routes");
});

usersRoute.delete("/:id", (req, res) => {
  res.send("Delete Route");
});

usersRoute.get("/", (req, res) => {
  res.send("Fetch Users");
});

module.exports = usersRoute;
