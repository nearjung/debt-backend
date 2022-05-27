var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const sysystemconfig = require('../../model/sysystemconfig');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await sysystemconfig.findAll();
        serviceResult.value = result;
        serviceResult.code = 200;
        serviceResult.status = "Success";
        serviceResult.text = "Success";
        res.json(serviceResult);
    } catch (err) {
        console.error(err);
        log.error(err.stack);
        serviceResult.code = 500;
        serviceResult.status = "Error";
        serviceResult.text = "Error: " + err.message;
        res.json(serviceResult);
    }
}

const findByPk = async (req, res, next) => {
    try {
        let value = req.query.value;
        let result = await sysystemconfig.findByPk(value);
        serviceResult.value = result;
        serviceResult.code = 200;
        serviceResult.status = "Success";
        serviceResult.text = "Success";
        res.json(serviceResult);
    } catch (err) {
        console.error(err);
        log.error(err.stack);
        serviceResult.code = 500;
        serviceResult.status = "Error";
        serviceResult.text = "Error: " + err.message;
        res.json(serviceResult);
    }
}

module.exports = { findAll, findByPk };