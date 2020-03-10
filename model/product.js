const products=
{
    fakeDB:[],

    init()
    {
        this.fakeDB.push({title:'Gaming PC',description:` Intel Core i5-9400f 2.9GHz 6-Core.`,img:`./images/computer.jpg`,price:`1349.99`, href:`#`});
        this.fakeDB.push({title:'VGA Male Cable',description:`DisplayPort Male plug with latch.`,img:`./images/vga2HDMI.jpg`,price:`14.99`, href:`#`});
        this.fakeDB.push({title:'USB 32GB',description:`Transfer a full length movie in less than 30 seconds.`,img:`./images/usb.jpg`,price:`19.99`, href:`#`});
        this.fakeDB.push({title:'Acer 21.5inch',description:`Zero-Frame design | ultra-thin`,img:`./images/monitor.jpg`,price:`139.10`, href:`#`});
        this.fakeDB.push({title:'Gaming Mouse ',description:`High-performance HERO 16K sensor.`,img:`./images/mouse.jpg`,price:`1949.99`, href:`#`});
        this.fakeDB.push({title:'gaming Headset',description:`Designed for everywhere you game.`, href:`#`,img:`./images/headset.jpg`,price:`1949.99`});
    },
    getAllProducts()
    {
        return this.fakeDB;
    }
}

products.init();
module.exports=products;