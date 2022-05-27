var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const msDebtStatus = db.define('ms_debt_status', {
}, { tableName: 'ms_debt_status' });
module.exports = msDebtStatus;