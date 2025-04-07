import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  admins,
  resetPasswordRequest,
  resetPassword,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import validateRequest from '../middleware/validator.js';
import userValidator from '../validators/userValidator.js'; // Moved validation logic to a separate file

const router = express.Router();

// Public Routes
router.post('/login', userValidator.checkLogin, validateRequest, loginUser);
router.post('/logout', protect, logoutUser);
router.post(
  '/reset-password/request',
  userValidator.resetPasswordRequest,
  validateRequest,
  resetPasswordRequest
);
router.post(
  '/reset-password/reset/:id/:token',
  userValidator.resetPassword,
  validateRequest,
  resetPassword
);
router.post('/', userValidator.checkNewUser, validateRequest, registerUser);

// Protected Routes (User)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, userValidator.checkNewUser, validateRequest, updateUserProfile);

// Admin Routes
router.get('/admins', protect, admin, admins);
router
  .route('/')
  .get(protect, admin, getUsers);

router
  .route('/:id')
  .get(protect, admin, userValidator.checkGetUserById, validateRequest, getUserById)
  .put(protect, admin, userValidator.checkUpdateUser, validateRequest, updateUser)
  .delete(protect, admin, userValidator.checkGetUserById, validateRequest, deleteUser);

export default router;
