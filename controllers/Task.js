
/*********************Task ROUTES***************************/
const express = require('express')
const router = express.Router();
const Cloths = require('../model/clothes');
// const productModel = require("./model/product");
// const bestSellersModel = require("./model/bestSellers");
// const productCat = require("./model/productCategory");
router.use(express.static("public"));
//Route to direct use to Add Task form
router.get("/add",(req,res)=>
{
    res.render("Task/taskAddForm");
});

//Route to process user's request and data when the user submits the add task form
router.post("/add",(req,res)=>
{
   
  
});

////Route to fetch all tasks
router.get("/list",(req,res)=>
{
    res.render("Task/taskdashboard");
});

//Route to direct user to the task profile page
router.get("/description/",(req,res)=>{

   
})


//Route to direct user to edit task form
router.get("/edit/",(req,res)=>
{
   
});

router.get('/uploadCloth',(req,res)=>{
    res.render("Task/uploadCloth");
});

router.post('/uploadCloth',async (req, res, next) => {
    const {
        ImagePath,
        Title,
        Desc,
        Price,
    } = req.body;
    try {
        const cloth = new Cloths({
            ImagePath: ImagePath,
            Title: Title,
            Desc: Desc,
            Price:Price,
        });
        const clothSaved = await cloth.save();
        res.render("Registration/login",{
            title: "Login",
            pageHeader: "Login",
        });
    } catch (err) {
        console.error(err);
    };
});


module.exports=router;