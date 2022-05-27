var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const syrole = db.define('syrole', {
  roleId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  rolename: {  type: Sequelize.STRING(50),  allowNull: true },
  seq: {  type: Sequelize.INTEGER,  allowNull: true },
  groupname: {  type: Sequelize.STRING(250),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'syrole' });
module.exports = syrole;