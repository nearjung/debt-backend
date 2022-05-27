var express = require('express');
var trdebtrelation_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trdebtrelation/save');
var getController = require('../controller/trdebtrelation/get');

/** route */
trdebtrelation_route.get('/findAll', getController.findAll);
trdebtrelation_route.get('/findByPk', getController.findByPk);
trdebtrelation_route.get('/checkIfExist', getController.checkIfExist);
trdebtrelation_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trdebtrelation_route;