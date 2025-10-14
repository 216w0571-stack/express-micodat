import { findAll, findById, create, update, remove, addHistorial } from "../repositories/hongos.js";


export const getHongos = async () => {
  const hongos = await findAll();
  return hongos;
}

export const getHongoById = async (id) => {
  const hongo = await findById(id);
  return hongo;
}

export const createHongo = async (hongo) => {
  const id = await create(hongo);
  return id;
}

export const updateHongo = async (id, hongo, id_usuario = null) => {
  // Verificar que el hongo existe antes de actualizar
  const existingHongo = await findById(id);
  if (!existingHongo) {
    throw new Error('Hongo no encontrado');
  }
  
  const success = await update(id, hongo);
  
  // Registrar en historial si la actualización fue exitosa
  if (success) {
    await addHistorial(id, id_usuario, 'editar', `Hongo actualizado: ${hongo.nombre_es || existingHongo.nombre_es}`);
  }
  
  return success;
}

export const deleteHongo = async (id, id_usuario = null) => {
  // Verificar que el hongo existe antes de eliminar
  const existingHongo = await findById(id);
  if (!existingHongo) {
    throw new Error('Hongo no encontrado');
  }
  
  // Registrar en historial antes de eliminar
  await addHistorial(id, id_usuario, 'eliminar', `Hongo eliminado: ${existingHongo.nombre_es}`);
  
  const success = await remove(id);
  return success;
}