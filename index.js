import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import fs from "fs"; 
import path from "path";
import multer from "multer";
import imagenesRouter from "./src/routes/imagenes.js"; // ✅ ruta correcta desde la raíz

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Carpeta uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Conexión a MySQL
let db;
try {
  db = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "", // tu contraseña si tiene
    database: "micodat",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  console.log("Conexión a MySQL exitosa ✅");
} catch (err) {
  console.error("Error conectando a MySQL:", err);
}

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando ✅");
});

// Obtener todos los hongos
app.get("/hongos", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM hongos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener hongos" });
  }
});

// Obtener un hongo por ID
app.get("/hongos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM hongos WHERE id_hongo = ?", [id]);

    if (rows.length === 0) {
      return res.json({
        id_hongo: id,
        nombre_es: "Hongo no encontrado",
        descripcion_es: "No hay información disponible.",
        nombre_nah: null,
        usos: null,
        tecnicas_recoleccion: null,
        cultivo: null,
        conservacion: null,
        ritualidad: null,
        significado_local: null,
        comestible: "No",
        imagen: null,
        tipo: "0",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error al consultar la base de datos:", err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});

// Rutas de imágenes
app.use("/imagenes", imagenesRouter(db, uploadDir));

// Servir archivos estáticos
app.use("/uploads", express.static(uploadDir));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
