var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect'); // Authentication
const fileupload = require("express-fileupload");
var jwt = require('jsonwebtoken');
const config = require('./configuration/config');

var app = express();
var msdebtstatus_route = require('./routes/msdebtstatus_route');
var syfollowstatus_route = require('./routes/syfollowstatus_route');
var trdocument_route = require('./routes/trdocument_route');
var sydocumenttype_route = require('./routes/sydocumenttype_route');
var syfollowtype_route = require('./routes/syfollowtype_route');
var sypropertytype_route = require('./routes/sypropertytype_route');
var trdebtrelation_route = require('./routes/trdebtrelation_route');
var msbank_route = require('./routes/msbank_route');
var trscan_route = require('./routes/trscan_route');
var trproperty_route = require('./routes/trproperty_route');
var trpayment_route = require('./routes/trpayment_route');
var trlawsuit_route = require('./routes/trlawsuit_route');
var trfollow_route = require('./routes/trfollow_route');
var trdiscount_route = require('./routes/trdiscount_route');
var trdebtcollection_route = require('./routes/trdebtcollection_route');
var trassign_route = require('./routes/trassign_route');
var syuserrole_route = require('./routes/syuserrole_route');
var syuser_route = require('./routes/syuser_route');
var sytransactionstatus_route = require('./routes/sytransactionstatus_route');
var sysystemconfig_route = require('./routes/sysystemconfig_route');
var syrole_route = require('./routes/syrole_route');
var msrelationshiptype_route = require('./routes/msrelationshiptype_route');
var msrelationship_route = require('./routes/msrelationship_route');
var mscustomerinfo_route = require('./routes/mscustomerinfo_route');
var mscustomerfile_route = require('./routes/mscustomerfile_route');
var mscustomer_route = require('./routes/mscustomer_route');
// Routes
var index_route = require('./routes/index_route');
var generate_route = require('./routes/generate_route');



//** Configuration */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Add headers before the routes are defined
app.options('*', cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "Authorization");
    // res.header("Access-control-expose-headers", true);
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header("Access-Control-Allow-Headers", '*');
    res.header("Access-Control-Expose-Headers", '*, Authorization');
    next();
});
app.use(fileupload());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use("/public", express.static(path.resolve(__dirname, 'public')));
// Authentication Middleware
if (config.app.checkAuth) {
    app.use(function (req, res, next) {
        if (!req.originalUrl.match("/syuser/login|/public/|generate")) {
            if (!req.headers.authorization) {
                return res.status(403).json({ error: 'Invalid Authentication !' });
            } else {
                var decoded = jwt.decode(req.headers.authorization.split("Bearer ")[1].replace('"', '').replace('"', ''), { complete: true });
                const verify = jwt.verify(req.headers.authorization.split("Bearer ")[1].replace('"', '').replace('"', ""), config.app.hashSecret);
                if (!verify) {
                    return res.status(403).json({ error: 'Invalid Authentication !' });
                } else {
                    global.authentication = decoded.payload;
                }
            }
        }
        next();
    });
}

// Page Routing
app.use('/', index_route);
app.use('/generate', generate_route);
app.use('/mscustomer', mscustomer_route);
app.use('/mscustomerfile', mscustomerfile_route);
app.use('/mscustomerinfo', mscustomerinfo_route);
app.use('/msrelationship', msrelationship_route);
app.use('/msrelationshiptype', msrelationshiptype_route);
app.use('/syrole', syrole_route);
app.use('/sysystemconfig', sysystemconfig_route);
app.use('/sytransactionstatus', sytransactionstatus_route);
app.use('/syuser', syuser_route);
app.use('/syuserrole', syuserrole_route);
app.use('/trassign', trassign_route);
app.use('/trdebtcollection', trdebtcollection_route);
app.use('/trdiscount', trdiscount_route);
app.use('/trfollow', trfollow_route);
app.use('/trlawsuit', trlawsuit_route);
app.use('/trpayment', trpayment_route);
app.use('/trproperty', trproperty_route);
app.use('/trscan', trscan_route);
app.use('/msbank', msbank_route);
app.use('/trdebtrelation', trdebtrelation_route);
app.use('/sypropertytype', sypropertytype_route);
app.use('/syfollowtype', syfollowtype_route);
app.use('/sydocumenttype', sydocumenttype_route);
app.use('/trdocument', trdocument_route);
app.use('/syfollowstatus', syfollowstatus_route);
app.use('/msdebtstatus', msdebtstatus_route);
module.exports = app;