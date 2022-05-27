var express = require('express');
var msdebtstatus_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/msdebtstatus/save');
var getController = require('../controller/msdebtstatus/get');

/** route */
msdebtstatus_route.get('/findAll', getController.findAll);
msdebtstatus_route.get('/findByPk', getController.findByPk);
msdebtstatus_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = msdebtstatus_route;