var express = require('express');
var msprovinces_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/msprovinces/save');
var getController = require('../controller/msprovinces/get');

/** route */
msprovinces_route.get('/findAll', getController.findAll);
msprovinces_route.get('/findByPk', getController.findByPk);
msprovinces_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = msprovinces_route;