const productCat=
{
    fakeProdCat:[],
    init()
    {
        this.fakeProdCat.push({title:'Electronics',description:`Our smallest 13-inch laptops.`,img:`./images/elect.jpg`,price:`1349.99`, href:`/User/userDashboard`});
        this.fakeProdCat.push({title:'Home',description:`Powerhouse performance. `,img:`./images/houseAcc.jpg`,price:`1749.99`, href:`/User/userDashboard`});
        this.fakeProdCat.push({title:'Clothes',description:`XPS 17 is designed to keep your baby entertained.`,img:`./images/tShirt.jpg`,price:`1949.99`, href:`/User/userDashboard`});
        this.fakeProdCat.push({title:'Accessories',description:`tools is designed to keep you active`,img:`./images/Accessories.jpg`,price:`1949.99`, href:`/User/userDashboard`});
    },
    getAllProducts()
    {
        return this.fakeProdCat;
    }
}
productCat.init();
module.exports=productCat;