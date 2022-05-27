var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const msrelationshiptype = db.define('msrelationshiptype', {
  relationshipTypeCode: { primaryKey: true, type: Sequelize.STRING(20),  allowNull: false },
  relationshipTypeName: {  type: Sequelize.STRING(50),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'msrelationshiptype' });
module.exports = msrelationshiptype;