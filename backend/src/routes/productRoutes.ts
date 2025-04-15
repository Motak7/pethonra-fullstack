// backend/src/routes/productRoutes.ts
import { Router } from 'express';
import * as ProductController from '../controllers/productController';

const router = Router();

router.get('/', ProductController.listProducts);
router.post('/', ProductController.createNewProduct);
router.get('/:id', ProductController.getProductDetails);
router.put('/:id', ProductController.updateExistingProduct);
router.delete('/:id', ProductController.deleteExistingProduct);

export default router;