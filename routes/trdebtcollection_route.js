var express = require('express');
var trdebtcollection_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/trdebtcollection/save');
var getController = require('../controller/trdebtcollection/get');

/** route */
trdebtcollection_route.get('/findAll', getController.findAll);
trdebtcollection_route.get('/findByPk', getController.findByPk);
trdebtcollection_route.get('/findAllTrace', getController.findAllTrace);
trdebtcollection_route.get('/findByStatus', getController.findByStatus);
trdebtcollection_route.get('/findMyTrace', getController.findMyTrace);
trdebtcollection_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = trdebtcollection_route;