import { Router } from "express";
import multer from 'multer';
import {
  getImagenesByHongoId,
  getImagenById,
  uploadImagenes,
  deleteImagen,
  deleteImagenesByHongoId,
  countImagenes
} from "../controllers/hongos-imagenes.js";

const router = Router();

// Configurar multer para almacenar las imágenes en memoria (buffer)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Límite de 10MB por archivo
  },
  fileFilter: (req, file, cb) => {
    // Validar que sea una imagen
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'));
    }
  }
});

/**
 * POST /imagenes/hongos/:id_hongo
 * Subir una o múltiples imágenes para un hongo específico
 * Body: FormData con campo "imagenes" (puede ser múltiple)
 */
router.post('/hongos/:id_hongo', upload.array('imagenes', 10), async (req, res) => {
  try {
    const { id_hongo } = req.params;
    const files = req.files;
    
    const result = await uploadImagenes(id_hongo, files);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /imagenes/hongos/:id_hongo
 * Obtener la lista de todas las imágenes de un hongo (sin el contenido, solo metadata)
 */
router.get('/hongos/:id_hongo', async (req, res) => {
  try {
    const { id_hongo } = req.params;
    const imagenes = await getImagenesByHongoId(id_hongo);
    res.json(imagenes);
  } catch (error) {
    console.error('Error al obtener imágenes:', error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /imagenes/hongos/:id_hongo/count
 * Contar cuántas imágenes tiene un hongo
 */
router.get('/hongos/:id_hongo/count', async (req, res) => {
  try {
    const { id_hongo } = req.params;
    const result = await countImagenes(id_hongo);
    res.json(result);
  } catch (error) {
    console.error('Error al contar imágenes:', error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * DELETE /imagenes/hongos/:id_hongo
 * Eliminar todas las imágenes de un hongo
 */
router.delete('/hongos/:id_hongo', async (req, res) => {
  try {
    const { id_hongo } = req.params;
    const result = await deleteImagenesByHongoId(id_hongo);
    res.json(result);
  } catch (error) {
    console.error('Error al eliminar imágenes:', error);
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /imagenes/:id
 * Obtener una imagen específica por su ID (devuelve la imagen como archivo)
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await getImagenById(id);
    
    // Enviar la imagen como respuesta
    res.set('Content-Type', 'image/jpeg'); // Puedes ajustar esto según el tipo de imagen
    res.send(imagen.imagen);
  } catch (error) {
    console.error('Error al obtener imagen:', error);
    res.status(404).json({ error: error.message });
  }
});

/**
 * DELETE /imagenes/:id
 * Eliminar una imagen específica por su ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteImagen(id);
    res.json({ message: 'Imagen eliminada exitosamente', ...result });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;