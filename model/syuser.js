var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const syuser = db.define('syuser', {
  username: { primaryKey: true, type: Sequelize.STRING(50),  allowNull: false },
  user_login: {  type: Sequelize.STRING(50),  allowNull: true },
  name: {  type: Sequelize.STRING(250),  allowNull: true },
  password: {  type: Sequelize.STRING(250),  allowNull: true },
  Token: {  type: Sequelize.STRING(250),  allowNull: true },
  entryposition: {  type: Sequelize.STRING(250),  allowNull: true },
  picture: {  type: Sequelize.STRING(250),  allowNull: true },
  groupname: {  type: Sequelize.STRING(250),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  remark: {  type: Sequelize.STRING,  allowNull: true },
  createdBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updatedBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
  sourceId: {  type: Sequelize.STRING(50),  allowNull: true },
  source: {  type: Sequelize.STRING(50),  allowNull: true },
}, { tableName: 'syuser' });
module.exports = syuser;