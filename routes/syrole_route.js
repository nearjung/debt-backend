var express = require('express');
var syrole_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/syrole/save');
var getController = require('../controller/syrole/get');

/** route */
syrole_route.get('/findAll', getController.findAll);
syrole_route.get('/findByPk', getController.findByPk);
syrole_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = syrole_route;