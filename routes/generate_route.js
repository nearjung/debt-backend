var express = require('express');
var generate_router = express.Router();
var cors = require('cors');

/** controller */
var userControllerGet = require('../controller/model-generator/generate');

/** route */
generate_router.get('/generateComponent', userControllerGet.generateComponent);
generate_router.get('/generateModel', userControllerGet.generateModel);
generate_router.get('/generateModelClient', userControllerGet.generateModelClient);
generate_router.get('/generateServiceClient', userControllerGet.generateServiceClient);

module.exports = generate_router;