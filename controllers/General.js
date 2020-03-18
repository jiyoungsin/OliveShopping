const express = require('express')
const router = express.Router();
//const productModel = require("./model/product");
const bestSellersModel = require("../model/bestSellers");
const productCat = require("../model/productCategory");
router.use(express.static("public"));


const Product = require('../model/prod');

/*GENERAL ROUTES*/

//Route to direct user to home page
router.get("/",(req,res)=>
{
    res.render("General/index",{
        title: "Home",
        pageHeader: "Home",
        productCat : productCat.getAllProducts(),
        productsBestSeller:bestSellersModel.getAllProducts(),
    });
});


//Route to direct user to about us page
router.get("/about",(req,res)=>
{
    res.render("General/about");
});

module.exports=router;