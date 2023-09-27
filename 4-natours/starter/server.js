const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// connect to DB
mongoose.connect(DB).then(() => console.log('DB conn successful!'));

// 4) START server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App (starter) running on port ${port}...`);
});
