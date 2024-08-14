import express from 'express';
const router = express.Router();
import {
  getSuppliers,
  getSupplierById,
	createSupplier,
  deleteSupplier,
  updateSupplier,
} from '../controllers/supplierController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getSuppliers).post(protect, admin, createSupplier);
router
  .route('/:id')
  .get(checkObjectId, getSupplierById)
  .put(protect, admin, checkObjectId, updateSupplier)
  .delete(protect, admin, checkObjectId, deleteSupplier);

export default router;