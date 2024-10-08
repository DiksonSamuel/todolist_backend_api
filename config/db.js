const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected via Sequelize'))
  .catch((err) => console.error('Unable to connect to PostgreSQL:', err));

sequelize.sync({ force: false })  // force: false prevents dropping the table
  .then(() => {
    console.log('Tables created!');
  })
  .catch((err) => console.error('Error creating tables:', err));


module.exports = sequelize;
