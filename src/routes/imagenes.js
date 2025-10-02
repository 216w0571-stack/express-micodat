import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

export default function(db, uploadDir) {
  const router = Router();

  // Crear carpeta uploads si no existe
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  // Configuración de Multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      // Reemplaza espacios por guiones y quita caracteres no válidos
      const cleanName = file.originalname
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9\-_.]/g, "");
      cb(null, Date.now() + "-" + cleanName);
    },
  });

  const upload = multer({ storage }).any(); // acepta cualquier key

  // 🟢 SUBIR IMAGEN
  router.post("/", upload, async (req, res) => {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ error: "No se subió ningún archivo" });

    const archivos = req.files.map(file => ({
      originalname: file.originalname,
      filename: file.filename,
      url: `http://localhost:3000/uploads/${file.filename}`,
    }));

    res.json({
      message: "Imagen(es) subida(s) con éxito ✅",
      archivos,
    });
  });

  // 🟢 LISTAR IMÁGENES
  router.get("/", (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
      if (err) return res.status(500).json({ error: "No se pudieron leer las imágenes" });

      // Devuelve URLs completas de cada archivo
      const archivos = files.map(file => ({
        filename: file,
        url: `http://localhost:3000/uploads/${file}`,
      }));

      res.json(archivos);
    });
  });

  return router;
}
