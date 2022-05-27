var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const Op = Sequelize.Op;
const dbManager = require('../../service/dbManager');
const sypropertytype = require('../../model/sypropertytype');


const save = async (req, res, next) => {
    try {
        var data = req.body;
        var where = {typeId: (data['typeId']) ? data['typeId'] : 0};
        await dbManager.createOrUpdate(sypropertytype, data, where).then(result => {
            serviceResult.value = result;
            serviceResult.code = 200;
            serviceResult.status = "Success";
            serviceResult.text = "Success";
            res.json(serviceResult);
        }).catch(err => console.error(err));
    } catch (err) {
        console.error(err);
        log.error(err.stack);
        serviceResult.code = 500;
        serviceResult.status = "Error";
        serviceResult.text = "Error: " + err.message;
        res.json(serviceResult);
    }
}

module.exports = { save }