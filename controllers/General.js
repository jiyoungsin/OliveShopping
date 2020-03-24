const express = require('express')
const router = express.Router();
//const productModel = require("./model/product");
const bestSellersModel = require("../model/bestSellers");
const productCat = require("../model/productCategory");
const Cart = require('../model/cart');

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

router.get("/add-to-cart/:id", (req,res,next)=>{
    let prodID = req.params.id;
    let car = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(prodID, function (err,product){
        if(err){
            console.log(err);
            return res.redirect("/");
        };
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(cart);
        res.redirect('/');
    });
});

module.exports=router;