const Warehouse = require('./schemas/warehouse');

let initWarehouses = () => {
    Warehouse.find((error, data) => {
        let index = 0;
        if(data[data.length-1]) {
            index = data[data.length-1].id
        }
        index++;
        for(let i = index; i <= 6; i++) {
            let newWarehouse = new Warehouse({
                id: i,
            })
            newWarehouse.save();
        }
    });
}



module.exports = {
    create: initWarehouses
}
