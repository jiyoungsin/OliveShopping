const mongoose = require('mongoose');
const Clothes = require('../model/clothes');

mongoose.createConnection(process.env.URI);

let cloths = [
    new Clothes({
    ImagePath: '../images/yshirt.jpg',
    Title: 'Random Image',
    Desc: 'An image of a girl riding unicycle with her dog',
    Price: 10,
}),
new Clothes({
    ImagePath: '../images/white.jpg',
    Title: 'Random Image',
    Desc: 'An image of a girl riding unicycle with her dog',
    Price: 10,
}),
new Clothes({
    ImagePath: '../images/black.jpg',
    Title: 'Random Image',
    Desc: 'An image of a girl riding unicycle with her dog',
    Price: 10,
}),
new Clothes({
    ImagePath: '../images/pablo.jpg',
    Title: 'Random Image',
    Desc: 'An image of a girl riding unicycle with her dog',
    Price: 10,
}),
new Clothes({
    ImagePath: '../images/japan.jpg',
    Title: 'Random Image',
    Desc: 'An image of a girl riding unicycle with her dog',
    Price: 10,
}),
new Clothes({
    ImagePath: '../images/yshirt.jpg',
    Title: 'Random Image',
    Desc: 'An image of a girl riding unicycle with her dog',
    Price: 10,
}),
];
let done = 0;

for(let i=0; i < cloths.length; i++){
   cloths[i].save(function(){
        done++;
        if ( done == products.length){ 
            exit();
        };
   });
};

let exit = ()=>{
mongoose.disconnect();
};