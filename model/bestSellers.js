const productsBestSeller=
{
    fakeBestSellers:[],

    init()
    {
        this.fakeBestSellers.push({title:'Laptop',description:`Our smallest 13-inch laptops.`,img:`./images/mouse.jpg`,price:`1349.99`});
        this.fakeBestSellers.push({title:'Monitor',description:`Powerhouse performance with a stunning 4K Ultra HD display. `,img:`./images/mouse.jpg`,price:`1749.99`});
        this.fakeBestSellers.push({title:'Mouse',description:`XPS 17 is designed to keep you entertained.`,img:`./images/mouse.jpg`,price:`1949.99`});
        this.fakeBestSellers.push({title:'XPS 18',description:`XPS 17 is designed to keep you entertained.`,img:`./images/mouse.jpg`,price:`1949.99`});
    },
    getAllProducts()
    {
        return this.fakeBestSellers;
    }
}

productsBestSeller.init();
module.exports = productsBestSeller;