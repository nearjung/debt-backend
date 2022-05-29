var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const msgeographies = db.define('msgeographies', {
  id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  name: {  type: Sequelize.STRING(255),  allowNull: false },
}, { tableName: 'msgeographies' });
module.exports = msgeographies;