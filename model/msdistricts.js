var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const msdistricts = db.define('msdistricts', {
  id: { primaryKey: true, type: Sequelize.STRING(6),  allowNull: false },
  zip_code: {  type: Sequelize.INTEGER,  allowNull: false },
  name_th: {  type: Sequelize.STRING(150),  allowNull: false },
  name_en: {  type: Sequelize.STRING(150),  allowNull: false },
  amphure_id: {  type: Sequelize.INTEGER,  allowNull: false },
}, { tableName: 'msdistricts' });
module.exports = msdistricts;