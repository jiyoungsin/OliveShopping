const bcrypt = require('bcrypt');
const express = require('express')
const mongoose = require('mongoose');
const session = require('express-session');
const Users = require('../model/schema');
const { check, validationResult } = require('express-validator');
const MongoStore = require('connect-mongo')(session);

const router = express.Router();
router.use(express.static("public"));
require("dotenv").config({path:'./config/keys.env'});
let user = {};
const productModel = require("../model/product");
const bestSellersModel = require("../model/bestSellers");
const productCat = require("../model/productCategory");
router.use(session({
    secret: 'secret-key', 
    resave: false,
    saveUninitalized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    cookie: { maxAge: 180 * 60 * 1000 },
}))
app.use((req,res,next) => { 
    res.locals.session = req.session;
    next();
});

const saltRounds = 10;

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log(`Connected to MongoDB`);})
.catch(err=>console.log(`Error: ${err}`));

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

        const userSaved = await user.save();
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