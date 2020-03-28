const bcrypt = require('bcrypt');
const express = require('express')
const mongoose = require('mongoose');
const Users = require('../model/schema');
const fileUpload = require('express-fileupload');
const path = require('path');
const { check, validationResult } = require('express-validator');

const router = express.Router();
router.use(express.static("public"));
router.use(fileUpload());
require("dotenv").config({path:'./config/keys.env'});
let user = {};
const bestSellersModel = require("../model/bestSellers");
const productCat = require("../model/productCategory");
const saltRounds = 10;

// ---------------- Regular User Registration -------------------

router.get("/registration",(req,res)=>
{
    res.render("Registration/registration",{
        title: "Customer Registration",
        pageHeader: "Registration",
    });
});

router.post('/registration',[
    check('fname','First Name Can Not Be NULL').isLength({ min:1}),
    check('fname').exists(),
    check('lname','Last Name Can Not Be NULL').isLength({ min:1}),
    check('lname').exists(),
    check('email','Invaild Email').isEmail(),
    check('email').exists(),
    check('email','Email is Null').isLength({ min:1}),
    check('password','Password must be at least 5 chars long').isLength({ min:5})
    .matches(/\d/).withMessage('Password must contain a number')
  ],async (req, res, next) => {
    const {
        fname,
        lname,
        email,
        userName,
        password,
        gender,
    } = req.body;
    const errors = validationResult(req);
    // if there is a error send the error
    if (!errors.isEmpty()) {
        return res.render("Registration/registration",{ errors: errors.array() });
    }
    try {
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, function(err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        })
        
        const user = new Users({
            FirstName:fname,
            LastName:lname,
            Email:email,
            Username:userName,
            Psw:hashedPassword,
            Gender:gender,
        });

        const userSaved = await user.save()
        .then((user)=>{
            console.log("SADASDA");
            let x = req.files.proPic.name;
            console.log(x);

            req.files.proPic.name = `${user._id}${req.files.proPic.name}${path.parse(req.files.proPic.name).ext}`;
            req.files.proPic.mv(`public/uploads/${req.files.proPic.name}`);
            Users.updateOne({_id:user._id},{
                ProfilePic: req.files.proPic.name,
            }); 
        });
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.MY_SENDGRID_KEY);
        msg = {
            to: `${email}`,
            from: 'jiyoungsin97@gmail.com',
            subject: 'You Have Successfully Signed Up ',
            text: `Hello ${fname}`,
            html: `<strong>Welecome to OliveShopping.</strong>`,
        };
        await sgMail.send(msg)
        res.render("Registration/login",{
            title: "Login",
            pageHeader: "Login",
        });
    } catch (err) {
        console.error(err);
    };
});
// ----------------Regular People Log in -----------------------------
//Route to direct user to the login form
router.get("/login",(req,res)=>
{
    if(!req.session.viewCount){
        req.session.viewCount = 1;
    }else{
        req.session.viewCount += 1;
    }
    res.render("Registration/login",{
        title: "Login",
        pageHeader: "Login",
        viewCount : req.session.viewCount,
    });
});

//Route to process user's request and data when user submits login form
router.post("/login",[
    check('userName','Invalid Username').isLength({ min:1}),
    check('password','Invaild Password').isLength({ min:1})
  ], async (req, res) => {
    const errorss = [];
    let userNom = req.body.userName;
    let pwd = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("Registration/login",{ errors: errors.array() });
    }
    try{
        
        user = await Users.findOne({ Username:userNom }, function (err, user) {});
        const unhashedPassword = await bcrypt.compareSync(pwd, user.Psw); 
        // returns true if the unhashed password matches the Password given in the form

        if(user.Employee){
            console.log("you are an employee!");
            res.render('Task/empLogin',{
                Greetings : `Hi, ${user.FirstName}`,
                title: "EmpLogin",
                pageHeader: "EmpLogin", 
            });
        }
        else{
            console.log("you are a customer")
            if(user ===  null){
                res.render("Registration/login",{
                    title: "Login",
                    pageheading: "Login",
                    errorz: "Invaild Username Or Password",
                });
            }
            else if(!unhashedPassword){
                res.render('Registration/login',{
                    title: "Login",
                    pageheading: "Login",
                    errorz: "Invaild Username Or Password",
                });
            }else{
                res.render('General/index',{
                Greetings : `Hi, ${user.FirstName}`,
                title: "Home",
                pageHeader: "Home", 
                errors: errors.array(),
                productCat : productCat.getAllProducts(),
                productsBestSeller:bestSellersModel.getAllProducts(),
                });
            };
        }
    }catch (err){
        console.log(err);
    }
});





module.exports=router;