import {
  getImagenesByHongoId as getImagenesByHongoIdService,
  getImagenById as getImagenByIdService,
  createImagen as createImagenService,
  createMultipleImagenes as createMultipleImagenesService,
  deleteImagen as deleteImagenService,
  deleteImagenesByHongoId as deleteImagenesByHongoIdService,
  countImagenesByHongoId as countImagenesByHongoIdService
} from "../services/hongos-imagenes.js";

/**
 * Obtener todas las imágenes de un hongo (sin el contenido BLOB, solo metadata)
 */
export const getImagenesByHongoId = async (id_hongo) => {
  if (!id_hongo) {
    throw new Error("ID del hongo es requerido");
  }
  
  const imagenes = await getImagenesByHongoIdService(id_hongo);
  return imagenes;
};

/**
 * Obtener una imagen específica por su ID (devuelve el buffer de la imagen)
 */
export const getImagenById = async (id) => {
  if (!id) {
    throw new Error("ID de la imagen es requerido");
  }
  
  const imagen = await getImagenByIdService(id);
  return imagen;
};

/**
 * Subir una o múltiples imágenes para un hongo
 */
export const uploadImagenes = async (id_hongo, files) => {
  if (!id_hongo) {
    throw new Error("ID del hongo es requerido");
  }
  
  if (!files || files.length === 0) {
    throw new Error("No se han proporcionado imágenes");
  }
  
  // Convertir los archivos a buffers
  const imagenesBuffers = files.map(file => file.buffer);
  
  // Crear las imágenes
  const ids = await createMultipleImagenesService(id_hongo, imagenesBuffers);
  
  return {
    message: `${ids.length} imagen(es) subida(s) exitosamente`,
    ids,
    count: ids.length
  };
};

/**
 * Eliminar una imagen específica
 */
export const deleteImagen = async (id) => {
  if (!id) {
    throw new Error("ID de la imagen es requerido");
  }
  
  const success = await deleteImagenService(id);
  return { success };
};

/**
 * Eliminar todas las imágenes de un hongo
 */
export const deleteImagenesByHongoId = async (id_hongo) => {
  if (!id_hongo) {
    throw new Error("ID del hongo es requerido");
  }
  
  const deletedCount = await deleteImagenesByHongoIdService(id_hongo);
  return {
    message: `${deletedCount} imagen(es) eliminada(s)`,
    deletedCount
  };
};

/**
 * Contar imágenes de un hongo
 */
export const countImagenes = async (id_hongo) => {
  if (!id_hongo) {
    throw new Error("ID del hongo es requerido");
  }
  
  const count = await countImagenesByHongoIdService(id_hongo);
  return { count };
};