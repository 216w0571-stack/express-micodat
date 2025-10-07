import express from "express";
import cors from "cors";
import serverlessMysql from "serverless-mysql";
import fs from "fs"; 
import path from "path";
import 'dotenv/config'; // Cargar variables de entorno
import imagenesRouter from "./src/routes/imagenes.js"; // ✅ ruta correcta desde la raíz
import hongosRouter from "./src/routes/index.js"; // ✅ ruta correcta desde la raíz

const db = serverlessMysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  }
});

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("🚀 Backend Micodat funcionando en Vercel"));

// Carpeta uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);


// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando ✅");
});

// Obtener todos los hongos
// app.get("/hongos", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM hongos");
//     console.log(rows);
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error al obtener hongos" });
//   }
// });

// Obtener un hongo por ID
app.get("/hongos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Si tienes pool configurado:
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
        tipo: "0"
      });
    }

    return res.json({
      data: rows
    });
  } catch (err) {
    console.error("Error al consultar la base de datos:", err);

    // 👇 fallback para que en Vercel no truene y devuelva algo válido
    res.json({
      id_hongo: id,
      nombre_es: "Error de conexión en Vercel",
      descripcion_es: "No se pudo conectar a la base de datos.",
      nombre_nah: null,
      usos: null,
      tecnicas_recoleccion: null,
      cultivo: null,
      conservacion: null,
      ritualidad: null,
      significado_local: null,
      comestible: "No",
      imagen: null,
      tipo: "0"
    });
  }  finally {
    await db.end();
  }
});

 

// Rutas de imágenes
app.use("/imagenes", imagenesRouter(db, uploadDir));

// Servir archivos estáticos
app.use("/uploads", express.static(uploadDir));

app.use(cors({
  origin: "*"   // o el dominio de tu frontend en Vercel
}));


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor local en http://localhost:${PORT}`));
}
export default app;