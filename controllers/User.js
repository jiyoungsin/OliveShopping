/*********************USER ROUTES***************************/
// const bcrypt = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Users = require('../model/schema');
const Cloths = require('../model/clothes');
const { check, validationResult } = require('express-validator');

router.use(express.static("public"));
require("dotenv").config({path:'./config/keys.env'});

// const expressSession = require('express-session');
let user = {};
const productModel = require("../model/product");
const bestSellersModel = require("../model/bestSellers");
const productCat = require("../model/productCategory");


// ---------------- Employee Login -------------------
// implemented but not used.
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
    Cloths.find(function(err,docs){ 
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

// ---------------- Profile --------------------------
router.get("/profile",(req,res)=>
{
    res.render("User/profile",{
        title: "Profile",
        pageHeader: "Profile",
    });
});

module.exports=router;