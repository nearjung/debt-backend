var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const trdocument = db.define('trdocument', {
  documentId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  documentTypeId: {  type: Sequelize.INTEGER,  allowNull: true },
  debtCollectionNumber: {  type: Sequelize.INTEGER,  allowNull: true },
  fileType: {  type: Sequelize.STRING(200),  allowNull: true },
  fileName: {  type: Sequelize.STRING(200),  allowNull: true },
  filePath: {  type: Sequelize.STRING(200),  allowNull: true },
  remark: {  type: Sequelize.TEXT,  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  createBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updateBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'trdocument' });
module.exports = trdocument;