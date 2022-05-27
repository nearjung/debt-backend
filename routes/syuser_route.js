var express = require('express');
var syuser_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/syuser/save');
var getController = require('../controller/syuser/get');

/** route */
syuser_route.get('/findAll', getController.findAll);
syuser_route.get('/findByPk', getController.findByPk);
syuser_route.post('/login', cors({ origin: true }), getController.login);
syuser_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = syuser_route;