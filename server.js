require('dotenv').config({ path: './config/config.env' });
const app = require('./app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening at http://3.26.39.12:${PORT}`);
});