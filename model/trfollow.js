var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const trfollow = db.define('trfollow', {
  followId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  debtCollectionNumber: {  type: Sequelize.STRING(25),  allowNull: true },
  followType: {  type: Sequelize.STRING(10),  allowNull: true },
  followDate: {  type: Sequelize.DATE,  allowNull: true },
  contactName: {  type: Sequelize.STRING(255),  allowNull: true },
  followDetail: {  type: Sequelize.STRING(50),  allowNull: true },
  amount: {  type: Sequelize.INTEGER,  allowNull: true },
  amountNote: {  type: Sequelize.TEXT,  allowNull: true },
  status: {  type: Sequelize.STRING(20),  allowNull: true },
  result: {  type: Sequelize.TEXT,  allowNull: true },
  nextFollowNote: {  type: Sequelize.STRING,  allowNull: true },
  nextFollowDate: {  type: Sequelize.DATE,  allowNull: true },
  nextFollowStatus: {  type: Sequelize.STRING(10),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'trfollow' });
module.exports = trfollow;