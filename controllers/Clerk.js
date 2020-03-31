
/*********************Task ROUTES***************************/
const express = require('express')
const router = express.Router();
const Product = require('../model/products');
const Cart = require('../model/cart');
const path = require('path');


router.use(express.static("public"));
//Route to direct use to Add Task form
router.get("/add",(req,res)=> {
    res.render("Clerk/taskAddForm");
});

//Route to direct user to edit task form
 // TO DO ... //
/*
router.get();
router.post();
*/


//Route to direct user to the checkout Page
router.get("/checkout",(req,res)=> {
    if(!req.session.cart){ 
        return res.render("Clerk/checkout",{ 
            products : null
        }); 
    };
    let cart = new Cart(req.sessioin.cart);
    res.render("Clerk/checkOut", {
        products:  cart.generateArray(),
        totalPrice: cart.totalPrice,
    });
});

//Route to process user's request when the user wants to submits a Product
router.get('/Upload',(req,res)=>{
    res.render("Clerk/Upload",{
        title: "Upload",
        pageHeader: "Upload",
    });
});

//Route to process user's request and data when the user submits the add Product form
router.post('/Upload',async (req, res) => {
    const { ImagePath, Title, Desc, Price, Category, On_Hand, } = req.body;
    try {
        const product = new Product({ Title: Title, Desc: Desc, Price:Price, Category:Category, On_Hand:On_Hand,});
        const productSaved = await product.save()
        .then((product)=>{
            req.files.img.name = `prod_${product._id}${path.parse(req.files.img.name).ext}`
            req.files.img.mv(`public/uploads/${req.files.img.name}`)
            Product.updateOne({_id: product._id},{
                ImagePath: req.files.img.name,
            })
            .then(()=>{ console.log("Product Created"); })
            .catch(()=>{ console.log("ERR: Product Not Created"); });
        });
        const clothSaved = await product.save();
        res.render("Clerk/Upload",{
            title: "Upload",
            pageHeader: "Upload",
            confirmation: "Upload Successful",
        });
    } catch (err) {
        console.error(err);
    };
});


module.exports=router;