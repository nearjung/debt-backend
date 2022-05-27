var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const msdebtstatus = db.define('msdebtstatus', {
  statusCode: { primaryKey: true, type: Sequelize.STRING(20),  allowNull: false },
  statusName: {  type: Sequelize.STRING(200),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  createBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updateBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'msdebtstatus' });
module.exports = msdebtstatus;