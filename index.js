import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import imagenesRouter from "./src/routes/imagenes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Carpeta uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Conexión a MySQL (función para usar async/await)
async function createDbPool() {
  return await mysql.createPool({
    host: "tu_host_remoto_o_local",
    user: "root",
    password: "", // tu contraseña
    database: "micodat",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

// Middleware de prueba
app.get("/", (req, res) => {
  res.send("Servidor Express funcionando en Vercel 🚀");
});

// Rutas de hongos
app.get("/hongos", async (req, res) => {
  try {
    const db = await createDbPool();
    const [rows] = await db.query("SELECT * FROM hongos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener hongos" });
  }
});

app.get("/hongos/:id", async (req, res) => {
  try {
    const db = await createDbPool();
    const { id } = req.params;
    const [rows] = await db.query("SELECT * FROM hongos WHERE id_hongo = ?", [id]);

    if (!rows.length) {
      return res.json({ mensaje: "Hongo no encontrado", id_hongo: id });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar la DB" });
  }
});

// Rutas de imágenes
app.use("/imagenes", imagenesRouter(createDbPool, uploadDir));

// Archivos estáticos
app.use("/uploads", express.static(uploadDir));

export default app;
