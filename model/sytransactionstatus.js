var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const sytransactionstatus = db.define('sytransactionstatus', {
  transactionStatusId: { primaryKey: true, type: Sequelize.INTEGER,  allowNull: false },
  statusCode: {  type: Sequelize.STRING(20),  allowNull: true },
  statusName: {  type: Sequelize.STRING(250),  allowNull: true },
  statusNameEnglish: {  type: Sequelize.STRING(250),  allowNull: true },
  seq: {  type: Sequelize.INTEGER,  allowNull: true },
  module: {  type: Sequelize.STRING(50),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.DATE,  allowNull: true },
  createDate: {  type: Sequelize.STRING(255),  allowNull: true },
  updatedBy: {  type: Sequelize.DATE,  allowNull: true },
  updateDate: {  type: Sequelize.STRING(255),  allowNull: true },
}, { tableName: 'sytransactionstatus' });
module.exports = sytransactionstatus;