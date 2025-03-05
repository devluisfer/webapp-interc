const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

const server = jsonServer.create();
const dbPath = path.join(__dirname, 'db.json'); // Ruta absoluta a db.json
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Habilitar CORS
server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ JSON Server running on http://localhost:${PORT}`);
});
