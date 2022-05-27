var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const syuser = require('../../model/syuser');
const Op = Sequelize.Op;
const saltedMd5 = require('salted-md5');
const config = require('../../configuration/config');
const syuserrole = require('../../model/syuserrole');
var jwt = require('jsonwebtoken');

const findAll = async (req, res, next) => {
    try {
        let result = await syuser.findAll({
            where: {
                active: 'Y'
            }
        }).catch(err => {
            console.error("code : 6ccb0160-750a-445d-a379-280fae60d067");
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

const findByPk = async (req, res, next) => {
    try {
        let value = req.query.value;
        let result = await syuser.findByPk(value);
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

const login = async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = saltedMd5(req.body.password, config.app.passwordSalt);

        if (username && password) {
            const user = await syuser.findOne({
                where: {
                    username: username,
                    password: password,
                    active: 'Y'
                }
            }).catch(err => {
                console.error("code : 54d2dcc1-1cf0-402c-b550-57e6eb65139d");
                throw err;
            });

            if (user) {
                const userRole = await syuserrole.findAll({
                    where: {
                        username: username,
                        active: 'Y'
                    }
                }).catch(err => {
                    console.error("code : 1881a83a-9f08-4fad-8ff6-bbfe75b00539");
                    throw err;
                });

                if (userRole) {
                    delete user.password;

                    let result = {
                        user,
                        userRole
                    }

                    let jwtSign = "Bearer " + jwt.sign(user.dataValues, config.app.hashSecret);

                    serviceResult.value = result;
                    serviceResult.code = 200;
                    serviceResult.status = "Success";
                    serviceResult.text = "Success";
                    res.setHeader('Authorization', jwtSign);
                    res.json(serviceResult);
                }
            } else {
                serviceResult.code = 500;
                serviceResult.status = "Error";
                serviceResult.text = "Error: ชื่อบัญชีหรือรหัสผ่านผิดพลาด";
                res.json(serviceResult);
            }
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

module.exports = { findAll, findByPk, login };