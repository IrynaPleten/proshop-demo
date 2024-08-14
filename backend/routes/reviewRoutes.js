import express from 'express';
const router = express.Router();
import {
	deleteProductReview,
  getProductReviews,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

router.route('/').get(getProductReviews)
router.route('/:reviewId').delete(protect, admin, deleteProductReview);

export default router;