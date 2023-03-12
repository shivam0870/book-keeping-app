const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const dbConnect = require("../backend/config/dbConnect");
const User = require("./models/User");
const error = require('./middleware/errorMiddlewareHandlre');
const usersRoute = require("./routes/usersRoute");
const bookRouter = require("./routes/bookRoutes");

dotenv.config();

const app = express();

app.use(express.json());

dbConnect();



app.use("/api/users", usersRoute);
app.use("/api/books" , bookRouter);
// console.log(process.env.MY_NAME);
// console.log(process.env.MY_NAME);  

app.use(error.errorMiddlewareHandler);

const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port number ${PORT}`);
});
