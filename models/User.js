const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelizeDB = require('../config/connection');

const User = sequelizeDB.define('user', {
  // Admin model attributes are being defined here
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
          args: [6, 1024],
          msg: 'Password must be at least 6 characters long. It should also be smaller tha 1024 characters.'
      }
    }
  },
  role: {
    type: DataTypes.ENUM("basic", "supervisor", "admin"),
    defaultValue: "basic"
  },
  profile_photo: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  gender: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt(10);
  user.password = bcrypt.hashSync(user.password, salt);
});

User.prototype.sendToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};    

module.exports.User = User;