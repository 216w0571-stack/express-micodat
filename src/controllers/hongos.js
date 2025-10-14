import { query } from "../db/index.js";
import { getHongos as getHongosService, getHongoById as getHongoByIdService, createHongo as createHongoService, updateHongo as updateHongoService, deleteHongo as deleteHongoService } from "../services/hongos.js";

export const getHongos = async () => {
  const hongos = await getHongosService();
  return hongos;
};

export const getHongoById = async (id) => {
  if (!id) {
    throw new Error("ID del hongo es requerido");
  }
  const result = await getHongoByIdService(id);
  return result;
}

export const createHongo = async (hongo) => {
  // Validar campos requeridos según la tabla
  if (!hongo.nombre_es || !hongo.comestible || !hongo.tipo) {
    throw new Error("nombre_es, comestible y tipo son requeridos");
  }

  const id = await createHongoService(hongo);
  return { id };
};

export const updateHongo = async (id, hongo, id_usuario = null) => {
  if (!id) {
    throw new Error("ID del hongo es requerido");
  }
  
  // Validar que al menos un campo sea proporcionado para actualizar
  const camposPermitidos = [
    'nombre_es', 'nombre_nah', 'descripcion_es', 'descripcion_nah',
    'usos', 'tecnicas_recoleccion', 'cultivo', 'conservacion',
    'ritualidad', 'significado_local', 'comestible', 'imagen', 'tipo'
  ];
  
  const camposProporcionados = camposPermitidos.filter(campo => hongo[campo] !== undefined);
  
  if (camposProporcionados.length === 0) {
    throw new Error("Al menos un campo debe ser proporcionado para actualizar");
  }
  
  const success = await updateHongoService(id, hongo, id_usuario);
  return { success };
};

export const deleteHongo = async (id, id_usuario = null) => {
  if (!id) {
    throw new Error("ID del hongo es requerido");
  }
  
  const success = await deleteHongoService(id, id_usuario);
  return { success };
};