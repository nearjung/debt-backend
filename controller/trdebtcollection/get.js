var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const trdebtcollection = require('../../model/trdebtcollection');
const trdebtrelation = require('../../model/trdebtrelation');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await trdebtcollection.findAll({
            where: {
                active: 'Y',
                traceBy: null,
                status: null
            }
        });
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
        let result = await trdebtcollection.findByPk(value);
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

const findAllTrace = async (req, res, next) => {
    try {
        const result = await trdebtcollection.findAll({
            where: {
                active: 'Y',
                traceBy: {
                    [Op.not]: null
                }
            }
        }).catch(err => {
            console.error("code : f348592f-febb-42e1-b59c-757b6dfa7594");
            throw err;
        });

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

const findMyTrace = async (req, res, next) => {
    try {
        let status = req.query.status;
        let username = global.authentication.username;
        if (username) {
            const result = await trdebtcollection.findAll({
                where: {
                    active: 'Y',
                    traceBy: username,
                    status: status
                }
            }).catch(err => {
                console.error("code : 890e8fe8-7ebd-4239-9bbd-6addbb4b5ca2");
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
            serviceResult.text = "Error: Invalid Token.";
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

const findByStatus = async (req, res, next) => {
    try {
        let status = req.query.statusCode;

        let result = await trdebtcollection.findAll({
            where: {
                active: 'Y',
                status: status
            }
        }).catch(err => {
            console.error("code : 37af1a5e-9c9c-41bc-83ec-b0d125715340");
            throw err;
        });


        let count = 0;
        for (let debt of result) {
            debt.dataValues.relationship = [];
            sql = "";
            sql += " SELECT";
            sql += " 	* ";
            sql += " FROM";
            sql += " 	trdebtrelation";
            sql += " 	INNER JOIN mscustomer ON mscustomer.idcard = trdebtrelation.idcard";
            sql += " WHERE trdebtrelation.active = 'Y'";
            sql += " AND trdebtrelation.debtCollectionNumber = '" + debt.debtCollectionNumber + "'";
            let data = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });
            debt.dataValues.relationship = data;
            count = count + 1;
        }


        if (count === result.length) {
            serviceResult.value = result;
            serviceResult.code = 200;
            serviceResult.status = "Success";
            serviceResult.text = "Success";
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

module.exports = { findAll, findByPk, findAllTrace, findMyTrace, findByStatus };