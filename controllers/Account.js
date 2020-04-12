const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express')
const mongoose = require('mongoose');
const Users = require('../model/schema');
const { check, validationResult } = require('express-validator');

const router = express.Router();
router.use(express.static("public"));
require("dotenv").config({path:'./config/keys.env'});
let user = {};
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
  ],async (req, res) => {
    const { fname, lname, email, userName, password, gender, } = req.body;
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
            FirstName:(fname.toLowerCase()),
            LastName:(lname.toLowerCase()),
            Email:(email.toLowerCase()),
            Username:(userName.toLowerCase()),
            Psw:hashedPassword,
            Gender:gender,
        });

        const userSaved = await user.save()
        .then((user)=>{
            req.files.img.name = `${user._id}${path.parse(req.files.img.name).ext}`
            req.files.img.mv(`public/uploads/${req.files.img.name}`)
            Users.updateOne({_id: user._id},{
                ProfilePic: req.files.img.name,
            })
            .then(()=>{ console.log("UDATED PROFILE PICTURE"); })
            .catch(()=>{ console.log("DIDN'T UPDATE PROFILE PICTURE."); });
        });
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID);
        msg = {
            to: `${email}`,
            from: 'jiyoungsin97@gmail.com',
            subject: 'Welcome To OliveShoppnig',
            text: `Hello ${fname}`,
            html: `<strong>Thank you for signing up at OliveShopping ${fname}.</strong>`,
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
router.get("/login",(req,res)=>{
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
        user = await Users.findOne({ Username:(userNom.toLowerCase()) }, function (err, user) {});
        const unhashedPassword = await bcrypt.compareSync(pwd, user.Psw); 
        // returns true if the unhashed password matches the Password given in the form

        if(user.Employee){
            req.session.userInfo = user;
            res.render('Clerk/empLogin',{
                Greetings : `Hi, ${user.FirstName}`,
                title: "EmpLogin",
                pageHeader: "EmpLogin", 
            });
        }
        else{
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
                req.session.userInfo = user;
                res.render('General/index',{
                Greetings : `Welcome to OliveShopping, ${user.FirstName}`,
                title: "Home",
                pageHeader: "Home", 
                errors: errors.array(),
                });
            };
        };
    }catch (err){
        console.log(err);
    }
});




module.exports=router;