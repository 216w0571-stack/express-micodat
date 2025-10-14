import { Router } from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 
  changeUserRole 
} from '../controllers/admin.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { query } from '../db/index.js';

const router = Router();

// Todas las rutas requieren autenticación y rol de admin
router.use(authenticateToken);
router.use(requireRole(['admin']));

// Obtener todos los usuarios
router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Obtener un usuario por ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    if (error.message === 'Usuario no encontrado') {
      res.status(404).json({
        success: false,
        error: error.message
      });
    } else {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
});

// Crear un nuevo usuario
router.post('/users', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const newUser = await createUser({ nombre, email, password, rol });
    
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: newUser
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Actualizar un usuario
router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, rol } = req.body;
    
    const updatedUser = await updateUser(id, { nombre, email, password, rol });
    
    res.json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    if (error.message === 'Usuario no encontrado') {
      res.status(404).json({
        success: false,
        error: error.message
      });
    } else {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
});

// Cambiar rol de usuario
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { id } = req.params;
    const { rol } = req.body;
    
    if (!rol) {
      return res.status(400).json({
        success: false,
        error: 'Rol es requerido'
      });
    }
    
    const updatedUser = await changeUserRole(id, rol);
    
    res.json({
      success: true,
      message: 'Rol de usuario actualizado exitosamente',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error al cambiar rol:', error);
    if (error.message === 'Usuario no encontrado') {
      res.status(404).json({
        success: false,
        error: error.message
      });
    } else {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
});

// Eliminar un usuario
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    if (error.message === 'Usuario no encontrado') {
      res.status(404).json({
        success: false,
        error: error.message
      });
    } else {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
});

// Estadísticas de administración
router.get('/stats', async (req, res) => {
  try {
    const statsSql = `
      SELECT 
        COUNT(*) as total_usuarios,
        SUM(CASE WHEN rol = 'admin' THEN 1 ELSE 0 END) as total_admins,
        SUM(CASE WHEN rol = 'editor' THEN 1 ELSE 0 END) as total_editors
      FROM usuarios
    `;
    const stats = await query(statsSql);
    
    res.json({
      success: true,
      data: stats[0]
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;