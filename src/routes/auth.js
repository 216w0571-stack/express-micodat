import { Router } from 'express';
import { login, register, getProfile, updateProfile } from '../controllers/auth.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const result = await login(email, password);
    
    res.json({
      success: true,
      message: 'Login exitoso',
      data: result
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(401).json({
      success: false,
      error: error.message
    });
  }
});

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const result = await register({ nombre, email, password, rol });
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: result
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Ruta para obtener perfil del usuario autenticado
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const profile = await getProfile(req.user.id_usuario);
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Ruta para actualizar perfil del usuario autenticado
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const updatedProfile = await updateProfile(req.user.id_usuario, { nombre, email });
    
    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: updatedProfile
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Ruta para verificar token (útil para el frontend)
router.get('/verify', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Token válido',
    user: req.user
  });
});

export default router;