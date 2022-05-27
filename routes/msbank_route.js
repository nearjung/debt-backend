var express = require('express');
var msbank_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/msbank/save');
var getController = require('../controller/msbank/get');

/** route */
msbank_route.get('/findAll', getController.findAll);
msbank_route.get('/findByPk', getController.findByPk);
msbank_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = msbank_route;