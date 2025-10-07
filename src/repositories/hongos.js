import { query } from "../db/index.js";
export const findAll = async () => {
  const hongos = await query("SELECT * FROM hongos");
  return hongos;
};

export const findById = async (id) => {
  const sql = "SELECT * FROM hongos WHERE id_hongo = ?";
  const params = [id];
  const results = await query(sql, params);
  return results[0]; // Suponiendo que el ID es único y solo devuelve un registro
};


export const create = async (hongo) => {
  const {
    nombre_es,
    nombre_nah,
    descripcion_es,
    descripcion_nah,
    usos,
    tecnicas_recoleccion,
    cultivo,
    conservacion,
    ritualidad,
    significado_local,
    comestible,
    imagen,
    tipo
  } = hongo;
  const sql = `INSERT INTO hongos (
    nombre_es,
    nombre_nah,
    descripcion_es,
    descripcion_nah,
    usos,
    tecnicas_recoleccion,
    cultivo,
    conservacion,
    ritualidad,
    significado_local,
    comestible,
    imagen,
    tipo
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    nombre_es,
    nombre_nah,
    descripcion_es,
    descripcion_nah,
    usos,
    tecnicas_recoleccion,
    cultivo,
    conservacion,
    ritualidad,
    significado_local,
    comestible,
    imagen,
    tipo
  ];
  const result = await query(sql, params);
  return result.insertId;
};