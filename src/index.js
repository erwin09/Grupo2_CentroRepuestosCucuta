const app = require('./app');
const connection = require('./config/db');
require('./services/whatsapp');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});