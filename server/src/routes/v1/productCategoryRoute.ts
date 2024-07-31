import express, { Router } from 'express'
import productCategoryController from '~/controllers/productCategoryController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import productCategoryValidation from '~/validations/productCategoryValidation'

const router: Router = express.Router()

// ADMIN ROUTES
router.post(
  '/',
  [verifyToken, isAdmin, productCategoryValidation.createProductCategoryByAdmin],
  productCategoryController.createProductCategoryByAdmin
)

export default router
