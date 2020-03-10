const productCat=
{
    fakeProdCat:[],

    init()
    {
        this.fakeProdCat.push({title:'Electronics',description:`Our smallest 13-inch laptops.`,img:`./images/elect.jpg`,price:`1349.99`, href:`products`});
    
        this.fakeProdCat.push({title:'House Accessories',description:`Powerhouse performance. `,img:`./images/houseAcc.jpg`,price:`1749.99`, href:`/`});
    
        this.fakeProdCat.push({title:'Baby Nursery',description:`XPS 17 is designed to keep your baby entertained.`,img:`./images/baby.jpg`,price:`1949.99`, href:`/`});
        
        this.fakeProdCat.push({title:'Tools',description:`tools is designed to keep you active`,img:`./images/tools.jpg`,price:`1949.99`, href:`/`});
    },
    getAllProducts()
    {
        return this.fakeProdCat;
    }
}

productCat.init();
module.exports=productCat;