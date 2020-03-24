module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalCost = oldCart.totalCost || 0;
    this.add = function(item, id){
        let existItem = this.items[id];
        if(!existItem){
            existItem = this.items[id] = {
                item: item,
                qty: 1,
                price: 0,
            }
        }
        existItem.qty++;
        existItem.price = existItem.item.price * existItem.qty;
        this.totalQty++;
        this.totalCost += existItem.price;

    };
    this.generateArray = () =>{
        let arr  = {};
        for( let id in this.items){ 
            arr.push(this.items[id]); 
        };
        return arr;
    }
};


