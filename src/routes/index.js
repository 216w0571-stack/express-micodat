import { Router } from "express";   
import db from "../routes/index.js"; // Aquí importa tu conexión a la base de datos

const router = Router();

// Listar todos los hongos
router.get("/", async (req, res) => {
  try {
    const rows = await query("SELECT * FROM hongos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener hongos" });
  }
});

// Obtener un hongo por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const rows = await query("SELECT * FROM hongos WHERE id_hongo = ?", [id]);
    if (rows.length === 0) {
      return res.status(200).json({
        id_hongo: id,
        nombre_es: "Hongo no encontrado",
        descripcion_es: "No hay información disponible.",
        comestible: "No",
        imagen: null,
        tipo: "0"
      });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});

export default router;
