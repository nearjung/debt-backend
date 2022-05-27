var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const trassign = db.define('trassign', {
  assignId: { primaryKey: true, type: Sequelize.INTEGER,  allowNull: false },
  debtCollectionNumber: {  type: Sequelize.STRING(25),  allowNull: true },
  assignDate: {  type: Sequelize.DATE,  allowNull: true },
  prority: {  type: Sequelize.INTEGER,  allowNull: true },
  username: {  type: Sequelize.STRING(50),  allowNull: true },
  note: {  type: Sequelize.STRING,  allowNull: true },
  status: {  type: Sequelize.STRING(20),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'trassign' });
module.exports = trassign;