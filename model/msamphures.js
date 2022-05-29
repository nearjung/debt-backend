var db = require('../configuration/database/db_sql')
const Sequelize = require('sequelize');
const msamphures = db.define('msamphures', {
  id: { primaryKey: true, autoIncrement: true, type: Sequelize.INTEGER,  allowNull: false },
  code: {  type: Sequelize.STRING(4),  allowNull: false },
  name_th: {  type: Sequelize.STRING(150),  allowNull: false },
  name_en: {  type: Sequelize.STRING(150),  allowNull: false },
  province_id: {  type: Sequelize.INTEGER,  allowNull: false },
}, { tableName: 'msamphures' });
module.exports = msamphures;