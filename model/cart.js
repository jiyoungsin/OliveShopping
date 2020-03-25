module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalCost = oldCart.totalCost || 0;
    
    this.add = function(item, id){
        let existItem = this.items[id];
        if(!existItem){
            existItem = this.items[id] = {
                item: item,
                qty: 0,
                Price: 0,
            }
        }
        existItem.qty++;
        existItem.Price = existItem.item.Price * existItem.qty;
        this.totalQty++;
        this.totalCost += existItem.Price;

    };
    this.generateArray = () =>{
        let arr  = [];
        for( let id in this.items){ 
            arr.push(this.items[id]); 
        };
        return arr;
    }
};


