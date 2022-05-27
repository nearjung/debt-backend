var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const mscustomerfile = db.define('mscustomerfile', {
  customerFileId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  idcard: {  type: Sequelize.STRING(25),  allowNull: true },
  data: {  type: Sequelize.STRING(255),  allowNull: true },
  fileType: {  type: Sequelize.STRING(20),  allowNull: true },
  filePathURL: {  type: Sequelize.STRING(250),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
  sourceId: {  type: Sequelize.STRING(50),  allowNull: true },
  source: {  type: Sequelize.STRING(50),  allowNull: true },
}, { tableName: 'mscustomerfile' });
module.exports = mscustomerfile;