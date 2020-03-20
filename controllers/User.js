/*********************USER ROUTES***************************/

const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('../model/schema');
const { check, validationResult } = require('express-validator');

router.use(express.static("public"));
require("dotenv").config({path:'./config/keys.env'});

// const expressSession = require('express-session');
let user = {};
const productModel = require("../model/product");
const bestSellersModel = require("../model/bestSellers");
const productCat = require("../model/productCategory");

// ------------------Connecting to MongoDB ----------------------

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log(`Connected to MongoDB`);})
.catch(err=>console.log(`Error: ${err}`));

// ---------------- Regular User Registration -------------------

//Route to direct use to Registration form
// router.get("/registration",(req,res)=>
// {
//     res.render("User/registration",{
//         title: "Customer Registration",
//         pageHeader: " ",
//     });
// });
// registration page with validation...
// if valid user input we create an account.
// router.post('/registration',[
//         check('fname','First Name Can Not Be NULL').isLength({ min:1}),
//         check('fname').exists(),
//         check('lname','Last Name Can Not Be NULL').isLength({ min:1}),
//         check('lname').exists(),
//         check('email','Invaild Email').isEmail(),
//         check('email').exists(),
//         check('email','Email is Null').isLength({ min:1}),
//         check('password','Password must be at least 5 chars long').isLength({ min:5})
//         .matches(/\d/).withMessage('Password must contain a number')
//       ],async (req, res, next) => {
//     const {
//         fname,
//         lname,
//         email,
//         userName,
//         password,
//         gender,
//     } = req.body;
//     const errors = validationResult(req);
//     // if there is a error send the error
//     if (!errors.isEmpty()) {
//         return res.render("User/registration",{ errors: errors.array() });
//     }
//     try {
//         const user = new Users({
//             FirstName:fname,
//             LastName:lname,
//             Email:email,
//             Username:userName,
//             Psw:password,
//             Gender:gender,
//         });
//         const userSaved = await user.save();
//         const sgMail = require('@sendgrid/mail');
//         sgMail.setApiKey(process.env.MY_SENDGRID_KEY);
//         msg = {
//             to: `${email}`,
//             from: 'jiyoungsin97@gmail.com',
//             subject: 'You Have Successfully Signed Up ',
//             text: `Hello ${fname}`,
//             html: `<strong>Welecome to OliveShopping.</strong>`,
//         };
//         sgMail.send(msg)
//         .then(()=>{
//             res.render("User/login",{
//                 title: "Login",
//                 pageHeader: "Login",
//             });
//         }).catch(err=>{
//             console.log(`Error ${err}`);
//         });
//     } catch ($e) {
//         console.error("AN ERROR");
//     };
// });
// ----------------Regular People Log in -----------------------------

// //Route to direct user to the login form
// router.get("/login",(req,res)=>
// {
//     res.render("User/login",{
//         title: "Login",
//         pageHeader: "Login",
//     });
// });

//Route to process user's request and data when user submits login form
// router.post("/login",[
//     check('userName','Invalid Username').isLength({ min:1}),
//     check('password','Invaild Password').isLength({ min:1})
//   ], async (req, res) => {
//     const errorss = [];
//     let userNom = req.body.userName;
//     let pwd = req.body.password;

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.render("User/login",{ errors: errors.array() });
//     }
//     try{
//         user = await Users.findOne({ Username:userNom }, function (err, user) {});
//         if(user ===  null){
//             res.render("User/login",{
//                 title: "Login",
//                 pageheading: "Login",
//                 errorz: "Invaild Username Or Password",
//             });
//         }
//         else if(user.Psw !== pwd){
//             res.render('User/login',{
//                 title: "Login",
//                 pageheading: "Login",
//                 errorz: "Invaild Username Or Password",
//             });
//         }
//         else{
//             console.log(user);
//             res.render('General/index',{
//             Greetings : `Hi, ${user.FirstName}`,
//             title: "Home",
//             pageHeader: "Home", 
//             errors: errors.array(),
//             productCat : productCat.getAllProducts(),
//             productsBestSeller:bestSellersModel.getAllProducts(),
//         });
//         }
//     }catch (err){
//         console.log(err);
//     }
// });
// ---------------- Employee Login -------------------
router.get("/employeeLogin",(req,res)=>
{
    res.render("User/employeeLogin",{
        title: "Login",
        pageHeader: "Login",
    });
});

router.post("/employeeLogin",[
    check('email','Invalid Email').isLength({ min:1}),
    check('password','Invaild Password').isLength({ min:1})
  ],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("/User/employeeLogin",{ errors: errors.array() });
    }
    return res.render("/");
});

// ---------------- Log Out --------------------------


router.get("/logout",(req,res)=>{
    res.redirect("/User/login");
});

//Route the user to their dashboard 
router.get("/userDashboard",(req,res)=>
{
    res.render("User/userDashboard",{
        title: "Home",
        pageHeader: "Home", 
        productCat : productCat.getAllProducts(),
        productsBestSeller:bestSellersModel.getAllProducts(),
    });
});

// ---------------- Profile --------------------------


router.get("/profile",(req,res)=>
{
    res.render("User/profile",{
        title: "Profile",
        pageHeader: "Profile",
    });
});



module.exports=router;