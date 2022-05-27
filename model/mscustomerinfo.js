var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const mscustomerinfo = db.define('mscustomerinfo', {
  customerInfoId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  idcard: {  type: Sequelize.STRING(25),  allowNull: true },
  refId: {  type: Sequelize.STRING(25),  allowNull: true },
  fieldType: {  type: Sequelize.STRING(250),  allowNull: true },
  fieldData: {  type: Sequelize.STRING(250),  allowNull: true },
  value: {  type: Sequelize.STRING(250),  allowNull: true },
  data: {  type: Sequelize.STRING,  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
  sourceId: {  type: Sequelize.STRING(50),  allowNull: true },
  source: {  type: Sequelize.STRING(50),  allowNull: true },
}, { tableName: 'mscustomerinfo' });
module.exports = mscustomerinfo;