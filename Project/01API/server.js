// Server.js
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });   //read config file config.env

const app = require('./app');


// console.log(app.get('env'));     // development
console.log(process.env);     // development

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});