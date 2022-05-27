var express = require('express');
var syuserrole_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/syuserrole/save');
var getController = require('../controller/syuserrole/get');

/** route */
syuserrole_route.get('/findAll', getController.findAll);
syuserrole_route.get('/findByPk', getController.findByPk);
syuserrole_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = syuserrole_route;