/*********************USER ROUTES***************************/
// const bcrypt = require('bcrypt');
const path = require('path');
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
// implemented but not used.
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
// terminates the current session
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

// Route the user to the dashboard with the desired Product type.
router.get("/userDashboard/:productType",(req,res)=>{
    let prodType = req.params.productType;
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        let ItemsInRow = 3;
        for(let i=0; i< docs.length; i++){
            if(docs[i].Category === prodType){
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
        let user = req.session.userInfo;
        x= docs[0];
        res.render("User/profile",{
            title: "Profile",
            pageHeader: "Profile",
            user: user,
        });
    });
});

router.post("/profile",(req,res)=>{
    res.render("User/profile",{
        title: "Profile",
        pageHeader: "Profile",
    });
});


router.post("/UpdateProfile",(req,res)=> {
    if(req.files.img.mimetype == "image/jpeg"){
        console.log(req.files.img.mimetype == "image/jpeg");
    }
    let user = req.session.userInfo;
     
    req.files.img.name = `ProfilePic_${user._id}${path.parse(req.files.img.name).ext}`
    req.files.img.mv(`public/uploads/${req.files.img.name}`)
    Users.updateOne({_id: user._id},{
        ProfilePic: req.files.img.name,
    })
    .then(()=>{ console.log("UDATED PROFILE PICTURE"); })
    .catch(()=>{ console.log("DIDN'T UPDATE PROFILE PICTURE."); });
    //if(jpgs,gifs,pngs)
    res.render("User/profile",{
        title: "Profile",
        pageHeader: "Profile",
        message: "UDATED PROFILE PICTURE",
    });
});

module.exports=router;