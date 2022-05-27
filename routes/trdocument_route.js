var express = require('express');
var trdocument_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trdocument/save');
var getController = require('../controller/trdocument/get');

/** route */
trdocument_route.get('/findAll', getController.findAll);
trdocument_route.get('/findByPk', getController.findByPk);
trdocument_route.get('/findByDebt', getController.findByDebt);
trdocument_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trdocument_route;