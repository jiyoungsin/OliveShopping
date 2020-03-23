module.export = function Cart(oldCart){
    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalCost = oldCart.totalCost;
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

};