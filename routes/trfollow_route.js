var express = require('express');
var trfollow_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trfollow/save');
var getController = require('../controller/trfollow/get');

/** route */
trfollow_route.get('/findAll', getController.findAll);
trfollow_route.get('/findByPk', getController.findByPk);
trfollow_route.get('/findByDebt', getController.findByDebt);
trfollow_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trfollow_route;