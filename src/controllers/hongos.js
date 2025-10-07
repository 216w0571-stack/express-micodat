import { query } from "../db/index.js";
import { getHongos as getHongosService, getHongoById as getHongoByIdService, createHongo as createHongoService  } from "../services/hongos.js";

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
  console.log(hongo);
  // Validar campos requeridos según la tabla
  if (!hongo.nombre_es || !hongo.comestible || !hongo.tipo) {
    throw new Error("nombre_es, comestible y tipo son requeridos");
  }


  const id = await createHongoService(hongo);
  return { id };
};