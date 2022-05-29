var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const msprovinces = db.define('msprovinces', {
  id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  code: {  type: Sequelize.STRING(2),  allowNull: false },
  name_th: {  type: Sequelize.STRING(150),  allowNull: false },
  name_en: {  type: Sequelize.STRING(150),  allowNull: false },
  geography_id: {  type: Sequelize.INTEGER,  allowNull: false },
}, { tableName: 'msprovinces' });
module.exports = msprovinces;