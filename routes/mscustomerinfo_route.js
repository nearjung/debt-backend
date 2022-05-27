var express = require('express');
var mscustomerinfo_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/mscustomerinfo/save');
var getController = require('../controller/mscustomerinfo/get');

/** route */
mscustomerinfo_route.get('/findAll', getController.findAll);
mscustomerinfo_route.get('/findByPk', getController.findByPk);
mscustomerinfo_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = mscustomerinfo_route;