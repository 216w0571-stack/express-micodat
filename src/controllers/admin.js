import bcrypt from 'bcryptjs';
import { query } from '../db/index.js';

export const getAllUsers = async () => {
  const sql = 'SELECT id_usuario, nombre, email, rol, fecha_creacion FROM usuarios ORDER BY fecha_creacion DESC';
  const users = await query(sql);
  return users;
};

export const getUserById = async (userId) => {
  const sql = 'SELECT id_usuario, nombre, email, rol, fecha_creacion FROM usuarios WHERE id_usuario = ?';
  const users = await query(sql, [userId]);
  
  if (!users || users.length === 0) {
    throw new Error('Usuario no encontrado');
  }
  
  return users[0];
};

export const createUser = async (userData) => {
  const { nombre, email, password, rol = 'editor' } = userData;

  if (!nombre || !email || !password) {
    throw new Error('Nombre, email y contraseña son requeridos');
  }

  // Verificar si el email ya existe
  const existingUserSql = 'SELECT id_usuario FROM usuarios WHERE email = ?';
  const existingUsers = await query(existingUserSql, [email]);

  if (existingUsers && existingUsers.length > 0) {
    throw new Error('El email ya está registrado');
  }

  // Validar rol
  if (!['admin', 'editor'].includes(rol)) {
    throw new Error('Rol inválido. Debe ser admin o editor');
  }

  // Encriptar contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insertar nuevo usuario
  const insertSql = `
    INSERT INTO usuarios (nombre, email, password, rol) 
    VALUES (?, ?, ?, ?)
  `;
  const result = await query(insertSql, [nombre, email, hashedPassword, rol]);

  // Retornar usuario creado sin contraseña
  return await getUserById(result.insertId);
};

export const updateUser = async (userId, updateData) => {
  const { nombre, email, password, rol } = updateData;
  
  if (!nombre && !email && !password && !rol) {
    throw new Error('Al menos un campo debe ser proporcionado para actualizar');
  }

  // Verificar que el usuario existe
  await getUserById(userId);

  // Si se está actualizando el email, verificar que no exista
  if (email) {
    const existingUserSql = 'SELECT id_usuario FROM usuarios WHERE email = ? AND id_usuario != ?';
    const existingUsers = await query(existingUserSql, [email, userId]);

    if (existingUsers && existingUsers.length > 0) {
      throw new Error('El email ya está en uso por otro usuario');
    }
  }

  // Validar rol si se proporciona
  if (rol && !['admin', 'editor'].includes(rol)) {
    throw new Error('Rol inválido. Debe ser admin o editor');
  }

  // Construir consulta dinámicamente
  const fields = [];
  const params = [];

  if (nombre !== undefined) {
    fields.push('nombre = ?');
    params.push(nombre);
  }
  if (email !== undefined) {
    fields.push('email = ?');
    params.push(email);
  }
  if (rol !== undefined) {
    fields.push('rol = ?');
    params.push(rol);
  }
  if (password !== undefined) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    fields.push('password = ?');
    params.push(hashedPassword);
  }

  const sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`;
  params.push(userId);

  const result = await query(sql, params);

  if (result.affectedRows === 0) {
    throw new Error('Usuario no encontrado');
  }

  // Retornar usuario actualizado
  return await getUserById(userId);
};

export const deleteUser = async (userId) => {
  // Verificar que el usuario existe
  const user = await getUserById(userId);
  
  // No permitir eliminar el último admin
  if (user.rol === 'admin') {
    const adminCountSql = 'SELECT COUNT(*) as count FROM usuarios WHERE rol = "admin"';
    const adminCount = await query(adminCountSql);
    
    if (adminCount[0].count <= 1) {
      throw new Error('No se puede eliminar el último administrador');
    }
  }

  const sql = 'DELETE FROM usuarios WHERE id_usuario = ?';
  const result = await query(sql, [userId]);

  if (result.affectedRows === 0) {
    throw new Error('Usuario no encontrado');
  }

  return { message: 'Usuario eliminado exitosamente' };
};

export const changeUserRole = async (userId, newRole) => {
  if (!['admin', 'editor'].includes(newRole)) {
    throw new Error('Rol inválido. Debe ser admin o editor');
  }

  // Verificar que el usuario existe
  const user = await getUserById(userId);

  // No permitir cambiar el rol del último admin
  if (user.rol === 'admin' && newRole === 'editor') {
    const adminCountSql = 'SELECT COUNT(*) as count FROM usuarios WHERE rol = "admin"';
    const adminCount = await query(adminCountSql);
    
    if (adminCount[0].count <= 1) {
      throw new Error('No se puede cambiar el rol del último administrador');
    }
  }

  const sql = 'UPDATE usuarios SET rol = ? WHERE id_usuario = ?';
  const result = await query(sql, [newRole, userId]);

  if (result.affectedRows === 0) {
    throw new Error('Usuario no encontrado');
  }

  return await getUserById(userId);
};