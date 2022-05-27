var express = require('express');
var sysystemconfig_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/sysystemconfig/save');
var getController = require('../controller/sysystemconfig/get');

/** route */
sysystemconfig_route.get('/findAll', getController.findAll);
sysystemconfig_route.get('/findByPk', getController.findByPk);
sysystemconfig_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = sysystemconfig_route;