/*********************USER ROUTES***************************/
const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
// const productModel = require("./model/product");
// const bestSellersModel = require("./model/bestSellers");
// const productCat = require("./model/productCategory");
router.use(express.static("public"));

//Route to direct use to Registration form
router.get("/registration",(req,res)=>
{
    //res.render("User/register");
    res.render("User/registration",{
        title: "Customer Registration",
        pageHeader: " ",
    });
});

//Route to process user's request and data when user submits registration form
router.post("/registration",[
    check('fname','First Name Can Not Be NULL').isLength({ min:1}),
    check('fname').exists(),
    check('lname','Last Name Can Not Be NULL').isLength({ min:1}),
    check('lname').exists(),
    check('email','Invaild Email').isEmail(),
    check('email').exists(),
    check('email','Email is Null').isLength({ min:1}),
    check('password','Password must be at least 5 chars long').isLength({ min:5})
    .matches(/\d/).withMessage('Password must contain a number')
  ],(req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("User/registration",{ errors: errors.array() });
    }
    const {fname,lname, email, messageText} = req.body;
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(`${process.env.SG_KEY_EMAIL}`);
    const msg = {
        to: `jiyoungsin97@gmail.com`,
        from: `${email}`,
        subject: `Contact-Us Email`,
        html:
        `
        Vistor's Full Name: ${fname} ${lname}
        Vistor's Email Address: ${fname}
        Vistor's message: ${messageText}
        `,
    }
    sgMail.send(msg)
    .then(()=>{
        res.redirect("/");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    });
});


//Route to direct user to the login form
router.get("/login",(req,res)=>
{
    res.render("User/login",{
        title: "Login",
        pageHeader: "Login",
    });
});

//Route to process user's request and data when user submits login form
router.post("/login",[
    check('email','Invalid Email').isLength({ min:1}),
    check('password','Invaild Password').isLength({ min:1})
  ],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("/User/login",{ errors: errors.array() });
    }
    return res.render("/");
});


router.get("/logout",(req,res)=>{
    res.redirect("/User/login");
});

//Route the user to their dashboard 
router.get("/dashboard",(req,res)=>
{
    res.render("User/userDashboard");
});


module.exports=router;