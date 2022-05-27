var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const trfollow = require('../../model/trfollow');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await trfollow.findAll();
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
        let result = await trfollow.findByPk(value);
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
        let followType = req.query.followType;
        let status = req.query.status;

        if (debtId) {
            let sql = "";
            sql += " SELECT";
            sql += " 	* ";
            sql += " FROM";
            sql += " 	trfollow tf";
            sql += " 	LEFT JOIN syfollowtype sft ON sft.followTypeId = tf.followType";
            sql += " 	LEFT JOIN syfollowstatus sfs ON sfs.followStatus = tf.`status`";
            sql += " WHERE";
            sql += " tf.active = 'Y' AND";
            sql += " tf.debtCollectionNumber = '" + debtId + "'";
            if (followType) sql += " tf.followType = '" + followType + "' AND";
            if (status) sql += " tf.status = '" + status + "' AND";
            const result = await db_sql.query(sql, { type: db_sql.QueryTypes.SELECT }).catch(err => {
                console.error("code : 4efb9ce4-3c22-4278-ab40-114e501f2298"); throw err;
            });


            serviceResult.value = result;
            serviceResult.code = 200;
            serviceResult.status = "Success";
            serviceResult.text = "Success";
            res.json(serviceResult);
        } else {
            serviceResult.code = 500;
            serviceResult.status = "Error";
            serviceResult.text = "Error: Invalid Debt Id";
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