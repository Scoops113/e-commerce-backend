const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');

// Import environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Configure Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres'
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Sync Sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  console.log('All models were synchronized successfully.');
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
