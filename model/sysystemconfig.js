var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const sysystemconfig = db.define('sysystemconfig', {
  systemConfigId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  module: {  type: Sequelize.STRING(50),  allowNull: true },
  parameter: {  type: Sequelize.STRING(255),  allowNull: true },
  value: {  type: Sequelize.TEXT,  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'sysystemconfig' });
module.exports = sysystemconfig;