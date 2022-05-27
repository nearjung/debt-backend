var express = require('express');
var syfollowstatus_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/syfollowstatus/save');
var getController = require('../controller/syfollowstatus/get');

/** route */
syfollowstatus_route.get('/findAll', getController.findAll);
syfollowstatus_route.get('/findByPk', getController.findByPk);
syfollowstatus_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = syfollowstatus_route;