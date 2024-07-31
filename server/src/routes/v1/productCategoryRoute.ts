import express, { Router } from 'express'
import productCategoryController from '~/controllers/productCategoryController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import productCategoryValidation from '~/validations/productCategoryValidation'

const router: Router = express.Router()

router.get('/', productCategoryController.getProductCategories)
router.get('/:slug', productCategoryController.getProductCategoryBySlug)

// ADMIN ROUTES
router.post(
  '/',
  [verifyToken, isAdmin, productCategoryValidation.createProductCategoryByAdmin],
  productCategoryController.createProductCategoryByAdmin
)
router.put(
  '/:productCategoryId',
  [verifyToken, isAdmin, productCategoryValidation.updateProductCategoryByAdmin],
  productCategoryController.updateProductCategoryByAdmin
)
router.delete('/:productCategoryId', [verifyToken, isAdmin], productCategoryController.deleteProductCategoryByAdmin)

export default router
