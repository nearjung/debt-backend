var express = require('express');
var trpayment_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trpayment/save');
var getController = require('../controller/trpayment/get');

/** route */
trpayment_route.get('/findAll', getController.findAll);
trpayment_route.get('/findByPk', getController.findByPk);
trpayment_route.get('/findByDebt', getController.findByDebt);
trpayment_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trpayment_route;