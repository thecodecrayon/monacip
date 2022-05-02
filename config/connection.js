const  { Sequelize } = require('sequelize');

const sequelize = new Sequelize('monacip', 'postgres', 'Neuro@123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => console.log("<DB connected successfully!>"))
  .catch(err => console.log('Error: unable to connect to the database!', err));

module.exports = sequelize;