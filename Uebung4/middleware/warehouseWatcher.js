const Warehouse = require('../schemas/warehouse')
exports.warehouseWatcher = async function(req, res, next) {
    let warehouseId = req.params.id;
    let warehouse = await Warehouse.findOne({id: warehouseId});
    if(warehouse.products.length >= 5) {
        //res.status(500).send({message: 'warehouse is full'})
        req.flash('message', 'Warehouse is full');
    } else if(warehouse.products.length === 0 ) {
        req.flash('message', 'Warehouse is empty');
    }
    next();
}
