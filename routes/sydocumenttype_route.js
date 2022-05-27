var express = require('express');
var sydocumenttype_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/sydocumenttype/save');
var getController = require('../controller/sydocumenttype/get');

/** route */
sydocumenttype_route.get('/findAll', getController.findAll);
sydocumenttype_route.get('/findByPk', getController.findByPk);
sydocumenttype_route.get('/findByStatus', getController.findByStatus);
sydocumenttype_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = sydocumenttype_route;