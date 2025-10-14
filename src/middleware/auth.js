import jwt from 'jsonwebtoken';
import { query } from '../db/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'micodat_secret_key_2024';
export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verificar que el usuario aún existe en la base de datos
    const sql = 'SELECT id_usuario, nombre, email, rol FROM usuarios WHERE id_usuario = ?';
    const user = await query(sql, [decoded.id_usuario]);
    
    if (!user || user.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Agregar información del usuario al request
    req.user = user[0];
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    return res.status(500).json({ error: 'Error en la autenticación' });
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'Permisos insuficientes' });
    }

    next();
  };
};

export const generateToken = (user) => {
  return jwt.sign(
    { 
      id_usuario: user.id_usuario,
      email: user.email,
      rol: user.rol 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};