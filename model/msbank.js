var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const msbank = db.define('msbank', {
  bankCode: { primaryKey: true, type: Sequelize.STRING(10),  allowNull: false },
  bankName: {  type: Sequelize.STRING(200),  allowNull: true },
  swiftCode: {  type: Sequelize.STRING(50),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  createBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updateBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'msbank' });
module.exports = msbank;