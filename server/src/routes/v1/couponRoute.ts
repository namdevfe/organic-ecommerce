import express, { Router } from 'express'
import couponController from '~/controllers/couponController'
import { verifyToken } from '~/middlewares/jwtMiddleware'
import { isAdmin } from '~/middlewares/permissionMiddleware'
import couponValidation from '~/validations/couponValidation'

const router: Router = express.Router()

router.get('/', [verifyToken, isAdmin], couponController.getCoupons)
router.get('/:name', couponController.getCoupon)
router.post('/', [verifyToken, isAdmin, couponValidation.createCoupon], couponController.createCoupon)
router.put('/:couponId', [verifyToken, isAdmin, couponValidation.updateCoupon], couponController.updateCoupon)
router.delete('/:couponId', [verifyToken, isAdmin, couponValidation.deleteCoupon], couponController.deleteCoupon)

export default router
