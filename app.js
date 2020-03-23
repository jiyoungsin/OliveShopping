const bcrypt = require('bcrypt');
const express= require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const session = require('express-session');
const exphbs = require("express-handlebars");
const MongoStore = require('connect-mongo')(session);

//This loads all our environment variables from the keys.env
require("dotenv").config({path:'./config/keys.env'});

//import your router objects
const userRoutes = require("./controllers/User");
const taskRoutes = require("./controllers/Task");
const accountRoutes = require("./controllers/Account");
const generalRoutes = require("./controllers/General");

//creation of app object
const app = express();

mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log(`Connected to MongoDB`);})
.catch(err=>console.log(`Error: ${err}`));

// creating a connection to mongooseStore.
//store: new MongoStore({ mongooseConnection: mongoose.connection}),

//bodyParser middleware
app.use(bodyParser.urlencoded({extended:false}));



//Handlebars middlware
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");

app.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitalized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 180 * 60 * 1000 },
}))


//express static middleware
app.use(express.static("public"));

app.use((req,res,next) => { 
    //res.locals.login = req.isAuthenticated(),
    res.locals.session = req.session;
    next();
});

//MAPs EXPRESS TO ALL OUR  ROUTER OBJECTS

app.use("/",generalRoutes);  // mapping the generalRoutes route.
app.use("/user",userRoutes); // mapping the userRoutes route.
app.use("/task",taskRoutes); // mapping the taskRoutes route
app.use("/Registration",accountRoutes); // mapping the taskRoutes route

app.use("/",(req,res)=>{
    res.render("General/404");
}); // Mapping an error page route as a catch case.



// Port is using the env key or 3000.
const PORT = process.env.PORT;
// The express server is live on PORT(3000) or deployed on heroku 
app.listen(PORT,()=>{
    console.log(`Web Server online at ${PORT}`);
});



