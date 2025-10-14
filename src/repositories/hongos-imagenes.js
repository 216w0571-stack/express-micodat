import { query } from "../db/index.js";

/**
 * Obtener todas las imágenes de un hongo específico
 */
export const findByHongoId = async (id_hongo) => {
  const sql = "SELECT id, id_hongo FROM hongos_imagenes WHERE id_hongo = ?";
  const params = [id_hongo];
  const results = await query(sql, params);
  return results;
};

/**
 * Obtener una imagen específica por su ID (incluyendo el BLOB)
 */
export const findById = async (id) => {
  const sql = "SELECT * FROM hongos_imagenes WHERE id = ?";
  const params = [id];
  const results = await query(sql, params);
  return results[0];
};

/**
 * Crear una nueva imagen para un hongo
 */
export const create = async (id_hongo, imagenBuffer) => {
  const sql = `INSERT INTO hongos_imagenes (id_hongo, imagen) VALUES (?, ?)`;
  const params = [id_hongo, imagenBuffer];
  const result = await query(sql, params);
  return result.insertId;
};

/**
 * Eliminar una imagen específica
 */
export const remove = async (id) => {
  const sql = "DELETE FROM hongos_imagenes WHERE id = ?";
  const params = [id];
  const result = await query(sql, params);
  return result.affectedRows > 0;
};

/**
 * Eliminar todas las imágenes de un hongo
 */
export const removeByHongoId = async (id_hongo) => {
  const sql = "DELETE FROM hongos_imagenes WHERE id_hongo = ?";
  const params = [id_hongo];
  const result = await query(sql, params);
  return result.affectedRows;
};

/**
 * Contar cuántas imágenes tiene un hongo
 */
export const countByHongoId = async (id_hongo) => {
  const sql = "SELECT COUNT(*) as total FROM hongos_imagenes WHERE id_hongo = ?";
  const params = [id_hongo];
  const results = await query(sql, params);
  return results[0].total;
};