const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
//const bestSellersModel = require("../model/bestSellers");
//const productCat = require("../model/productCategory");
const Products = require('../model/products');
const Cart = require('../model/cart');

router.use(express.static("public"));

// this is needed?
mongoose.createConnection(process.env.URI);
//const Product = require('../model/prod');

//Route to direct user to home page
router.get("/",(req,res)=>{
    Products.find(function(err,docs){ 
        let rowNeeded = [];
        for( i=0; i< docs.length; i++){
            if(docs[i].Bestseller){
                rowNeeded.push(docs[i]);
            }
        }
        res.render("General/index",{
            title: "Home",
            pageHeader: "Home",
            cloths: rowNeeded,
        });
    });
});

//Route to direct user to about us page
router.get("/about",(req,res)=>{
    res.render("General/about");
});

router.get("/add-to-cart/:id", (req,res,next)=>{
    let prodID = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Products.findById(prodID, function (err,product){
        if(err){
            return res.render("General/index",{
                title: "Home",
                pageHeader: "Home",
            });
        };
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect("/User/userDashboard");
    });
});

router.get("/checkout",(req,res)=> {
    if(!req.session.cart){ 
        console.log("NO CART FOUND");
        return res.render("General/checkout",{ 
            products : null,
        }); 
    };
    let cart = new Cart(req.session.cart);
    res.render("General/checkout", {
        title: "Checkout",
        pageHeader: "Checkout",
        products: cart.generateArray(),
        totalCost: cart.totalCost,
    });
});

router.get("/productDesc",(req,res)=> {
    res.render("General/productDesc", {
        title: `Product IDNUM Desc`,
        pageHeader: "PRODUCT NAME",
    });
});

module.exports=router;