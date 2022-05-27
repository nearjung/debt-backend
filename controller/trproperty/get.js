var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const trproperty = require('../../model/trproperty');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await trproperty.findAll();
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
        let result = await trproperty.findByPk(value);
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

const findByDebt = async (req, res, next) => {
    try {
        let debtId = req.query.debtId;
        const result = await db_sql.query("SELECT * FROM trproperty LEFT JOIN sypropertytype spt ON spt.typeId = trproperty.propertyType WHERE trproperty.active = 'Y' AND trproperty.debtCollectionNumber = '" + debtId + "'", { type: Sequelize.QueryTypes.SELECT }).catch(err => {
            console.error("code : 0ede9a4b-9bdc-4791-af62-c2c0f9a3cc77");
            throw err;
        })

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

module.exports = { findAll, findByPk, findByDebt };