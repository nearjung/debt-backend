var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const syuserrole = db.define('syuserrole', {
  userRoleId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  roleId: {  type: Sequelize.INTEGER,  allowNull: true },
  username: {  type: Sequelize.STRING(50),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'syuserrole' });
module.exports = syuserrole;