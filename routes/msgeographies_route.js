var express = require('express');
var msgeographies_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/msgeographies/save');
var getController = require('../controller/msgeographies/get');

/** route */
msgeographies_route.get('/findAll', getController.findAll);
msgeographies_route.get('/findByPk', getController.findByPk);
msgeographies_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = msgeographies_route;