const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  console.log('All models were synchronized successfully.');
  
 
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
