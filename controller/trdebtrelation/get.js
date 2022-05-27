var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const trdebtrelation = require('../../model/trdebtrelation');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await trdebtrelation.findAll();
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
        let result = await trdebtrelation.findByPk(value);
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

const checkIfExist = async (req, res, next) => {
    try {
        let debtId = req.query.debtId;
        let idcard = req.query.idcard;

        if (debtId && idcard) {
            const result = await trdebtrelation.findOne({
                where: {
                    debtCollectionNumber: debtId,
                    idcard: idcard,
                    active: 'Y'
                }
            }).catch(err => {
                console.error("code : 0befa311-ad19-4ec7-8b6d-1cfb259763f3");
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
            serviceResult.text = "Error: Invalid Parameter.";
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


module.exports = { findAll, findByPk, checkIfExist };