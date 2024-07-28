import express, { Router } from 'express'
import productController from '~/controllers/productController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import productValidation from '~/validations/productValidation'

const router: Router = express.Router()

// ADMIN ROUTES
router.post('/', [verifyToken, isAdmin, productValidation.createProductByAdmin], productController.createProductByAdmin)
router.put(
  '/:productId',
  [verifyToken, isAdmin, productValidation.updateProductByAdmin],
  productController.updateProductByAdmin
)
router.delete('/:productId', [verifyToken, isAdmin], productController.deleteProductByAdmin)

export default router
