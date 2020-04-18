const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../model/cart');
const Products = require('../model/products');
const isAdmin = require('../middleware/isAdmin');
const isLoggedIn = require('../middleware/auth');

router.use(express.static("public"));

//Route to direct user to home page
router.get("/",(req,res)=>{
    Products.find(function(err,docs){ 
        let rowNeeded = [];
        for( i=0; i< docs.length; i++){
            if(docs[i].Bestseller){ rowNeeded.push(docs[i]); }
        }
        res.render("General/index",{
            title: "Home",
            pageHeader: "Home",
            cloths: rowNeeded,
        });
    });
});

//Route to direct user add an Item to Cart
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

router.get("/productDesc",(req,res)=> {
    res.render("User/productDesc", {
        title: `Product Desc`,
        pageHeader: "PRODUCT NAME",
    });
});

router.get("/productDesc/:id",(req,res)=> {
    let prodID = req.params.id;
    Products.findById(prodID, function (err,product){
        res.render("User/productDesc", {
            title: `${product.Title}`,
            pageHeader: `${product.Title}`,
            image: `${product.ImagePath}`,
            desc: `${product.Desc}`,
            _id: prodID,
        });
    });
});

router.get('/edit/:id',isAdmin,(req,res)=>{
    let prodID = req.params.id;

    Products.findById(prodID, function (err,product){
        res.render("Clerk/editProduct",{
            title:"Edit A Product",
            Title: `${product.Title}`,
            ImagePath: `${product.ImagePath}`,
            Desc: `${product.Desc}`,
            _id: `${prodID}`,
            Bestseller: `${product.Bestseller}`,
            Price: `${product.Price}`,
            On_Hand : `${product.On_Hand}`,
            Category : `${product.Category}`,
        });
    });
});

router.post('/UpdateItem/:id',isAdmin, (req,res)=>{
    let prodID = req.params.id;
    const { Bestseller,Title,Desc,Price,On_Hand,Category,ImagePath, } = req.body;
    Products.findOneAndUpdate({_id : prodID},{
    //    ImagePath: "",
        Desc: `${Desc}`,
        Title: `${Title}`,
        Price: `${Price}`,
        Category: `${Category}`,
        On_Hand: `${On_Hand}`,
        Bestseller: `${Bestseller}`,
    },function (err,product){
        if (err) {
            res.render("Clerk/editProduct",{
                Title: `${product.Title}`,
                pageHeader: `${product.Title}`,
            //    ImagePath: `${product.ImagePath}`,
                Desc: `${product.Desc}`,
                _id: `${prodID}`,
                Bestseller: `${product.Bestseller}`,
                Price: `${product.Price}`,
                On_Hand : `${product.On_Hand}`,
                Category : `${product.Category}`,
            });
        };
        Products.findById(prodID, function (err,product){
            res.render("Clerk/editProduct",{
                title:"Edit A Product",
                Title: `${product.Title}`,
                pageHeader: `${product.Title}`,
                ImagePath: `${product.ImagePath}`,
                Desc: `${product.Desc}`,
                _id: `${prodID}`,
                Bestseller: `${product.Bestseller}`,
                Price: `${product.Price}`,
                On_Hand : `${product.On_Hand}`,
                Category : `${product.Category}`,
                msg : `UPDATE SUCCESSFUL`,
            });
        });
    });

});


router.get("/checkout",isLoggedIn,(req,res)=> {
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

router.post("/SendConfirmationEmail",isLoggedIn,async(req,res)=> {
    const buyCart = new Cart(req.session.cart);
    let totalCost = req.body.totalCost;
    const arrOfItems = buyCart.generateArray();
    let items = "<br>";
    for(let i=0; i< buyCart.totalQty; i++){
        items +=`${i+1}: ${arrOfItems[i].item.Title}<br>`
    }
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID);
    msg = {
        to: `${req.session.userInfo.Email}`,
        from: 'jiyoungsin97@gmail.com',
        subject: 'Receipt From OliveShoppnig',
        text: `Hello ${req.session.userInfo.FirstName}`,
        html: `<strong>Thank you for your Purchase of: ${items}<br>Your Purchase Amount Was: ${totalCost}.</strong>`,
    };
    await sgMail.send(msg)
    req.session.destroy();
    res.locals.session.destroy();
    res.render("General/thanks4Shopping", {
        title: "Thank You",
        pageHeader: "Thank You",
    });
});

module.exports=router;