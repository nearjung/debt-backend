var express = require('express');
var trlawsuit_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trlawsuit/save');
var getController = require('../controller/trlawsuit/get');

/** route */
trlawsuit_route.get('/findAll', getController.findAll);
trlawsuit_route.get('/findByPk', getController.findByPk);
trlawsuit_route.get('/findByDebt', getController.findByDebt);
trlawsuit_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trlawsuit_route;