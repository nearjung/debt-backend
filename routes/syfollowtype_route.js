var express = require('express');
var syfollowtype_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/syfollowtype/save');
var getController = require('../controller/syfollowtype/get');

/** route */
syfollowtype_route.get('/findAll', getController.findAll);
syfollowtype_route.get('/findByPk', getController.findByPk);
syfollowtype_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = syfollowtype_route;