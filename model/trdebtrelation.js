var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const trdebtrelation = db.define('trdebtrelation', {
  relationId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  debtCollectionNumber: {  type: Sequelize.INTEGER,  allowNull: true },
  idcard: {  type: Sequelize.STRING(50),  allowNull: true },
  isMain: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.TEXT,  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  createBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updateBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'trdebtrelation' });
module.exports = trdebtrelation;