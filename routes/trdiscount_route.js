var express = require('express');
var trdiscount_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trdiscount/save');
var getController = require('../controller/trdiscount/get');

/** route */
trdiscount_route.get('/findAll', getController.findAll);
trdiscount_route.get('/findByPk', getController.findByPk);
trdiscount_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trdiscount_route;