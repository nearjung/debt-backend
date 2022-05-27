var express = require('express');
var mscustomerfile_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/mscustomerfile/save');
var getController = require('../controller/mscustomerfile/get');

/** route */
mscustomerfile_route.get('/findAll', getController.findAll);
mscustomerfile_route.get('/findByPk', getController.findByPk);
mscustomerfile_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = mscustomerfile_route;