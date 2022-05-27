var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const trlawsuit = require('../../model/trlawsuit');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await trlawsuit.findAll();
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
        let result = await trlawsuit.findByPk(value);
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

        if (debtId) {
            let sql = "";
            sql += " SELECT";
            sql += " 	* ";
            sql += " FROM";
            sql += " 	trlawsuit";
            sql += " 	LEFT JOIN trproperty ON trproperty.propertyId = trlawsuit.propertyId ";
            sql += " 	LEFT JOIN sypropertytype ON sypropertytype.typeId = trproperty.propertyType ";
            sql += " WHERE";
            sql += " 	trlawsuit.active = 'Y' ";
            sql += " 	AND trlawsuit.debtCollectionNumber = '"+ debtId +"'";
            const result = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT }).catch(err => {
                console.error("code : e3463e1d-2c19-401b-ae39-05556faf4471");
                throw err;
            });

            serviceResult.value = result;
            serviceResult.code = 200;
            serviceResult.status = "Success";
            serviceResult.text = "Success";
            res.json(serviceResult);
        } else {
            serviceResult.code = 500;
            serviceResult.status = "Error";
            serviceResult.text = "Error: Invalid Debt Id.";
            res.json(serviceResult);
        }

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