
/*********************Task ROUTES***************************/
const express = require('express')
const router = express.Router();
const Product = require('../model/products');
const Cart = require('../model/cart');

router.use(express.static("public"));
//Route to direct use to Add Task form
router.get("/add",(req,res)=> {
    res.render("Task/taskAddForm");
});

//Route to process user's request and data when the user submits the add task form
router.post("/add",(req,res)=> {
   
  
});

////Route to fetch all tasks
router.get("/list",(req,res)=> {
    res.render("Task/taskdashboard");
});

//Route to direct user to the task profile page
router.get("/description/",(req,res)=>{

   
})


//Route to direct user to edit task form
router.get("/checkout",(req,res)=> {
    if(!req.session.cart){ 
        return res.render("Task/checkout",{ 
            products : null
        }); 
    };
    let cart = new Cart(req.sessioin.cart);
    res.render("Task/checkOut", {
        products:  cart.generateArray(),
        totalPrice: cart.totalPrice,
    });
});

router.get('/uploadCloth',(req,res)=>{
    res.render("Task/uploadCloth",{
        title: "Upload",
        pageHeader: "Upload",
    });
});

router.post('/uploadCloth',async (req, res) => {
    const { ImagePath, Title, Desc, Price, Category, On_Hand, } = req.body;
    try {
        const product = new Product({ ImagePath: ImagePath, Title: Title, Desc: Desc, Price:Price, Category:Category, On_Hand:On_Hand,});
        const clothSaved = await product.save();
        // try this...
        res.render("Task/uploadCloth",{
            title: "Upload",
            pageHeader: "Upload",
        });
        // res.render("General/index",{
        //     title: "Home",
        //     pageHeader: "Home",
        // });
    } catch (err) {
        console.error(err);
    };
});


module.exports=router;