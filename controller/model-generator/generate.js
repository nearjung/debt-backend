var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const config = require('../../configuration/config');
const Op = Sequelize.Op;
const fs = require('fs');
var _ = require('lodash');

const readLineTest = async (req, res, next) => {
    var data = fs.readFileSync('./app2.js').toString().split("\n");
    data.splice(5, 0, "Your String");
    var text = data.join("\n");

    fs.writeFile('./app2.js', text, function (err) {
        if (err) return console.log(err);
    });
}

const generateModel = async (req, res, next) => {
    try {
        var tableName = req.query.tableName;
        if (!tableName) {
            let allTables = await db_sql.query("SHOW TABLES", { type: Sequelize.QueryTypes.SELECT });
            if (allTables.length > 0) {
                let complete = 0;
                for (let table of allTables) {
                    let sql = "";
                    sql += " SELECT `COLUMN_NAME`, `COLUMN_TYPE`, `IS_NULLABLE`, `COLUMN_KEY`, `EXTRA`, `DATA_TYPE`, `CHARACTER_MAXIMUM_LENGTH`, `NUMERIC_PRECISION` ";
                    sql += " FROM `INFORMATION_SCHEMA`.`COLUMNS` ";
                    sql += " WHERE `TABLE_SCHEMA`='" + config.db.cfg_db_name + "' ";
                    sql += " AND `TABLE_NAME`='" + table[config.app.tblAllColumn] + "';";
                    let columnList = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });

                    if (columnList) {
                        let txt = `var db = require('../configuration/database/db_sql')\nconst Sequelize = require('sequelize');\nconst ` + _.camelCase(table[config.app.tblAllColumn]) + ` = db.define('` + table[config.app.tblAllColumn] + `', {`
                        let columnTxt = "";
                        for (let i = 0; i < columnList.length; i++) {
                            if (i != 0 || i != columnList.length) columnTxt += "\n";
                            columnTxt += "  " + columnList[i].COLUMN_NAME + ": { " + ((columnList[i].COLUMN_KEY == 'PRI') ? 'primaryKey: true,' : '') + " " + ((columnList[i].EXTRA == 'auto_increment') ? 'autoIncrement: true, ' : '') + ((columnList[i].DATA_TYPE == 'int' || columnList[i].DATA_TYPE == 'decimal' || columnList[i].DATA_TYPE == 'price') ? 'type: Sequelize.INTEGER, ' : (columnList[i].DATA_TYPE == 'varchar' || columnList[i].DATA_TYPE == 'char') ? 'type: Sequelize.STRING(' + columnList[i].CHARACTER_MAXIMUM_LENGTH + '), ' : (columnList[i].DATA_TYPE == 'text') ? 'type: Sequelize.TEXT, ' : (columnList[i].DATA_TYPE == 'datetime' || columnList[i].DATA_TYPE == 'date' || columnList[i].DATA_TYPE == 'time') ? 'type: Sequelize.DATE, ' : 'type: Sequelize.STRING, ') + " allowNull: " + ((columnList[i].IS_NULLABLE == 'NO') ? 'false' : 'true') + " },";
                        }
                        txt += columnTxt;
                        txt += `\n}, { tableName: '` + table[config.app.tblAllColumn] + `' });\nmodule.exports = ` + _.camelCase(table[config.app.tblAllColumn]) + `;`;

                        fs.writeFileSync('./model/' + table[config.app.tblAllColumn] + '.js', txt);
                        complete = complete + 1;
                    }
                }

                if (complete == allTables.length) {
                    serviceResult.code = 200;
                    serviceResult.value = "";
                    serviceResult.status = "Success";
                    serviceResult.text = "Success";
                    res.json(serviceResult);
                }
            }
        } else {
            let sql = "";
            sql += " SELECT `COLUMN_NAME`, `COLUMN_TYPE`, `IS_NULLABLE`, `COLUMN_KEY`, `EXTRA`, `DATA_TYPE`, `CHARACTER_MAXIMUM_LENGTH`, `NUMERIC_PRECISION` ";
            sql += " FROM `INFORMATION_SCHEMA`.`COLUMNS` ";
            sql += " WHERE `TABLE_SCHEMA`='" + config.db.cfg_db_name + "' ";
            sql += " AND `TABLE_NAME`='" + tableName + "';";
            let columnList = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });

            if (columnList) {
                let txt = `var db = require('../configuration/database/db_sql')\nconst Sequelize = require('sequelize');\nconst ` + _.camelCase(tableName) + ` = db.define('` + tableName + `', {`
                let columnTxt = "";
                for (let i = 0; i < columnList.length; i++) {
                    if (i != 0 || i != columnList.length) columnTxt += "\n";
                    columnTxt += "  " + columnList[i].COLUMN_NAME + ": { " + ((columnList[i].COLUMN_KEY == 'PRI') ? 'primaryKey: true,' : '') + " " + ((columnList[i].EXTRA == 'auto_increment') ? 'autoIncrement: true, ' : '') + ((columnList[i].DATA_TYPE == 'int' || columnList[i].DATA_TYPE == 'decimal' || columnList[i].DATA_TYPE == 'price') ? 'type: Sequelize.INTEGER, ' : (columnList[i].DATA_TYPE == 'varchar' || columnList[i].DATA_TYPE == 'char') ? 'type: Sequelize.STRING(' + columnList[i].CHARACTER_MAXIMUM_LENGTH + '), ' : (columnList[i].DATA_TYPE == 'text') ? 'type: Sequelize.TEXT, ' : (columnList[i].DATA_TYPE == 'datetime' || columnList[i].DATA_TYPE == 'date' || columnList[i].DATA_TYPE == 'time') ? 'type: Sequelize.DATE, ' : 'type: Sequelize.STRING, ') + " allowNull: " + ((columnList[i].IS_NULLABLE == 'NO') ? 'false' : 'true') + " },";
                }
                txt += columnTxt;
                txt += `\n}, { tableName: '` + tableName + `' });\nmodule.exports = ` + _.camelCase(tableName) + `;`;

                fs.writeFileSync('./model/' + tableName + '.js', txt);
                // complete = complete + 1;
            }

            serviceResult.code = 200;
            serviceResult.value = "";
            serviceResult.status = "Success";
            serviceResult.text = "Success";
            res.json(serviceResult);
        }

    } catch (err) {
        serviceResult.code = 500;
        serviceResult.status = "Error";
        serviceResult.text = "Error: " + err.message;
        res.json(serviceResult);
    }
}

const generateComponent = async (req, res, next) => {
    try {
        var tableName = req.query.tableName;
        if (!tableName) {
            let allTables = await db_sql.query("SHOW TABLES", { type: Sequelize.QueryTypes.SELECT });
            if (allTables.length > 0) {
                let complete = 0;
                for (let table of allTables) {
                    let sql = "";
                    sql += " SELECT `COLUMN_NAME`, `COLUMN_TYPE`, `IS_NULLABLE`, `COLUMN_KEY`, `EXTRA`, `DATA_TYPE`, `CHARACTER_MAXIMUM_LENGTH`, `NUMERIC_PRECISION` ";
                    sql += " FROM `INFORMATION_SCHEMA`.`COLUMNS` ";
                    sql += " WHERE `TABLE_SCHEMA`='" + config.db.cfg_db_name + "' ";
                    sql += " AND `TABLE_NAME`='" + table[config.app.tblAllColumn] + "';";
                    let columnList = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });

                    if (columnList) {
                        let pkColumn = columnList.filter(x => x.COLUMN_KEY == 'PRI')[0];
                        // Generate get.js
                        let txtGet = `var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const `+ _.camelCase(table[config.app.tblAllColumn]) + ` = require('../../model/` + table[config.app.tblAllColumn] + `');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await `+ _.camelCase(table[config.app.tblAllColumn]) + `.findAll();
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
        let result = await `+ _.camelCase(table[config.app.tblAllColumn]) + `.findByPk(value);
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

module.exports = { findAll, findByPk };`;

                        // Save.js
                        let txtSave = `var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const Op = Sequelize.Op;
const dbManager = require('../../service/dbManager');
const `+ _.camelCase(table[config.app.tblAllColumn]) + ` = require('../../model/` + table[config.app.tblAllColumn] + `');


const save = async (req, res, next) => {
    try {
        var data = req.body;
        var where = {`
                        txtSave += (pkColumn?.COLUMN_NAME) ? pkColumn?.COLUMN_NAME + `: (data['` + pkColumn?.COLUMN_NAME + `']) ? data['` + pkColumn?.COLUMN_NAME + `'] : 0` : ''
                        txtSave += `};
        await dbManager.createOrUpdate(`+ _.camelCase(table[config.app.tblAllColumn]) + `, data, where).then(result => {
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

module.exports = { save }`;

                        // Route
                        let txtRoute = `var express = require('express');
var `+ _.camelCase(table[config.app.tblAllColumn]) + `_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/`+ _.camelCase(table[config.app.tblAllColumn]) + `/save');
var getController = require('../controller/`+ _.camelCase(table[config.app.tblAllColumn]) + `/get');

/** route */
`+ _.camelCase(table[config.app.tblAllColumn]) + `_route.get('/findAll', getController.findAll);
`+ _.camelCase(table[config.app.tblAllColumn]) + `_route.get('/findByPk', getController.findByPk);
`+ _.camelCase(table[config.app.tblAllColumn]) + `_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = `+ _.camelCase(table[config.app.tblAllColumn]) + `_route;`;

                        let folder = './controller/' + _.camelCase(table[config.app.tblAllColumn]) + '';
                        let routeFolder = './routes/';
                        if (!fs.existsSync(folder)) {
                            fs.mkdirSync(folder);
                        }
                        fs.writeFileSync(folder + '/get.js', txtGet);
                        fs.writeFileSync(folder + '/save.js', txtSave);
                        fs.writeFileSync(routeFolder + _.camelCase(table[config.app.tblAllColumn]) + '_route.js', txtRoute);


                        // Generate to app.js
                        let txtAppRequire = `var ` + _.camelCase(table[config.app.tblAllColumn]) + `_route = require('./routes/` + _.camelCase(table[config.app.tblAllColumn]) + `_route');`;
                        let txtAppRoute = `app.use('/` + _.camelCase(table[config.app.tblAllColumn]) + `', ` + _.camelCase(table[config.app.tblAllColumn]) + `_route);`;
                        var data = fs.readFileSync('./app.js').toString().split("\n");
                        data.splice(12, 0, txtAppRequire);
                        data.splice(data.length - 1, 0, txtAppRoute);
                        var text = data.join("\n");

                        fs.writeFile('./app.js', text, function (err) {
                            if (err) return console.log(err);
                        });

                        complete = complete + 1;

                        // let txt = `var db = require('../configuration/database/db_sql')\nconst Sequelize = require('sequelize');\nconst ` + _.camelCase(table[config.app.tblAllColumn]) + ` = db.define('` + table[config.app.tblAllColumn] + `', {`
                        // let columnTxt = "";
                        // for (let i = 0; i < columnList.length; i++) {
                        //     if (i != 0 || i != columnList.length) columnTxt += "\n";
                        //     columnTxt += "  " + columnList[i].COLUMN_NAME + ": { " + ((columnList[i].COLUMN_KEY == 'PRI') ? 'primaryKey: true,' : '') + " " + ((columnList[i].EXTRA == 'auto_increment') ? 'autoIncrement: true, ' : '') + ((columnList[i].DATA_TYPE == 'int' || columnList[i].DATA_TYPE == 'decimal' || columnList[i].DATA_TYPE == 'price') ? 'type: Sequelize.INTEGER, ' : (columnList[i].DATA_TYPE == 'varchar' || columnList[i].DATA_TYPE == 'char') ? 'type: Sequelize.STRING(' + columnList[i].CHARACTER_MAXIMUM_LENGTH + '), ' : (columnList[i].DATA_TYPE == 'text') ? 'type: Sequelize.TEXT, ' : (columnList[i].DATA_TYPE == 'datetime' || columnList[i].DATA_TYPE == 'date' || columnList[i].DATA_TYPE == 'time') ? 'type: Sequelize.DATE, ' : 'type: Sequelize.STRING, ') + " allowNull: " + ((columnList[i].IS_NULLABLE == 'NO') ? 'false' : 'true') + " },";
                        // }
                        // txt += columnTxt;
                        // txt += `\n}, { tableName: '` + table[config.app.tblAllColumn] + `' });\nmodule.exports = ` + _.camelCase(table[config.app.tblAllColumn]) + `;`;

                        // fs.writeFileSync('./model/' + table[config.app.tblAllColumn] + '.js', txt);
                        // complete = complete + 1;
                    }
                }

                if (complete == allTables.length) {
                    serviceResult.code = 200;
                    serviceResult.value = "";
                    serviceResult.status = "Success";
                    serviceResult.text = "Success";
                    res.json(serviceResult);
                }
            }
        } else {
            let sql = "";
            sql += " SELECT `COLUMN_NAME`, `COLUMN_TYPE`, `IS_NULLABLE`, `COLUMN_KEY`, `EXTRA`, `DATA_TYPE`, `CHARACTER_MAXIMUM_LENGTH`, `NUMERIC_PRECISION` ";
            sql += " FROM `INFORMATION_SCHEMA`.`COLUMNS` ";
            sql += " WHERE `TABLE_SCHEMA`='" + config.db.cfg_db_name + "' ";
            sql += " AND `TABLE_NAME`='" + tableName + "';";
            let columnList = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });

            if (columnList) {
                let pkColumn = columnList.filter(x => x.COLUMN_KEY == 'PRI')[0];
                // Generate get.js
                let txtGet = `var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const `+ _.camelCase(tableName) + ` = require('../../model/` + tableName + `');
const Op = Sequelize.Op;

const findAll = async (req, res, next) => {
    try {
        let result = await `+ _.camelCase(tableName) + `.findAll();
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
        let result = await `+ _.camelCase(tableName) + `.findByPk(value);
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

module.exports = { findAll, findByPk };`;

                // Save.js
                let txtSave = `var serviceResult = require('../../model/serviceResult');
var db_sql = require('../../configuration/database/db_sql');
const Sequelize = require('sequelize');
const log = require('../../configuration/log/log');
const Op = Sequelize.Op;
const dbManager = require('../../service/dbManager');
const `+ _.camelCase(tableName) + ` = require('../../model/` + tableName + `');


const save = async (req, res, next) => {
    try {
        var data = req.body;
        var where = {`
                txtSave += (pkColumn?.COLUMN_NAME) ? pkColumn?.COLUMN_NAME + `: (data['` + pkColumn?.COLUMN_NAME + `']) ? data['` + pkColumn?.COLUMN_NAME + `'] : 0` : ''
                txtSave += `};
        await dbManager.createOrUpdate(`+ _.camelCase(tableName) + `, data, where).then(result => {
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

module.exports = { save }`;

                // Route
                let txtRoute = `var express = require('express');
var `+ _.camelCase(tableName) + `_route = express.Router();
var cors = require('cors');

/** controller */
var saveController = require('../controller/`+ _.camelCase(tableName) + `/save');
var getController = require('../controller/`+ _.camelCase(tableName) + `/get');

/** route */
`+ _.camelCase(tableName) + `_route.get('/findAll', getController.findAll);
`+ _.camelCase(tableName) + `_route.get('/findByPk', getController.findByPk);
`+ _.camelCase(tableName) + `_route.post('/save', cors({ origin: true }), saveController.save);

module.exports = `+ _.camelCase(tableName) + `_route;`;

                let folder = './controller/' + _.camelCase(tableName) + '';
                let routeFolder = './routes/';
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }
                fs.writeFileSync(folder + '/get.js', txtGet);
                fs.writeFileSync(folder + '/save.js', txtSave);
                fs.writeFileSync(routeFolder + _.camelCase(tableName) + '_route.js', txtRoute);


                // Generate to app.js
                let txtAppRequire = `var ` + _.camelCase(tableName) + `_route = require('./routes/` + _.camelCase(tableName) + `_route');`;
                let txtAppRoute = `app.use('/` + _.camelCase(tableName) + `', ` + _.camelCase(tableName) + `_route);`;
                var data = fs.readFileSync('./app.js').toString().split("\n");
                data.splice(12, 0, txtAppRequire);
                data.splice(data.length - 1, 0, txtAppRoute);
                var text = data.join("\n");

                fs.writeFile('./app.js', text, function (err) {
                    if (err) return console.log(err);
                });

                // complete = complete + 1;

                // let txt = `var db = require('../configuration/database/db_sql')\nconst Sequelize = require('sequelize');\nconst ` + _.camelCase(tableName) + ` = db.define('` + tableName + `', {`
                // let columnTxt = "";
                // for (let i = 0; i < columnList.length; i++) {
                //     if (i != 0 || i != columnList.length) columnTxt += "\n";
                //     columnTxt += "  " + columnList[i].COLUMN_NAME + ": { " + ((columnList[i].COLUMN_KEY == 'PRI') ? 'primaryKey: true,' : '') + " " + ((columnList[i].EXTRA == 'auto_increment') ? 'autoIncrement: true, ' : '') + ((columnList[i].DATA_TYPE == 'int' || columnList[i].DATA_TYPE == 'decimal' || columnList[i].DATA_TYPE == 'price') ? 'type: Sequelize.INTEGER, ' : (columnList[i].DATA_TYPE == 'varchar' || columnList[i].DATA_TYPE == 'char') ? 'type: Sequelize.STRING(' + columnList[i].CHARACTER_MAXIMUM_LENGTH + '), ' : (columnList[i].DATA_TYPE == 'text') ? 'type: Sequelize.TEXT, ' : (columnList[i].DATA_TYPE == 'datetime' || columnList[i].DATA_TYPE == 'date' || columnList[i].DATA_TYPE == 'time') ? 'type: Sequelize.DATE, ' : 'type: Sequelize.STRING, ') + " allowNull: " + ((columnList[i].IS_NULLABLE == 'NO') ? 'false' : 'true') + " },";
                // }
                // txt += columnTxt;
                // txt += `\n}, { tableName: '` + tableName + `' });\nmodule.exports = ` + _.camelCase(tableName) + `;`;

                // fs.writeFileSync('./model/' + tableName + '.js', txt);
                // complete = complete + 1;
            }

            serviceResult.code = 200;
            serviceResult.value = "";
            serviceResult.status = "Success";
            serviceResult.text = "Success";
            res.json(serviceResult);
        }


    } catch (err) {
        serviceResult.code = 500;
        serviceResult.status = "Error";
        serviceResult.text = "Error: " + err.message;
        res.json(serviceResult);
    }
}


const generateModelClient = async (req, res, next) => {
    try {
        var tableName = req.query.tableName;
        if (!tableName) {
            let allTables = await db_sql.query("SHOW TABLES", { type: Sequelize.QueryTypes.SELECT });
            if (allTables.length > 0) {
                let complete = 0;
                for (let table of allTables) {
                    let sql = "";
                    sql += " SELECT `COLUMN_NAME`, `COLUMN_TYPE`, `IS_NULLABLE`, `COLUMN_KEY`, `EXTRA`, `DATA_TYPE`, `CHARACTER_MAXIMUM_LENGTH`, `NUMERIC_PRECISION` ";
                    sql += " FROM `INFORMATION_SCHEMA`.`COLUMNS` ";
                    sql += " WHERE `TABLE_SCHEMA`='" + config.db.cfg_db_name + "' ";
                    sql += " AND `TABLE_NAME`='" + table[config.app.tblAllColumn] + "';";
                    let columnList = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });

                    if (columnList) {
                        let txt = 'export class ' + table[config.app.tblAllColumn] + ' {\n'
                        let columnTxt = "";
                        for (let i = 0; i < columnList.length; i++) {
                            columnTxt += '    ' + (columnList[i].COLUMN_NAME) + ': ' + ((columnList[i].DATA_TYPE == 'char' || columnList[i].DATA_TYPE == 'varchar' || columnList[i].DATA_TYPE == 'text') ? 'string' : (columnList[i].DATA_TYPE == 'int' || columnList[i].DATA_TYPE == 'decimal' || columnList[i].DATA_TYPE == 'number') ? 'number' : (columnList[i].DATA_TYPE == 'Date' || columnList[i].DATA_TYPE == 'Time' || columnList[i].DATA_TYPE == 'DateTime') ? 'Date' : 'string');
                            columnTxt += ";\n";
                        }
                        txt += columnTxt;
                        txt += '};'

                        fs.writeFileSync('./modelClient/' + _.camelCase(table[config.app.tblAllColumn]) + '.ts', txt);
                        complete = complete + 1;
                    }
                }

                if (complete == allTables.length) {
                    serviceResult.code = 200;
                    serviceResult.value = "";
                    serviceResult.status = "Success";
                    serviceResult.text = "Success";
                    res.json(serviceResult);
                }
            }
        } else {
            let sql = "";
            sql += " SELECT `COLUMN_NAME`, `COLUMN_TYPE`, `IS_NULLABLE`, `COLUMN_KEY`, `EXTRA`, `DATA_TYPE`, `CHARACTER_MAXIMUM_LENGTH`, `NUMERIC_PRECISION` ";
            sql += " FROM `INFORMATION_SCHEMA`.`COLUMNS` ";
            sql += " WHERE `TABLE_SCHEMA`='" + config.db.cfg_db_name + "' ";
            sql += " AND `TABLE_NAME`='" + tableName + "';";
            let columnList = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });

            if (columnList) {
                let txt = 'export class ' + tableName + ' {\n'
                let columnTxt = "";
                for (let i = 0; i < columnList.length; i++) {
                    columnTxt += '    ' + (columnList[i].COLUMN_NAME) + ': ' + ((columnList[i].DATA_TYPE == 'char' || columnList[i].DATA_TYPE == 'varchar' || columnList[i].DATA_TYPE == 'text') ? 'string' : (columnList[i].DATA_TYPE == 'int' || columnList[i].DATA_TYPE == 'decimal' || columnList[i].DATA_TYPE == 'number') ? 'number' : (columnList[i].DATA_TYPE == 'Date' || columnList[i].DATA_TYPE == 'Time' || columnList[i].DATA_TYPE == 'DateTime') ? 'Date' : 'string');
                    columnTxt += ";\n";
                }
                txt += columnTxt;
                txt += '};'

                fs.writeFileSync('./modelClient/' + _.camelCase(tableName) + '.ts', txt);
                // complete = complete + 1;
                serviceResult.code = 200;
                serviceResult.value = "";
                serviceResult.status = "Success";
                serviceResult.text = "Success";
                res.json(serviceResult);
            }
        }

    } catch (err) {
        serviceResult.code = 500;
        serviceResult.status = "Error";
        serviceResult.text = "Error: " + err.message;
        res.json(serviceResult);
    }
}

const generateServiceClient = async (req, res, next) => {
    try {
        var tableName = req.query.tableName;
        if (!tableName) {
            let allTables = await db_sql.query("SHOW TABLES", { type: Sequelize.QueryTypes.SELECT });
            if (allTables.length > 0) {
                let complete = 0;
                for (let table of allTables) {
                    let sql = "";
                    sql += " SELECT `COLUMN_NAME`, `COLUMN_TYPE`, `IS_NULLABLE`, `COLUMN_KEY`, `EXTRA`, `DATA_TYPE`, `CHARACTER_MAXIMUM_LENGTH`, `NUMERIC_PRECISION` ";
                    sql += " FROM `INFORMATION_SCHEMA`.`COLUMNS` ";
                    sql += " WHERE `TABLE_SCHEMA`='" + config.db.cfg_db_name + "' ";
                    sql += " AND `TABLE_NAME`='" + table[config.app.tblAllColumn] + "';";
                    let columnList = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });

                    if (columnList) {
                        let txt = `import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigServerService } from '../core/config-server.service';

@Injectable({
    providedIn: 'root'
})
export class `+ _.camelCase(table[config.app.tblAllColumn])[0].toUpperCase() + _.camelCase(table[config.app.tblAllColumn]).substring(1) + `Service {

    constructor(private httpClient: HttpClient, private configService: ConfigServerService) { }

    public createOrUpdate(data: any) {
    return this.httpClient.post<any>(this.configService.getAPI('`+ _.camelCase(table[config.app.tblAllColumn]) + `/save'), data).pipe(
        map(respons => {
        return {
            serviceResult: respons
        }
        }));
    }

    public findAll() {
    return this.httpClient.get<any>(this.configService.getAPI('`+ _.camelCase(table[config.app.tblAllColumn]) + `/findAll')).pipe(
        map(respons => {
        return {
            serviceResult: respons
        }
        }));
    }

    public findByPk(value: string) {
    return this.httpClient.get<any>(this.configService.getAPI('`+ _.camelCase(table[config.app.tblAllColumn]) + `/findByPk?value=' + value)).pipe(
        map(respons => {
        return {
            serviceResult: respons
        }
        }));
    }


}`;


                        // let columnTxt = "";
                        // for (let i = 0; i < columnList.length; i++) {
                        //     columnTxt += '    ' + (columnList[i].COLUMN_NAME) + ': ' + ((columnList[i].DATA_TYPE == 'char' || columnList[i].DATA_TYPE == 'varchar' || columnList[i].DATA_TYPE == 'text') ? 'string' : (columnList[i].DATA_TYPE == 'int' || columnList[i].DATA_TYPE == 'decimal' || columnList[i].DATA_TYPE == 'number') ? 'number' : (columnList[i].DATA_TYPE == 'Date' || columnList[i].DATA_TYPE == 'Time' || columnList[i].DATA_TYPE == 'DateTime') ? 'Date' : 'string');
                        //     columnTxt += ";\n";
                        // }
                        // txt += columnTxt;

                        fs.writeFileSync('./modelService/' + _.camelCase(table[config.app.tblAllColumn]) + '.service.ts', txt);
                        complete = complete + 1;
                    }
                }

                if (complete == allTables.length) {
                    serviceResult.code = 200;
                    serviceResult.value = "";
                    serviceResult.status = "Success";
                    serviceResult.text = "Success";
                    res.json(serviceResult);
                }
            }
        } else {
            let sql = "";
            sql += " SELECT `COLUMN_NAME`, `COLUMN_TYPE`, `IS_NULLABLE`, `COLUMN_KEY`, `EXTRA`, `DATA_TYPE`, `CHARACTER_MAXIMUM_LENGTH`, `NUMERIC_PRECISION` ";
            sql += " FROM `INFORMATION_SCHEMA`.`COLUMNS` ";
            sql += " WHERE `TABLE_SCHEMA`='" + config.db.cfg_db_name + "' ";
            sql += " AND `TABLE_NAME`='" + tableName + "';";
            let columnList = await db_sql.query(sql, { type: Sequelize.QueryTypes.SELECT });

            if (columnList) {
                let txt = `import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigServerService } from '../core/config-server.service';

@Injectable({
    providedIn: 'root'
})
export class `+ _.camelCase(tableName)[0].toUpperCase() + _.camelCase(tableName).substring(1) + `Service {

    constructor(private httpClient: HttpClient, private configService: ConfigServerService) { }

    public createOrUpdate(data: any) {
    return this.httpClient.post<any>(this.configService.getAPI('`+ _.camelCase(tableName) + `/save'), data).pipe(
        map(respons => {
        return {
            serviceResult: respons
        }
        }));
    }

    public findAll() {
    return this.httpClient.get<any>(this.configService.getAPI('`+ _.camelCase(tableName) + `/findAll')).pipe(
        map(respons => {
        return {
            serviceResult: respons
        }
        }));
    }

    public findByPk(value: string) {
    return this.httpClient.get<any>(this.configService.getAPI('`+ _.camelCase(tableName) + `/findByPk?value=' + value)).pipe(
        map(respons => {
        return {
            serviceResult: respons
        }
        }));
    }


}`;


                // let columnTxt = "";
                // for (let i = 0; i < columnList.length; i++) {
                //     columnTxt += '    ' + (columnList[i].COLUMN_NAME) + ': ' + ((columnList[i].DATA_TYPE == 'char' || columnList[i].DATA_TYPE == 'varchar' || columnList[i].DATA_TYPE == 'text') ? 'string' : (columnList[i].DATA_TYPE == 'int' || columnList[i].DATA_TYPE == 'decimal' || columnList[i].DATA_TYPE == 'number') ? 'number' : (columnList[i].DATA_TYPE == 'Date' || columnList[i].DATA_TYPE == 'Time' || columnList[i].DATA_TYPE == 'DateTime') ? 'Date' : 'string');
                //     columnTxt += ";\n";
                // }
                // txt += columnTxt;

                fs.writeFileSync('./modelService/' + _.camelCase(tableName) + '.service.ts', txt);
                // complete = complete + 1;
                serviceResult.code = 200;
                serviceResult.value = "";
                serviceResult.status = "Success";
                serviceResult.text = "Success";
                res.json(serviceResult);
            }
        }

    } catch (err) {
        serviceResult.code = 500;
        serviceResult.status = "Error";
        serviceResult.text = "Error: " + err.message;
        res.json(serviceResult);
    }
}

module.exports = { generateModel, generateComponent, readLineTest, generateModelClient, generateServiceClient }