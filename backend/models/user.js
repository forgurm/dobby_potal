// models/user.js
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

const User = sequelize.define('User', {
    emailId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    emailPw: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userToken: {
        type: DataTypes.STRING,
    },
    refreshToken: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
    firstStart: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    passwordThirdYn: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

sequelize.sync() // 모델과 데이터베이스를 동기화 (테이블 생성)
  .then(() => {
    console.log('User model synced with MySQL database.');
  })
  .catch((error) => {
    console.error('Failed to sync User model with database:', error);
  });

module.exports = User;