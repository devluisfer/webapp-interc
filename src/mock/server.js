import jsonServer from 'json-server';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const dbPath = join(__dirname, 'db.json'); // ✅ Corrección para obtener la ruta absoluta
// const dbPath = path.join(process.cwd(), 'db.json');
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Habilitar CORS
server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ JSON Server running on http://localhost:${PORT}`);
});
