var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const trproperty = db.define('trproperty', {
  propertyId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  accNumber: {  type: Sequelize.STRING(50),  allowNull: true },
  debtCollectionNumber: {  type: Sequelize.STRING(25),  allowNull: true },
  idcard: {  type: Sequelize.STRING(25),  allowNull: true },
  propertyType: {  type: Sequelize.STRING(25),  allowNull: true },
  propertyStaus: {  type: Sequelize.STRING(255),  allowNull: true },
  propertyDetail: {  type: Sequelize.STRING,  allowNull: true },
  properyAdreess: {  type: Sequelize.TEXT,  allowNull: true },
  estimatePrice: {  type: Sequelize.INTEGER,  allowNull: true },
  paymentAmount: {  type: Sequelize.INTEGER,  allowNull: true },
  noteNextStep: {  type: Sequelize.STRING,  allowNull: true },
  status: {  type: Sequelize.STRING(10),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
  sourceId: {  type: Sequelize.STRING(50),  allowNull: true },
  source: {  type: Sequelize.STRING(50),  allowNull: true },
}, { tableName: 'trproperty' });
module.exports = trproperty;