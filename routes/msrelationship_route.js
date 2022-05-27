var express = require('express');
var msrelationship_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/msrelationship/save');
var getController = require('../controller/msrelationship/get');

/** route */
msrelationship_route.get('/findAll', getController.findAll);
msrelationship_route.get('/findByPk', getController.findByPk);
msrelationship_route.get('/findByCustomerIdCard', getController.findByCustomerIdCard);
msrelationship_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = msrelationship_route;