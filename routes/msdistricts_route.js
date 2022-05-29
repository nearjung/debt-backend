var express = require('express');
var msdistricts_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/msdistricts/save');
var getController = require('../controller/msdistricts/get');

/** route */
msdistricts_route.get('/findAll', getController.findAll);
msdistricts_route.get('/findByPk', getController.findByPk);
msdistricts_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = msdistricts_route;