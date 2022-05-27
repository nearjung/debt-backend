var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const msrelationship = require('../../model/msrelationship');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await msrelationship.findAll();
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
        let result = await msrelationship.findByPk(value);
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

const findByCustomerIdCard = async (req, res, next) => {
    try {
        let idcard = req.query.idcard;

        if (idcard) {
            let sql = " SELECT * FROM msrelationship ms INNER JOIN msrelationshiptype mst ON mst.relationshipTypeCode = ms.relationshipTypeCode";
            sql += " WHERE ms.relationshipManual = '" + idcard + "'";
            const result = await db_sql.query(sql, { type: db_sql.QueryTypes.SELECT }).catch(err => { console.error("code : a9dd32a1-978e-43c1-b4cc-2c6acf0d813e"); throw err; });

            serviceResult.value = result;
            serviceResult.code = 200;
            serviceResult.status = "Success";
            serviceResult.text = "Success";
            res.json(serviceResult);
        } else {
            serviceResult.code = 500;
            serviceResult.status = "Error";
            serviceResult.text = "Error: ไม่พบข้อมูลบัตรประชาชน";
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

module.exports = { findAll, findByPk, findByCustomerIdCard };