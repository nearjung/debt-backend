var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const mscustomer = require('../../model/mscustomer');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await mscustomer.findAll({
            where: {
                active: 'Y'
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
        let result = await mscustomer.findByPk(value);
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
        let sql = "SELECT * FROM trdebtrelation INNER JOIN mscustomer ON mscustomer.idcard = trdebtrelation.idcard WHERE trdebtrelation.active = 'Y' AND trdebtrelation.debtCollectionNumber = '" + debtId + "'";
        const result = await db_sql.query(sql, { type: db_sql.QueryTypes.SELECT }).catch(err => { console.error("code : 50dcad93-2ba9-41b5-a501-ff79e8b2b0b8"); throw err; });
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

const findByName = async (req, res, next) => {
    try {
        let searchTxt = req.query.searchTxt;

        if (searchTxt) {
            const result = await mscustomer.findAll({
                where: {
                    fname: {
                        [Op.like]: "%" + searchTxt + "%"
                    }
                }
            }).catch(err => {
                console.error("code : a84f21eb-1ab9-4283-b218-9042d741d4e6");
                throw err;
            })

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

module.exports = { findAll, findByPk, findByDebt, findByName };