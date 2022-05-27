var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const mscustomer = db.define('mscustomer', {
  idcard: { primaryKey: true, type: Sequelize.STRING(25),  allowNull: false },
  customerCode: {  type: Sequelize.STRING(25),  allowNull: true },
  title: {  type: Sequelize.STRING(50),  allowNull: true },
  fname: {  type: Sequelize.STRING(255),  allowNull: true },
  lname: {  type: Sequelize.STRING(255),  allowNull: true },
  fnameEng: {  type: Sequelize.STRING(255),  allowNull: true },
  lnameEng: {  type: Sequelize.STRING(255),  allowNull: true },
  nameOth: {  type: Sequelize.STRING(255),  allowNull: true },
  secondaryName: {  type: Sequelize.STRING(255),  allowNull: true },
  secondaryNameEng: {  type: Sequelize.STRING(255),  allowNull: true },
  image: {  type: Sequelize.STRING(255),  allowNull: true },
  birthday: {  type: Sequelize.DATE,  allowNull: true },
  race: {  type: Sequelize.STRING(255),  allowNull: true },
  religion: {  type: Sequelize.STRING(50),  allowNull: true },
  placeofBirth: {  type: Sequelize.STRING(255),  allowNull: true },
  otherContactInfo: {  type: Sequelize.STRING(255),  allowNull: true },
  occupation: {  type: Sequelize.STRING(255),  allowNull: true },
  sex: {  type: Sequelize.STRING(10),  allowNull: true },
  status: {  type: Sequelize.STRING(255),  allowNull: true },
  phone: {  type: Sequelize.STRING(50),  allowNull: true },
  passport: {  type: Sequelize.STRING(25),  allowNull: true },
  driver_card: {  type: Sequelize.STRING(25),  allowNull: true },
  otherContact: {  type: Sequelize.STRING(255),  allowNull: true },
  email: {  type: Sequelize.STRING(255),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
  sourceId: {  type: Sequelize.STRING(50),  allowNull: true },
  source: {  type: Sequelize.STRING(50),  allowNull: true },
}, { tableName: 'mscustomer' });
module.exports = mscustomer;