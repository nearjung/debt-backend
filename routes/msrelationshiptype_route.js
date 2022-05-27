var express = require('express');
var msrelationshiptype_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/msrelationshiptype/save');
var getController = require('../controller/msrelationshiptype/get');

/** route */
msrelationshiptype_route.get('/findAll', getController.findAll);
msrelationshiptype_route.get('/findByPk', getController.findByPk);
msrelationshiptype_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = msrelationshiptype_route;