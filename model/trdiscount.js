var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const trdiscount = db.define('trdiscount', {
  discountId: { primaryKey: true, type: Sequelize.INTEGER,  allowNull: false },
  accNumber: {  type: Sequelize.STRING(50),  allowNull: true },
  debtCollectionNumber: {  type: Sequelize.STRING(25),  allowNull: true },
  discounType: {  type: Sequelize.STRING(25),  allowNull: true },
  totalAmount: {  type: Sequelize.INTEGER,  allowNull: true },
  discountPercent: {  type: Sequelize.INTEGER,  allowNull: true },
  discountAmount: {  type: Sequelize.INTEGER,  allowNull: true },
  paymentInInstallments: {  type: Sequelize.INTEGER,  allowNull: true },
  attachmentFile: {  type: Sequelize.STRING(255),  allowNull: true },
  approvedDiscountDate: {  type: Sequelize.DATE,  allowNull: true },
  paymentAmount: {  type: Sequelize.INTEGER,  allowNull: true },
  remainAmount: {  type: Sequelize.INTEGER,  allowNull: true },
  status: {  type: Sequelize.STRING(10),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
  sourceId: {  type: Sequelize.STRING(50),  allowNull: true },
  source: {  type: Sequelize.STRING(50),  allowNull: true },
}, { tableName: 'trdiscount' });
module.exports = trdiscount;