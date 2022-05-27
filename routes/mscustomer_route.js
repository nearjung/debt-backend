var express = require('express');
var mscustomer_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/mscustomer/save');
var getController = require('../controller/mscustomer/get');

/** route */
mscustomer_route.get('/findAll', getController.findAll);
mscustomer_route.get('/findByPk', getController.findByPk);
mscustomer_route.get('/findByDebt', getController.findByDebt);
mscustomer_route.get('/findByName', getController.findByName);
mscustomer_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = mscustomer_route;