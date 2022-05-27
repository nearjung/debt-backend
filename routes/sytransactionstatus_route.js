var express = require('express');
var sytransactionstatus_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/sytransactionstatus/save');
var getController = require('../controller/sytransactionstatus/get');

/** route */
sytransactionstatus_route.get('/findAll', getController.findAll);
sytransactionstatus_route.get('/findByPk', getController.findByPk);
sytransactionstatus_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = sytransactionstatus_route;