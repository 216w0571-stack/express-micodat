import { 
  findByHongoId, 
  findById, 
  create, 
  remove, 
  removeByHongoId,
  countByHongoId 
} from "../repositories/hongos-imagenes.js";
import { findById as findHongoById } from "../repositories/hongos.js";

/**
 * Obtener todas las imágenes de un hongo
 */
export const getImagenesByHongoId = async (id_hongo) => {
  // Verificar que el hongo existe
  const hongo = await findHongoById(id_hongo);
  if (!hongo) {
    throw new Error('Hongo no encontrado');
  }
  
  const imagenes = await findByHongoId(id_hongo);
  return imagenes;
};

/**
 * Obtener una imagen específica por su ID
 */
export const getImagenById = async (id) => {
  const imagen = await findById(id);
  if (!imagen) {
    throw new Error('Imagen no encontrada');
  }
  return imagen;
};

/**
 * Crear una nueva imagen para un hongo
 */
export const createImagen = async (id_hongo, imagenBuffer) => {
  // Verificar que el hongo existe
  const hongo = await findHongoById(id_hongo);
  if (!hongo) {
    throw new Error('Hongo no encontrado');
  }
  
  const id = await create(id_hongo, imagenBuffer);
  return id;
};

/**
 * Crear múltiples imágenes para un hongo
 */
export const createMultipleImagenes = async (id_hongo, imagenesBuffers) => {
  // Verificar que el hongo existe
  const hongo = await findHongoById(id_hongo);
  if (!hongo) {
    throw new Error('Hongo no encontrado');
  }
  
  const ids = [];
  for (const buffer of imagenesBuffers) {
    const id = await create(id_hongo, buffer);
    ids.push(id);
  }
  
  return ids;
};

/**
 * Eliminar una imagen específica
 */
export const deleteImagen = async (id) => {
  // Verificar que la imagen existe
  const imagen = await findById(id);
  if (!imagen) {
    throw new Error('Imagen no encontrada');
  }
  
  const success = await remove(id);
  return success;
};

/**
 * Eliminar todas las imágenes de un hongo
 */
export const deleteImagenesByHongoId = async (id_hongo) => {
  // Verificar que el hongo existe
  const hongo = await findHongoById(id_hongo);
  if (!hongo) {
    throw new Error('Hongo no encontrado');
  }
  
  const deletedCount = await removeByHongoId(id_hongo);
  return deletedCount;
};

/**
 * Contar imágenes de un hongo
 */
export const countImagenesByHongoId = async (id_hongo) => {
  const count = await countByHongoId(id_hongo);
  return count;
};