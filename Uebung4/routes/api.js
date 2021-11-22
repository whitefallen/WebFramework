const express = require('express');
const router = express.Router();
const warehouseController = require('../controller/warehouseController.')
const warehouseWatcher = require('../middleware/warehouseWatcher')

router.get('/warehouse/:id/list-products',warehouseWatcher.warehouseWatcher, warehouseController.warehouse_list_product);
router.get('/warehouse/:id/detail-product/:product',warehouseWatcher.warehouseWatcher, warehouseController.warehouse_detail_product);
router.post('/warehouse/:id/add-product', warehouseWatcher.warehouseWatcher, warehouseController.warehouse_add_product)
router.delete('/warehouse/:id/delete-product/:product', warehouseWatcher.warehouseWatcher, warehouseController.warehouse_delete_product)
router.get('/warehouse/:id/delete-product/:product', warehouseWatcher.warehouseWatcher, warehouseController.warehouse_delete_product)
router.get('/warehouse/:id/add-product', warehouseWatcher.warehouseWatcher, warehouseController.warehouse_add_product_view)

module.exports = router;
