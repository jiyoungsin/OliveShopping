
/*********************Task ROUTES***************************/
const express = require('express')
const path = require('path');
const router = express.Router();
const Cart = require('../model/cart');
const Product = require('../model/products');
const isAdmin = require('../middleware/isAdmin');

router.use(express.static("public"));
//Route to direct use to Add Task form
router.get("/add",(req,res)=> {
    res.render("Clerk/taskAddForm");
});

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
router.get('/Upload',isAdmin,(req,res)=>{
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
// Edit a Product
router.get('/edit',isAdmin,(req,res)=>{
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        for(let i=0; i< docs.length; i++){
                rowNeeded.push(docs[i]); 
        }
        res.render("Clerk/Edit",{
            title: "Edit Product",
            pageHeader: "Edit Product",
            cloths: rowNeeded,
        });
    });
});


router.get("/edit/:productType",isAdmin,(req,res)=>{
    let prodType = req.params.productType;
    Product.find(function(err,docs){ 
        let rowNeeded = [];
        let ItemsInRow = 3;
        if(prodType === "BESTSELLERS" ){
            for( i=0; i< docs.length; i++){
                if(docs[i].Bestseller){
                    rowNeeded.push(docs[i]);
                }
            } 
        }else{
            for(let i=0; i< docs.length; i++){
                if(docs[i].Category === prodType){
                    rowNeeded.push(docs[i]); 
                };
            }
        }
        res.render("Clerk/Edit",{
            title: "Edit Product",
            pageHeader: "Edit Product",
            cloths: rowNeeded,
        });
    });
});
router.post("/UpdateProdPic/:id",isAdmin,(req,res)=> {
    if(req.files.img.mimetype == "image/jpeg"){
        console.log(req.files.img.mimetype == "image/jpeg");
    }
    let user = req.session.userInfo;
    let prodID= req.params.id;
    Product.findById(prodID, function (err,products){
    
        req.files.img.name = `prod_${products._id}${path.parse(req.files.img.name).ext}`
        req.files.img.mv(`public/uploads/${req.files.img.name}`)
        Product.updateOne({_id: products._id},{
            ImagePath: req.files.img.name,
        })
        .then(()=>{ 
            console.log("UDATED PRODUCT PICTURE"); 
            Product.find(function(err,docs){ 
            let rowNeeded = [];
            for(let i=0; i< docs.length; i++){
                    rowNeeded.push(docs[i]); 
            }
            res.render("Clerk/Edit",{
                title: "Edit Product",
                pageHeader: "Edit Product",
                cloths: rowNeeded,
            });
        });
    })
    .catch(()=>{ console.log("DIDN'T UPDATE PRODUCT PICTURE."); });
    });
});

module.exports=router;