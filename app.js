const express= require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");


//This loads all our environment variables from the keys.env
require("dotenv").config({path:'./config/keys.env'});

//import your router objects
const userRoutes = require("./controllers/User");
const taskRoutes = require("./controllers/Task");
const generalRoutes = require("./controllers/General");

//creation of app object
const app = express();

//bodyParser middleware
app.use(bodyParser.urlencoded({extended:false}));


//express static middleware
app.use(express.static("public"));

//Handlebars middlware
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");


//MAPs EXPRESS TO ALL OUR  ROUTER OBJECTS
// mapping the generalRoutes route.
app.use("/",generalRoutes);
// mapping the userRoutes route.
app.use("/user",userRoutes);
// mapping the taskRoutes route
app.use("/task",taskRoutes);
// Mapping an error page route as a catch case.
app.use("/",(req,res)=>{
    res.render("General/404");
});


// Port is using the env key or 3000.
const PORT = process.env.PORT;
//Creates an Express Web Server that listens for incomin HTTP Requests
app.listen(PORT,()=>{
    console.log(`Web Server online at ${PORT}`);
});



