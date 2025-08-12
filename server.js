const app = require('./app');
const PORT = process.env.PORT || 4000;
const DB_Connect = require('./src/db/db.js');

DB_Connect().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is successfully listening on PORT ${PORT}`);
    console.log('✅ Database connection established');
  });
}).catch((error) => {
  console.log('❌ Database cannot be connected');
  console.error(error); // optional: log the actual error
});
