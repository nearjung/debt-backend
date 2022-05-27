var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const trpayment = db.define('trpayment', {
  paymentId: { primaryKey: true, type: Sequelize.INTEGER,  allowNull: false },
  financeNumber: {  type: Sequelize.STRING(50),  allowNull: true },
  debtCollectionNumber: {  type: Sequelize.STRING(25),  allowNull: true },
  idcard: {  type: Sequelize.STRING(25),  allowNull: true },
  deadlineDate: {  type: Sequelize.DATE,  allowNull: true },
  paymentMethod: {  type: Sequelize.STRING(10),  allowNull: true },
  tatalAmountDetail: {  type: Sequelize.STRING,  allowNull: true },
  totalAmount: {  type: Sequelize.INTEGER,  allowNull: true },
  paymentAmount: {  type: Sequelize.INTEGER,  allowNull: true },
  balance: {  type: Sequelize.INTEGER,  allowNull: true },
  attachmentFile: {  type: Sequelize.STRING(255),  allowNull: true },
  status: {  type: Sequelize.STRING(10),  allowNull: true },
  isCloseInvoice: {  type: Sequelize.STRING(1),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
  sourceId: {  type: Sequelize.STRING(50),  allowNull: true },
  source: {  type: Sequelize.STRING(50),  allowNull: true },
}, { tableName: 'trpayment' });
module.exports = trpayment;