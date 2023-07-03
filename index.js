const mongoose = require("mongoose")
require('dotenv').config();
mongoose.set('strictQuery', true);
const express = require("express")
const nocache = require('nocache');

const app = express()



const { dbpath } = require('./config/connection');

mongoose.connect(dbpath, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connection is successful');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });





app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());



const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

const forgotPassword = require("./routes/forgotPassword");

app.use("/forgot", forgotPassword);

app.all("*", (req, res) => {
  res.render("error")
})

app.listen(process.env.PORT, function () {
  console.log("server is running at");
});



