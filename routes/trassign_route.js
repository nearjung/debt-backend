var express = require('express');
var trassign_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trassign/save');
var getController = require('../controller/trassign/get');

/** route */
trassign_route.get('/findAll', getController.findAll);
trassign_route.get('/findByPk', getController.findByPk);
trassign_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trassign_route;