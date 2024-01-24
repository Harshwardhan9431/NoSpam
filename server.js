const dotenv = require('dotenv');
const app = require('./app')
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;

const db = require("./models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

