import express, { Router } from 'express'
import productController from '~/controllers/productController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import productValidation from '~/validations/productValidation'

const router: Router = express.Router()

// ADMIN ROUTES
router.post('/', [verifyToken, isAdmin, productValidation.createProductByAdmin], productController.createProductByAdmin)

export default router
