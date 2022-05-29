var express = require('express');
var msamphures_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/msamphures/save');
var getController = require('../controller/msamphures/get');

/** route */
msamphures_route.get('/findAll', getController.findAll);
msamphures_route.get('/findByPk', getController.findByPk);
msamphures_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = msamphures_route;