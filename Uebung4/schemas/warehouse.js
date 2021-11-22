const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    articleId: Number,
    name: String,
    price: Number
});

const warehouseSchema = new mongoose.Schema({
    id: Number,
    products: [productSchema]
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
