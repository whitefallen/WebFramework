const express = require('express');
const router = express.Router();
const Warehouse = require('../schemas/warehouse')

/* GET home page. */
router.get('/', function(req, res) {
  let message = req.flash('message');
  Warehouse.find((error, data) => {
    res.render('index', { title: 'Warehouse Managment System', warehouses: data, message });
  })
});

module.exports = router;
