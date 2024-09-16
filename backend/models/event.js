const { Sequelize, DataTypes } = require('sequelize');
const pool = require('../db');

// Sequelize 인스턴스를 생성하지 않고, 기존의 pool을 사용
const sequelize = new Sequelize({
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
    handleDisconnects: true,
    ...pool.config // mysql2/promise에서 생성된 pool의 설정을 그대로 사용
  }
});
const Event = sequelize.define('Event', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

sequelize.sync();

module.exports = Event;
