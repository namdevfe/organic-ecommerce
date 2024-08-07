import express, { Router } from 'express'
import couponController from '~/controllers/couponController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import couponValidation from '~/validations/couponValidation'

const router: Router = express.Router()

router.post('/', [verifyToken, isAdmin, couponValidation.createCoupon], couponController.createCoupon)

export default router
