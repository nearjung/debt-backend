var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const syfollowtype = db.define('syfollowtype', {
  followTypeId: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  name: {  type: Sequelize.STRING(200),  allowNull: true },
  active: {  type: Sequelize.STRING(1),  allowNull: true },
  createBy: {  type: Sequelize.STRING(50),  allowNull: true },
  createDate: {  type: Sequelize.DATE,  allowNull: true },
  updateBy: {  type: Sequelize.STRING(50),  allowNull: true },
  updateDate: {  type: Sequelize.DATE,  allowNull: true },
}, { tableName: 'syfollowtype' });
module.exports = syfollowtype;