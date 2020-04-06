/*********************USER ROUTES***************************/
// const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('../model/schema');
const Product = require('../model/products');
const { check, validationResult } = require('express-validator');

router.use(express.static("public"));
require("dotenv").config({path:'./config/keys.env'});

// ---------------- Employee Login -------------------
// implemented but not used.
router.get("/employeeLogin",(req,res)=> {
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
    req.session.destroy();
    res.redirect("/Registration/login");
});

//Route the user to their dashboard 
router.get("/userDashboard",(req,res)=>{
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        let ItemsInRow = 3;
        for(let i=0; i< docs.length; i += ItemsInRow){
            rowNeeded.push(docs.slice(i, i + ItemsInRow)); 
        }
        res.render("User/userDashboard",{
            title: "Home",
            pageHeader: "Home",
            cloths: rowNeeded,
        });
    });
});

router.get("/pantsDashboard",(req,res)=>{
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        let ItemsInRow = 3;
        for(let i=0; i< docs.length; i++){
            if(docs[i].Category === 'PANTS'){
                rowNeeded.push(docs[i]); 
            };
        }
        res.render("User/bestSellerDashboard",{
            title: "Home",
            pageHeader: "Home",
            cloths: rowNeeded,
        });
    });
});

router.get("/shirtDashboard",(req,res)=>{
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        let ItemsInRow = 3;
        for(let i=0; i< docs.length; i++){
            if(docs[i].Category === 'SHIRTS'){
                rowNeeded.push(docs[i]); 
            };
        }
        res.render("User/bestSellerDashboard",{
            title: "Home",
            pageHeader: "Home",
            cloths: rowNeeded,
        });
    });
});
// Route the user to the bestseller dashboard
router.get("/bestSellerDashboard",(req,res)=>{
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        for( i=0; i< docs.length; i++){
            if(docs[i].Bestseller){
                rowNeeded.push(docs[i]);
            }
        }
        res.render("User/bestSellerDashboard",{
            title: "Best Sellers",
            pageHeader: "Best Sellers",
            cloths: rowNeeded,
        });
    });
});
// route for when the user want to see female shirts
router.get("/wshirtDashboard",(req,res)=>{
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        let ItemsInRow = 3;
        for(let i=0; i< docs.length; i++){
            if(docs[i].Category === 'WSHIRTS'){
                rowNeeded.push(docs[i]); 
            };
        }
        res.render("User/bestSellerDashboard",{
            title: "Home",
            pageHeader: "Home",
            cloths: rowNeeded,
        });
    });
});
// route for when the user wants to see female pants.
router.get("/wpantsDashboard",(req,res)=>{
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        let ItemsInRow = 3;
        for(let i=0; i< docs.length; i++){
            if(docs[i].Category === 'WPANTS'){
                rowNeeded.push(docs[i]); 
            };
        }
        res.render("User/bestSellerDashboard",{
            title: "Home",
            pageHeader: "Home",
            cloths: rowNeeded,
        });
    });
});
// route for all the shoes
router.get("/shoesDashboard",(req,res)=>{
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        let ItemsInRow = 3;
        for(let i=0; i< docs.length; i++){
            if(docs[i].Category === 'SHOES'){
                rowNeeded.push(docs[i]); 
            };
        }
        res.render("User/bestSellerDashboard",{
            title: "Home",
            pageHeader: "Home",
            cloths: rowNeeded,
        });
    });
});
// ---------------- Profile --------------------------
router.get("/profile",(req,res)=>{
    Users.find(function(err,docs){ 
        let x = {};
        x= docs[0];
        res.render("User/profile",{
            title: "Profile",
            pageHeader: "Profile",
            user: x,
        });
    });
});

router.post("/profile",(req,res)=>
{
    res.render("User/profile",{
        title: "Profile",
        pageHeader: "Profile",
    });
});


router.post("/UpdateProfile",(req,res)=>
{
    console.log();
    console.log(req.files.img.name);
    console.log(req.files.img.mimetype);
    if(req.files.img.mimetype == "image/jpeg"){
        console.log(req.files.img.mimetype == "image/jpeg");
    }
    /* 
    req.files.img.name = `${user._id}${path.parse(req.files.img.name).ext}`
            req.files.img.mv(`public/uploads/${req.files.img.name}`)
            Users.updateOne({_id: user._id},{
                ProfilePic: req.files.img.name,
            })
            .then(()=>{ console.log("UDATED PROFILE PICTURE"); })
            .catch(()=>{ console.log("DIDN'T UPDATE PROFILE PICTURE."); });
     */
    //if(jpgs,gifs,pngs)
});

module.exports=router;