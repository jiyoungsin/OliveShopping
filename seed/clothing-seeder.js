const mdSeed = require('mongoose-data-seed');
const Clothes = require('../model/clothes');
const Seeder = mdSeed.Seeder;
const cloths = [
    {
        ImagePath: '../images/yshirt.jpg',
        Title: 'Random Image',
        Desc: 'An image of a girl riding unicycle with her dog',
        Price: 10,
    },
    {
        ImagePath: '../images/white.jpg',
        Title: 'Random Image',
        Desc: 'An image of a girl riding unicycle with her dog',
        Price: 10,
    },
    {
        ImagePath: '../images/black.jpg',
        Title: 'Random Image',
        Desc: 'An image of a girl riding unicycle with her dog',
        Price: 10,
    },
    {
        ImagePath: '../images/pablo.jpg',
        Title: 'Random Image',
        Desc: 'An image of a girl riding unicycle with her dog',
        Price: 10,  
    },
    {
        ImagePath: '../images/japan.jpg',
        Title: 'Random Image',
        Desc: 'An image of a girl riding unicycle with her dog',
        Price: 10,
    },
    {
        ImagePath: '../images/yshirt.jpg',
        Title: 'Random Image',
        Desc: 'An image of a girl riding unicycle with her dog',
        Price: 10,
    },
];

class ClothesSeeder extends Seeder {
    async shouldRun() {
        return Clothes.countDocuments()
        .exec()
        .then(count => count === 0);
    }  
    async run() {
        return Clothes.create(cloths);
    }
}
  
module.exports = ClothesSeeder;