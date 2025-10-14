import { createHongo, updateHongo, deleteHongo } from "../controllers/hongos.js";
import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { getHongoById, getHongos } from "../controllers/hongos.js";
import { authenticateToken, requireRole } from "../middleware/auth.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

// Rutas públicas (no requieren autenticación)
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

// Rutas protegidas (requieren autenticación)
// Ruta para crear un nuevo hongo (solo admins y editores)
router.post('/', authenticateToken, upload.any(), async (req, res) => {
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

// Ruta para actualizar un hongo existente (solo admins y editores)
router.put('/:id', authenticateToken, upload.any(), async (req, res) => {
  try {
    const { id } = req.params;
    const hongo = req.body;
    
    // Si se subió una imagen, leer el buffer
    if (req.files && req.files.length > 0) {
      hongo.imagen = fs.readFileSync(path.resolve(req.files[0].path));
    }
    
    // Usar el ID del usuario autenticado
    const id_usuario = req.user.id_usuario;
    
    const result = await updateHongo(id, hongo, id_usuario);
    res.json(result);
  } catch (err) {
    console.error(err);
    if (err.message === 'Hongo no encontrado') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

// Ruta para eliminar un hongo (solo admins)
router.delete('/:id', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Usar el ID del usuario autenticado
    const id_usuario = req.user.id_usuario;
    
    const result = await deleteHongo(id, id_usuario);
    res.json(result);
  } catch (err) {
    console.error(err);
    if (err.message === 'Hongo no encontrado') {
      res.status(404).json({ error: err.message });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

export default router;