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
    imagen = null,
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

export const update = async (id, hongo) => {
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
  
  // Construir la consulta dinámicamente para manejar campos opcionales
  const fields = [];
  const params = [];
  
  if (nombre_es !== undefined) {
    fields.push('nombre_es = ?');
    params.push(nombre_es);
  }
  if (nombre_nah !== undefined) {
    fields.push('nombre_nah = ?');
    params.push(nombre_nah);
  }
  if (descripcion_es !== undefined) {
    fields.push('descripcion_es = ?');
    params.push(descripcion_es);
  }
  if (descripcion_nah !== undefined) {
    fields.push('descripcion_nah = ?');
    params.push(descripcion_nah);
  }
  if (usos !== undefined) {
    fields.push('usos = ?');
    params.push(usos);
  }
  if (tecnicas_recoleccion !== undefined) {
    fields.push('tecnicas_recoleccion = ?');
    params.push(tecnicas_recoleccion);
  }
  if (cultivo !== undefined) {
    fields.push('cultivo = ?');
    params.push(cultivo);
  }
  if (conservacion !== undefined) {
    fields.push('conservacion = ?');
    params.push(conservacion);
  }
  if (ritualidad !== undefined) {
    fields.push('ritualidad = ?');
    params.push(ritualidad);
  }
  if (significado_local !== undefined) {
    fields.push('significado_local = ?');
    params.push(significado_local);
  }
  if (comestible !== undefined) {
    fields.push('comestible = ?');
    params.push(comestible);
  }
  if (imagen !== undefined) {
    fields.push('imagen = ?');
    params.push(imagen);
  }
  if (tipo !== undefined) {
    fields.push('tipo = ?');
    params.push(tipo);
  }
  
  if (fields.length === 0) {
    throw new Error('No hay campos para actualizar');
  }
  
  // Agregar actualización de timestamp
  fields.push('actualizado_at = CURRENT_TIMESTAMP');
  
  const sql = `UPDATE hongos SET ${fields.join(', ')} WHERE id_hongo = ?`;
  params.push(id);
  
  const result = await query(sql, params);
  return result.affectedRows > 0;
};

export const remove = async (id) => {
  const sql = "DELETE FROM hongos WHERE id_hongo = ?";
  const params = [id];
  const result = await query(sql, params);
  return result.affectedRows > 0;
};

export const addHistorial = async (id_hongo, id_usuario, accion, descripcion) => {
  const sql = `INSERT INTO historial (id_hongo, id_usuario, accion, descripcion) VALUES (?, ?, ?, ?)`;
  const params = [id_hongo, id_usuario, accion, descripcion];
  const result = await query(sql, params);
  return result.insertId;
};