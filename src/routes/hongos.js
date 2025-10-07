import { createHongo } from "../controllers/hongos.js";
import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { getHongoById, getHongos } from "../controllers/hongos.js";
const router = Router();

const upload = multer({ dest: "uploads/" });

// Routa para obtener un hongo por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const hongo = await getHongoById(id);
    res.json(hongo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el hongo" });
  }
});
// Ruta para obtener todos los hongos
router.get("/", async (req, res) => {
  try {
    const hongos = await getHongos();
    res.json(hongos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener los hongos" });
  }
});



// Permite subir una imagen y guardar el buffer en la base de datos
router.post('/', upload.any(), async (req, res) => {
  try {
    const hongo = req.body;
    // Si se subió una imagen, leer el buffer
    if (req.files && req.files.length > 0) {
      hongo.imagen = fs.readFileSync(path.resolve(req.files[0].path));
    }
    const result = await createHongo(hongo);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

export default router;