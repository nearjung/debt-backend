var express = require('express');
var trscan_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trscan/save');
var getController = require('../controller/trscan/get');

/** route */
trscan_route.get('/findAll', getController.findAll);
trscan_route.get('/findByPk', getController.findByPk);
trscan_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trscan_route;