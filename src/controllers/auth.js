import bcrypt from 'bcryptjs';
import { query } from '../db/index.js';
import { generateToken } from '../middleware/auth.js';

export const login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son requeridos');
  }

  // Buscar usuario por email
  const sql = 'SELECT id_usuario, nombre, email, password, rol FROM usuarios WHERE email = ?';
  const users = await query(sql, [email]);

  if (!users || users.length === 0) {
    throw new Error('Credenciales inválidas');
  }

  const user = users[0];

  // Verificar contraseña
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Credenciales inválidas');
  }

  // Generar token JWT
  const token = generateToken(user);

  // Retornar datos del usuario sin la contraseña
  const { password: _, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword,
    token
  };
};

export const register = async (userData) => {
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

  // Encriptar contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insertar nuevo usuario
  const insertSql = `
    INSERT INTO usuarios (nombre, email, password, rol) 
    VALUES (?, ?, ?, ?)
  `;
  const result = await query(insertSql, [nombre, email, hashedPassword, rol]);

  // Obtener el usuario creado
  const newUserSql = 'SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?';
  const newUser = await query(newUserSql, [result.insertId]);

  // Generar token
  const token = generateToken(newUser[0]);

  return {
    user: newUser[0],
    token
  };
};

export const getProfile = async (userId) => {
  const sql = 'SELECT id_usuario, nombre, email, rol, fecha_creacion FROM usuarios WHERE id_usuario = ?';
  const users = await query(sql, [userId]);

  if (!users || users.length === 0) {
    throw new Error('Usuario no encontrado');
  }

  return users[0];
};

export const updateProfile = async (userId, updateData) => {
  const { nombre, email } = updateData;
  
  if (!nombre && !email) {
    throw new Error('Al menos un campo debe ser proporcionado para actualizar');
  }

  // Si se está actualizando el email, verificar que no exista
  if (email) {
    const existingUserSql = 'SELECT id_usuario FROM usuarios WHERE email = ? AND id_usuario != ?';
    const existingUsers = await query(existingUserSql, [email, userId]);

    if (existingUsers && existingUsers.length > 0) {
      throw new Error('El email ya está en uso por otro usuario');
    }
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

  const sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE id_usuario = ?`;
  params.push(userId);

  const result = await query(sql, params);

  if (result.affectedRows === 0) {
    throw new Error('Usuario no encontrado');
  }

  // Retornar usuario actualizado
  return await getProfile(userId);
};