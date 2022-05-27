var express = require('express');
var trproperty_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trproperty/save');
var getController = require('../controller/trproperty/get');

/** route */
trproperty_route.get('/findAll', getController.findAll);
trproperty_route.get('/findByPk', getController.findByPk);
trproperty_route.get('/findByDebt', getController.findByDebt);
trproperty_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trproperty_route;