var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const trscan = db.define('trscan', {
  scanId: { primaryKey: true, type: Sequelize.INTEGER,  allowNull: false },
  refId: {  type: Sequelize.STRING(50),  allowNull: true },
  seq: {  type: Sequelize.INTEGER,  allowNull: true },
  debtCollectionNumber: {  type: Sequelize.STRING(25),  allowNull: true },
  documentTypeId: {  type: Sequelize.INTEGER,  allowNull: true },
  fileType: {  type: Sequelize.STRING(20),  allowNull: true },
  documentDate: {  type: Sequelize.STRING(10),  allowNull: true },
  documentType: {  type: Sequelize.STRING(50),  allowNull: true },
  fileName: {  type: Sequelize.STRING(255),  allowNull: true },
  fullName: {  type: Sequelize.STRING(255),  allowNull: true },
  pageCount: {  type: Sequelize.INTEGER,  allowNull: true },
  data: {  type: Sequelize.STRING,  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
  sourceId: {  type: Sequelize.STRING(50),  allowNull: true },
  source: {  type: Sequelize.STRING(50),  allowNull: true },
}, { tableName: 'trscan' });
module.exports = trscan;