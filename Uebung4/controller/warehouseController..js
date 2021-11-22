const Warehouse = require('../schemas/warehouse')

const findWarehouse = async (warehouseId) => {
    return Warehouse.findOne({id: warehouseId});
}

exports.warehouse_add_product = async function (req, res) {
    const warehouseId = req.params.id
    let warehouse = await findWarehouse(warehouseId);
    let message = req.flash('message');
    if(warehouse.products.length >= 5) {
        //res.status(500).send({message: 'warehouse is full'})
        res.render('product/addProduct', {warehouseId, message})
    } else {
        if(req.body.name && req.body.price && req.body.articleId) {
            let newProduct = {name: req.body.name, price: req.body.price, articleId: req.body.articleId};
            warehouse.products.push(newProduct);
            warehouse.save();
            //res.status(200).send({message: 'product saved in warehouse', warehouse: warehouse});
            res.redirect('/')
        }
    }
}

exports.warehouse_delete_product = async function (req, res) {
    const warehouseId = req.params.id
    const productId = req.params.product;
    let warehouse = await findWarehouse(warehouseId);
    let foundProduct = warehouse.products.find((product) => {
        return product._id == productId;
    })
    if(foundProduct) {
        warehouse.products.pull(productId);
    } else {
        req.flash('message', 'Product not found')
    }
    warehouse.save();
    res.redirect('/')
}

exports.warehouse_detail_product =  async function (req, res) {
    const warehouseId = req.params.id
    const productId = req.params.product;
    let warehouse = await findWarehouse(warehouseId);
    let product = await warehouse.findOne({'_id': productId});
    res.render('product/detailProduct', {product, warehouseId})
}

exports.warehouse_list_product =  async function (req, res) {
    let message = req.flash('message');
    const warehouseId = req.params.id
    let warehouse = await findWarehouse(warehouseId);
    res.render('product/detailProduct', {warehouse:warehouse, warehouseId, message})
}

exports.warehouse_add_product_view = async function (req, res) {
    let message = req.flash('message');
    const warehouseId = req.params.id;
    res.render('product/addProduct', {warehouseId, message})
}
