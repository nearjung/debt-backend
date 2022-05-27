var express = require('express');
var sypropertytype_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/sypropertytype/save');
var getController = require('../controller/sypropertytype/get');

/** route */
sypropertytype_route.get('/findAll', getController.findAll);
sypropertytype_route.get('/findByPk', getController.findByPk);
sypropertytype_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = sypropertytype_route;